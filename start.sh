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

# Enable Ingress add-on
minikube addons enable ingress

# Patch Ingress controller to support postgres TCP service
kubectl patch service ingress-nginx-controller -n ingress-nginx --patch-file k8s/ingress/ingress-service-patch.yaml
kubectl apply -f  k8s/ingress/tcp-services.yaml
kubectl patch deployment ingress-nginx-controller -n ingress-nginx --patch-file k8s/ingress/ingress-deployment-patch.yaml --type=json

# Wait for Ingress controller to be available
kubectl wait pods -n ingress-nginx -l app.kubernetes.io/component=controller --for condition=Ready --timeout=90s

# Apply Ingress configuration
kubectl apply -f k8s/ingress/ingress-config.yaml

# Edit /etc/hosts file to add Minikube IP address
# sudo bash -c "echo $(minikube ip) $POSTGRES_HOST $BACK_HOST $FRONT_HOST >> /etc/hosts"