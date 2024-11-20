mkdir -p certs
rm -f certs/*
cd certs

openssl req -x509 -new -nodes -newkey rsa:2048 -keyout y-CA.key -sha256 -days 365 -out y-CA.crt -subj "/C=FR/L=Paris"

kubectl create secret generic y-ca-tls --from-file=y-CA.crt --dry-run=client -o yaml > ../k8s/y-tls.yaml

echo "---" >> ../k8s/y-tls.yaml

openssl req -new -nodes -newkey rsa:2048 -keyout y-front.key -out y-front.csr -subj "/CN=y.local/C=FR/L=Paris"
cat ../template.ext | sed s/%%DOMAIN%%/y.local/g > y-front.ext
openssl x509 -req -in y-front.csr -CA y-CA.crt -CAkey y-CA.key -CAcreateserial -out y-front.crt -days 365 -sha256 -extfile y-front.ext
kubectl create secret tls y-front-tls --cert=y-front.crt --key=y-front.key --dry-run=client -o yaml >> ../k8s/y-tls.yaml

echo "---" >> ../k8s/y-tls.yaml

openssl req -new -nodes -newkey rsa:2048 -keyout y-back.key -out y-back.csr -subj "/CN=y-back.local/C=FR/L=Paris"
cat ../template.ext | sed s/%%DOMAIN%%/y-back.local/g > y-back.ext
openssl x509 -req -in y-back.csr -CA y-CA.crt -CAkey y-CA.key -CAcreateserial -out y-back.crt -days 365 -sha256 -extfile y-back.ext
kubectl create secret tls y-back-tls --cert=y-back.crt --key=y-back.key --dry-run=client -o yaml >> ../k8s/y-tls.yaml

echo "---" >> ../k8s/y-tls.yaml

openssl req -new -nodes -newkey rsa:2048 -keyout y-db.key -out y-db.csr -subj "/CN=y-db.local/C=FR/L=Paris"
cat ../template.ext | sed "s/%%DOMAIN%%/y-db.local\nDNS.1 = y-db/g" > y-db.ext
openssl x509 -req -in y-db.csr -CA y-CA.crt -CAkey y-CA.key -CAcreateserial -out y-db.crt -days 365 -sha256 -extfile y-db.ext
kubectl create secret tls y-db-tls --cert=y-db.crt --key=y-db.key --dry-run=client -o yaml >> ../k8s/y-tls.yaml

# install the CA in the system
# sudo cp y-CA.crt /usr/local/share/ca-certificates/y-CA.crt
# sudo update-ca-certificates

# add the CA to nodejs NODE_EXTRA_CA_CERTS
# echo "export NODE_EXTRA_CA_CERTS=$(pwd)/y-CA.crt" >> ~/.bashrc


# update chrome to trust the CA
# chrome://settings/certificates
# Authorities -> Import y-CA.crt
