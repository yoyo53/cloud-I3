# Cloud Project: Secure and Scalable Microservices Deployment

## Overview
This project is a cloud-native microservices application designed for deployment on Kubernetes, secured with SSL/TLS encryption. It features multiple services communicating through a gateway and a PostgreSQL database, with an automated CI/CD pipeline managed via GitHub Actions.

This project builds upon a previous web application, [Y](https://github.com/yoyo53/Y), by integrating cloud-native design patterns, enhanced security measures, and automated deployment workflows.

## Features
- **Microservices Architecture**: Implements cloud-native best practices for scalability and maintainability.
- **Containerization**: Uses Docker for encapsulating services.
- **Kubernetes Deployment**: Managed via Minikube for local development and testing.
- **CI/CD Pipeline**: Automated testing, building, and deployment through GitHub Actions.
- **Database Integration**: PostgreSQL database secured with SSL.
- **SSL/TLS Encryption**: Automated certificate generation and secure communication setup.
- **Ingress & Service Mesh Support**: Configurable deployment options for Ingress or Istio gateways.

## Technology Stack
- **Backend**: Node.js with Express.js
- **Frontend**: Next.js
- **Database**: PostgreSQL
- **Orchestration**: Kubernetes (Minikube for local deployment)
- **Containerization**: Docker
- **CI/CD**: GitHub Actions
- **Security**: SSL/TLS certificates managed via OpenSSL and Kubernetes secrets

## Project Structure
```
|-- back/                    # Backend service (Node.js, Express)
|-- front/                   # Frontend service (Next.js)
|-- k8s-templates/           # Kubernetes manifest templates (filled with env variables)
|-- k8s/                     # Generated Kubernetes manifests
|-- certs/                   # SSL certificates (generated during deployment)
|-- scripts/
|   |-- create-ssl-keys.sh   # Script to generate SSL keys
|   |-- start-istio.sh       # Script to deploy Minikube cluster with Istio gateway
|   |-- start-ingress.sh     # Script to deploy Minikube cluster with Ingress gateway
|   |-- start.sh             # Script to deploy Minikube cluster without a gateway
|-- .github/workflows/
|   |-- deploy.yaml          # GitHub Actions pipeline
|-- .env.example             # Example environment variables required for the project
|-- README.md                # Project documentation
```

## How the Application Works
The application is a real-time messaging platform where users can:
- **Create an account and log in** securely using authentication mechanisms.
- **Chat with other users** in real-time via a responsive front-end application.
- **Store and retrieve messages** using a PostgreSQL database.
- **Communicate securely** through SSL/TLS encryption.
- **Interact via an API gateway**, which routes requests to the appropriate backend services.

### User Flow
1. **User Registration & Authentication**
   - New users can sign up and create an account.
   - Authentication is handled securely with token-based authentication.
2. **Messaging Features**
   - Users can send and receive messages in real time.
   - Messages are stored persistently in the PostgreSQL database.
   - Users can retrieve their message history.
3. **Secure Communication**
   - All data transmission is encrypted with SSL/TLS.
   - The API is protected through authentication and authorization mechanisms.

Upon successful deployment, users should expect:
- A fully functional web-based messaging app accessible via a domain or IP.
- Secure API endpoints for handling user authentication and messaging.
- A PostgreSQL database storing user and message data.

## CI/CD Pipeline
The deployment workflow is fully automated using GitHub Actions and consists of the following steps:

### 1. Testing
- Runs automated tests on both the frontend and backend for every push to any branch, ensuring code integrity.

### 2. Build and Push
- Builds Docker images for the frontend and backend.
- Pushes these images to the GitHub Container Registry (GHCR) when changes are pushed to the `main` branch.

### 3. Deployment
- Runs on a **self-hosted GitHub runner** to deploy the application.
- **Applies Kubernetes manifests** to Minikube.
- **Configurable Gateway Mode**: Supports both Istio and Ingress, selectable via input parameters.
- **Secure Secrets Management**: Uses environment variables and GitHub secrets for configuration.
- **Automatic SSL Encryption**: Generates and manages SSL/TLS certificates using a dedicated script.

### Manual Deployment
To manually trigger a deployment with a specific gateway, run:
```sh
gh workflow run deploy.yaml -f gatewayMode=ingress
```
OR
```sh
gh workflow run deploy.yaml -f gatewayMode=istio
```
By default, a push will use **Ingress mode** unless otherwise specified.

### Environment Variables & Secrets
The pipeline is fully configurable through environment variables and secrets:
- **Secrets**: Stores sensitive data such as database credentials and encryption keys.
- **Environment Variables**: Defines database connection parameters, service URLs, and other runtime settings.
- **Kubernetes Secrets Integration**: Automatically encrypts and injects secrets into deployments for enhanced security.

## Testing Locally with Minikube
To test the application locally using Minikube, follow these steps:

### 1. Generate SSL Certificates
Run the following command to create the necessary certificates:
```sh
openssl req -x509 -new -nodes -newkey rsa:2048 -keyout y-CA.key -sha256 -days 365 -out y-CA.crt -subj "/C=FR/L=Paris"
```

### 2. Add Certificate to Chrome
1. Open `chrome://settings/certificates`
2. Navigate to `Authorities`
3. Import `y-CA.crt`

### 3. Load Environment Variables
Copy the `.env.example` file and rename it to `.env`, then fill in the necessary values.
```sh
cp .env.example .env
```

### 4. Start Minikube with the Desired Gateway
- **For Ingress Gateway**:
  ```sh
  bash scripts/start-ingress.sh
  ```
- **For Istio Gateway**:
  ```sh
  bash scripts/start-istio.sh
  ```

### 5. Configure `/etc/hosts` for Gateway Resolution
- **For Istio Ingress Gateway**:
  ```sh
  minikube tunnel
  ```
  And in another terminal: 
  ```sh
  source .env
  sudo bash -c "echo $(kubectl get svc istio-ingressgateway -n istio-system -o jsonpath='{.status.loadBalancer.ingress[].ip}') $POSTGRES_HOST $BACK_HOST $FRONT_HOST >> /etc/hosts"
  ```
- **For Minikube Ingress Gateway**:
  ```sh
  source .env
  sudo bash -c "echo $(minikube ip) $POSTGRES_HOST $BACK_HOST $FRONT_HOST >> /etc/hosts"
  ```

## Security Measures
- **RBAC**: Implements Kubernetes Role-Based Access Control for secure access management.
- **Secrets Management**: Ensures credentials and sensitive information are securely stored and accessed.
- **SSL/TLS**: Automated certificate generation using OpenSSL to secure communication between services.
