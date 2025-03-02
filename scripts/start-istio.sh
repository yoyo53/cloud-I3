#!/bin/bash

# Start Minikube
bash scripts/start.sh

# Enable Istio Add-on
minikube addons enable istio-provisioner
minikube addons enable istio

# Wait for Istio Ingress Gateway Creation
timeout=90; until kubectl get deployment istio-ingressgateway -n istio-system >/dev/null 2>&1; do ((timeout--)) || exit 1; sleep 1; done

# Patch Istio for TCP Services
kubectl patch service istio-ingressgateway -n istio-system --patch-file k8s/istio/istio-service-patch.yaml

# Wait for Istio Ingress Gateway Ready
kubectl wait deployment istio-ingressgateway -n istio-system --for=condition=available --timeout=90s

# Enable Mutual TLS
kubectl apply -f k8s/istio/mtls-config.yaml

# Create Secrets for Istio
kubectl apply -f k8s/default/y-tls.yaml -n istio-system

# Apply Istio Config
kubectl apply -f k8s/istio/istio-config.yaml
