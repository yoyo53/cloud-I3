minikube start
minikube addons enable ingress
bash setup-ingress-tcp.sh
bash create-ssl-keys.sh
kubectl wait pods -n ingress-nginx -l app.kubernetes.io/component=controller --for condition=Ready --timeout=90s
kubectl apply -f k8s