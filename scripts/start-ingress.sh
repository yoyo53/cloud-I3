#!/bin/bash

# Start Minikube
bash scripts/start.sh

# Enable Ingress add-on
minikube addons enable ingress

# Patch Ingress for TCP Services
kubectl patch service ingress-nginx-controller -n ingress-nginx --patch-file k8s/ingress/ingress-service-patch.yaml
kubectl apply -f  k8s/ingress/tcp-services.yaml
kubectl patch deployment ingress-nginx-controller -n ingress-nginx --patch-file k8s/ingress/ingress-deployment-patch.yaml --type=json

# Wait for Ingress Controller
kubectl wait pods -n ingress-nginx -l app.kubernetes.io/component=controller --for condition=Ready --timeout=90s

# Apply Ingress Config
kubectl apply -f k8s/ingress/ingress-config.yaml
