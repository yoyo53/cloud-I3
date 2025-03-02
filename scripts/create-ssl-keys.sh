#!/bin/bash

mkdir -p certs
mkdir -p k8s/default
cd certs

echo -e $CA_CERT > y-CA.crt
echo -e $CA_KEY > y-CA.key

kubectl create secret generic y-ca-tls --from-file=y-CA.crt --dry-run=client -o yaml > ../k8s/default/y-tls.yaml

echo "---" >> ../k8s/default/y-tls.yaml

openssl req -new -nodes -newkey rsa:2048 -keyout y-front.key -out y-front.csr -subj "/CN=${FRONT_HOST}/C=FR/L=Paris"
cat template.ext | sed s/%%DOMAIN%%/${FRONT_HOST}/g > y-front.ext
openssl x509 -req -in y-front.csr -CA y-CA.crt -CAkey y-CA.key -CAcreateserial -out y-front.crt -days 365 -sha256 -extfile y-front.ext
kubectl create secret tls y-front-tls --cert=y-front.crt --key=y-front.key --dry-run=client -o yaml >> ../k8s/default/y-tls.yaml

echo "---" >> ../k8s/default/y-tls.yaml

openssl req -new -nodes -newkey rsa:2048 -keyout y-back.key -out y-back.csr -subj "/CN=${BACK_HOST}/C=FR/L=Paris"
cat template.ext | sed s/%%DOMAIN%%/${BACK_HOST}/g > y-back.ext
openssl x509 -req -in y-back.csr -CA y-CA.crt -CAkey y-CA.key -CAcreateserial -out y-back.crt -days 365 -sha256 -extfile y-back.ext
kubectl create secret tls y-back-tls --cert=y-back.crt --key=y-back.key --dry-run=client -o yaml >> ../k8s/default/y-tls.yaml

echo "---" >> ../k8s/default/y-tls.yaml

openssl req -new -nodes -newkey rsa:2048 -keyout y-db.key -out y-db.csr -subj "/CN=${POSTGRES_HOST}/C=FR/L=Paris"
cat template.ext | sed "s/%%DOMAIN%%/${POSTGRES_HOST}\nDNS.1 = y-db/g" > y-db.ext
openssl x509 -req -in y-db.csr -CA y-CA.crt -CAkey y-CA.key -CAcreateserial -out y-db.crt -days 365 -sha256 -extfile y-db.ext
kubectl create secret tls y-db-tls --cert=y-db.crt --key=y-db.key --dry-run=client -o yaml >> ../k8s/default/y-tls.yaml
