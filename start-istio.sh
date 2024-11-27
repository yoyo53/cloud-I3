# Load environment variables from .env file
source .env
export $(cat .env | cut -d= -f1)

# Base64 encode variables for Kubernetes secrets
export POSTGRES_PASSWORD=$(echo -n $POSTGRES_PASSWORD | base64)
export SECRET_KEY=$(echo -n $SECRET_KEY | base64)
export ENCRYPTION_KEY=$(echo -n $ENCRYPTION_KEY | base64)

# Substitute environment variables in Kubernetes templates
find k8s-templates -type f -name "*.yaml" -exec sh -c 'mkdir -p k8s/$(dirname {} | sed -E "s|k8s-templates/?||") && envsubst < {} > k8s/$(echo {} | sed -E "s|k8s-templates/?||")' \;

# Move encryption-config.yaml to Minikube mounted directory
mkdir -p ~/.minikube/files/var/lib/minikube/certs
cp k8s/encryption-config.yaml ~/.minikube/files/var/lib/minikube/certs/encryption-config.yaml

# Start Minikube with encryption provider configuration
minikube start --extra-config=apiserver.encryption-provider-config=/var/lib/minikube/certs/encryption-config.yaml

# Create self-signed SSL certificates 
bash create-ssl-keys.sh

# Create Kubernetes Secret for Docker registry
kubectl create secret docker-registry y-registry --docker-server=$REGISTRY_SERVER --docker-username=$REGISTRY_USER --docker-password=$REGISTRY_PASSWORD

# Apply default Kubernetes configuration
kubectl apply -f k8s/default

# Wait for application to be available
kubectl rollout status --watch --timeout=90s statefulset y-db
kubectl wait --for=condition=available --timeout=90s deployment y-back y-front

# Enable Istio add-ons
minikube addons enable istio-provisioner
minikube addons enable istio

# Wait for Istio Ingress Gateway to be created
timeout=90; until kubectl get deployment istio-ingressgateway -n istio-system >/dev/null 2>&1; do ((timeout--)) || exit 1; sleep 1; done

# Patch Istio Ingress Gateway to support postgres TCP service
kubectl patch service istio-ingressgateway -n istio-system --patch-file k8s/istio/istio-service-patch.yaml

# Wait for Istio Ingress Gateway to be available
kubectl wait deployment istio-ingressgateway -n istio-system --for=condition=available --timeout=90s

# Enable mutual TLS authentication
kubectl apply -f k8s/istio/mtls-config.yaml -n istio-system

# Create TLS secrets for Istio Ingress Gateway
kubectl apply -f k8s/default/y-tls.yaml -n istio-system

# Apply Istio configuration
kubectl apply -f k8s/istio/istio-config.yaml

# Edit /etc/hosts file to add Istio Ingress Gateway IP address
# minikube tunnel
# sudo bash -c "echo $(kubectl get svc istio-ingressgateway -n istio-system -o jsonpath='{.status.loadBalancer.ingress[].ip}') $POSTGRES_HOST $BACK_HOST $FRONT_HOST >> /etc/hosts"