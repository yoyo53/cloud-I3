source .env
export $(cat .env | cut -d= -f1)
export POSTGRES_PASSWORD=$(echo -n $POSTGRES_PASSWORD | base64)
export SECRET_KEY=$(echo -n $SECRET_KEY | base64)

minikube start
minikube addons enable ingress
find k8s-templates -type f -name "*.yaml" -exec sh -c 'mkdir -p k8s/$(dirname {} | sed "s|k8s-templates/||") && envsubst < {} > k8s/$(echo {} | sed "s|k8s-templates/||")' \;
bash setup-ingress-tcp.sh
bash create-ssl-keys.sh
kubectl wait pods -n ingress-nginx -l app.kubernetes.io/component=controller --for condition=Ready --timeout=90s
kubectl apply -f k8s/default