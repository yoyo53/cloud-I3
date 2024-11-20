kubectl apply -f  ingress/tcp-services.yaml
kubectl patch deployment ingress-nginx-controller  -n ingress-nginx --patch-file ingress/ingress-nginx-deployment-patch.yaml --type=json
kubectl patch service ingress-nginx-controller  -n ingress-nginx --patch-file ingress/ingress-nginx-service-patch.yaml
