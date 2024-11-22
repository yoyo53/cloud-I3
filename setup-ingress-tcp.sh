kubectl apply -f  k8s/ingress/tcp-services.yaml
kubectl patch deployment ingress-nginx-controller  -n ingress-nginx --patch-file k8s/ingress/ingress-nginx-deployment-patch.yaml --type=json
kubectl patch service ingress-nginx-controller  -n ingress-nginx --patch-file k8s/ingress/ingress-nginx-service-patch.yaml
