# Docker compose tutorial
## Index

1. [Code the microservices](#code-the-microservices)
2. [Create docker-compose file](#create-docker-compose-file)
3. [Deploy infrastructure](#deploy-infrastructure)

## Code the microservices
We will use the backend and frontend example folders in P2-docker-compose.

Backend connects to a mongo db. Listens on port 4000
- `GET /fruits` returns the fruits stored in mongo db 
- `POST /fruits` stores the json body as a fruit in db
- `POST /fruits/populate` populates de db with sample fuits

Frontend. Listens on port 3000
- `GET /returns` the landing page (index.html)
- `GET /fruits` calls backend and shows the fruits in the db
- `GET /fruits/populate` calls backend populate db

The Frontend calls the backend using `http://host.docker.internal:PORT/PATH`

We cannot use 'localhost' because the execution is within a container. Each container has its own distinct 'localhost.' However, communication between containers is possible using 'host.docker.internal.' The request is transmitted within the Docker network that groups the containers.

## Create docker-compose file
docker-compose.local.yml:
```yml
version: '3'

services:

  mongo:
    container_name: simplest-app-mongo
    image: mongo:6.0 #service from image stored in docker hub
    networks:
      - backend-network
    # Volume for persisting data. Normally, if you don't use a volume,
    # data will be lost when the container is removed.
    volumes:
      - 'simplest-app-mongo-volume:/data/db'

  backend:
    container_name: simplest-app-backend
    build:  #image built from Dockerfile in the backend directory
      context: ./backend
      dockerfile: Dockerfile
    ports:
      - '4000:4000'
    networks:
      - backend-network
    depends_on:
      - mongo

  frontend:
    container_name: simplest-app-frontend
    ports: 
      - '80:3000'
    # the app will be listening inside the container at localhost:3000
    # this localhost is the container's internal localhost, not your machine's localhost
    # port 80 in the host machine (your pc) will be mapped to port 3000 in the container
    # so you (host) can access the frontend in the browser using localhost:80
    build: ./frontend
    networks:
      - backend-network
      - frontend-network
    depends_on:
      - backend
    volumes: #bind mount for the frontend, 
    #changes in index.html will be reflected in the container without rebuilding the image
      - ./frontend:/opt/app

volumes:
  simplest-app-mongo-volume: null

networks:
  backend-network: null #network for backend and mongo
  frontend-network: null #network for frontend

```
## Deploy infrastructure

Run the following command:
```bash
docker-compose -f docker-compose.local.yml up -d
```

aditional options: 
- `--env-file PATH` uses the .env file to set enviroment variables (Tokens,Ports,...)