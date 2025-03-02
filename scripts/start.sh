#!/bin/bash

# Load environment variables from .env file
source .env
export $(cat .env | cut -d= -f1)

# Encrypt Secrets for Kubernetes
export POSTGRES_PASSWORD=$(echo -n $POSTGRES_PASSWORD | base64)
export SECRET_KEY=$(echo -n $SECRET_KEY | base64)
export ENCRYPTION_KEY=$(echo -n $ENCRYPTION_KEY | base64)

# Create Kubernetes Manifests from Templates
find k8s-templates -type f -name "*.yaml" -exec sh -c 'mkdir -p k8s/$(dirname {} | sed -E "s|k8s-templates/?||") && envsubst < {} > k8s/$(echo {} | sed -E "s|k8s-templates/?||")' \;

# Move Encryption Config to Minikube mount
mkdir -p ~/.minikube/files/var/lib/minikube/certs
cp k8s/encryption-config.yaml ~/.minikube/files/var/lib/minikube/certs/encryption-config.yaml

# Start Minikube with Encryption Config
minikube start --extra-config=apiserver.encryption-provider-config=/var/lib/minikube/certs/encryption-config.yaml

# Create Self-Signed SSL Certs 
bash scripts/create-ssl-keys.sh

# Create Secret for Docker Registry
kubectl create secret docker-registry y-registry --docker-server=$REGISTRY_SERVER --docker-username=$REGISTRY_USER --docker-password=$REGISTRY_PASSWORD

# Apply Default Manifests
kubectl apply -f k8s/default

# Wait for DB StatefulSet
kubectl rollout status --watch --timeout=90s statefulset y-db

# Wait for Deployments
kubectl wait --for=condition=available --timeout=90s deployment y-back y-front
