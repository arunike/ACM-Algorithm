# ACM Algorithm

## Description

## Installation Production
### Backend
``````
cd backend
``````

``````
docker compose up
``````

### Frontend
``````
cd frontend
``````

``````
sh start_react.sh
``````

## Installation Development
### Backend
``````
cd backend
``````

``````
docker compose up
``````

### Frontend
``````
cd frontend
``````

``````
npm install
``````

``````
npm run dev
``````

## Remove Docker
### Docker Images Removal
``````
docker rmi $(docker images -q) -f 
``````

### Docker Containers Removal
``````
docker rm $(docker ps -a -q) -f
``````
