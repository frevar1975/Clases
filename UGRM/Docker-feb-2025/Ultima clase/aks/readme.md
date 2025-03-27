# **Deploying a Flask App on Azure Kubernetes Service (AKS)**

## **📌 Overview**
This guide explains how to build, push, and deploy a simple Flask application in **Azure Kubernetes Service (AKS)** using **Azure Container Registry (ACR)**.

---
## **1️⃣ Prerequisites**
Before proceeding, ensure you have the following:
- **Azure CLI** installed ([Download here](https://learn.microsoft.com/en-us/cli/azure/install-azure-cli))
- **Docker** installed ([Download here](https://www.docker.com/get-started))
- **kubectl** installed ([Install Guide](https://kubernetes.io/docs/tasks/tools/))
- Access to an **Azure Subscription**
- An **Azure Kubernetes Service (AKS)** cluster (`AKSUGRM`)
- An **Azure Container Registry (ACR)** (`miacrdemougrm`)

---
## **2️⃣ Step 1: Create and Containerize the Flask App**

### **Create a simple `app.py` file**
```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def home():
    return "¡Hola desde AKS!"

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
```

### **Create a `Dockerfile`**
```dockerfile
# Use Python base image
FROM python:3.9

# Set working directory
WORKDIR /app

# Copy the application files
COPY app.py .

# Install dependencies
RUN pip install flask

# Expose port
EXPOSE 5000

# Run the application
CMD ["python", "app.py"]
```

---
## **3️⃣ Step 2: Build and Push the Docker Image to ACR**
### **Login to Azure and ACR**
```sh
az login
az acr login --name miacrdemougrm
```

### **Build the Docker Image**
```sh
docker build -t miapp:v1 .
```

### **Tag the Image for ACR**
```sh
docker tag miapp:v1 miacrdemougrm.azurecr.io/miapp:v1
```

### **Push the Image to ACR**
```sh
docker push miacrdemougrm.azurecr.io/miapp:v1
```

---
## **4️⃣ Step 3: Deploy to AKS**

### **Ensure AKS Can Access ACR**
```sh
az aks update --resource-group UGRM --name AKSUGRM --attach-acr miacrdemougrm
```

### **Deploy the Application**
Create a `deployment.yaml` file:
```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: miapp
spec:
  replicas: 1
  selector:
    matchLabels:
      app: miapp
  template:
    metadata:
      labels:
        app: miapp
    spec:
      containers:
        - name: miapp
          image: miacrdemougrm.azurecr.io/miapp:v1
          ports:
            - containerPort: 5000
---
apiVersion: v1
kind: Service
metadata:
  name: miapp-service
spec:
  type: LoadBalancer
  selector:
    app: miapp
  ports:
    - protocol: TCP
      port: 80
      targetPort: 5000
```

### **Apply the Deployment**
```sh
kubectl apply -f deployment.yaml
```

### **Check Deployment Status**
```sh
kubectl get pods
```

---
## **5️⃣ Step 4: Verify Deployment**
### **Get External IP of the Service**
```sh
kubectl get service miapp-service
```
Example Output:
```
NAME            TYPE           CLUSTER-IP      EXTERNAL-IP      PORT(S)        AGE
miapp-service   LoadBalancer   10.0.13.61      20.124.56.78     80:30344/TCP   1m
```

### **Test the Application**
#### **Using Browser:**
Go to:
```
http://20.124.56.78
```
You should see:
```
¡Hola desde AKS!
```

#### **Using cURL:**
```sh
curl http://20.124.56.78
```
Expected Output:
```
¡Hola desde AKS!
```

---
## **6️⃣ Troubleshooting**

### **Check if the Pod has an ImagePullBackOff Error**
```sh
kubectl describe pod <pod-name>
```

### **Check the Logs**
```sh
kubectl logs <pod-name>
```

### **Ensure Image is in ACR**
```sh
az acr repository list --name miacrdemougrm --output table
az acr repository show-tags --name miacrdemougrm --repository miapp --output table
```

### **Rebuild and Redeploy If Needed**
```sh
kubectl delete deployment miapp
kubectl apply -f deployment.yaml
```

---
## **🎯 Conclusion**
✅ You have successfully deployed a Flask application in **Azure Kubernetes Service (AKS)** using **Azure Container Registry (ACR)**.

🚀 Your app is live and accessible via **LoadBalancer External IP**!

