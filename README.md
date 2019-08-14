# Example for backend with Node.js
This repos show and example of Node.js backend

## Getting Started

    npm install
    npm start

## Docker

    docker build -t backend/node --rm .
    docker run -p 3000:3000 backend/node

## Usage
[http://localhost:3000/api](http://localhost:3000/api)

| Endpoint | Description |
| -------- | ----------- |
| **GET :** http://localhost:3000/api/jukebox | Jukebox list split by page |

| param | required? | Description |
| -------- | ----------- | ------ |
| settingId | required | Jukebox setting identifier |
| model | optional | A jukebox model |
| limit | optional | Number of jukebox by page |
| offset | optional | Requested page |

## Todo
Better unit test