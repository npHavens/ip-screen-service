# ip-screen-service

Server and Database connection for Procure Browser extension project

## Prerequisites

- Node version 14 or later
- Docker Desktop
- AWS CLI

## Local Development

`yarn install` to prepare the Node dependencies.

`yarn dev` to run locally with hot reloading.

`yarn docker` to build prod container locally

`yarn deploy` to deploy built image to AWS ECS

## Architecture
![https://lucid.app/documents/embeddedchart/ccfe4ca1-ffe6-4e67-ae3f-ad2a68170653" id="Vndx~CRsn5po"](https://lucid.app/documents/embeddedchart/ccfe4ca1-ffe6-4e67-ae3f-ad2a68170653" id="Vndx~CRsn5po")
## Swagger
Available locally at [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
## Sample request to load balancer of deployed app
`curl --request POST 'http://ec2co-ecsel-1f4r218iok7rq-2041122609.us-east-1.elb.amazonaws.com:3000/ip' --header 'Content-Type: application/json' --data-raw '{
    "ipList" : [
        "169.50.13.60",
        "169.50.13.67",
        "169.50.13.61",
        "169.50.13.60"
    ]
}'`

## Didn't have time for..
- Persistent DB
- Unit/e2e tests
- Env varirable/secret management
- API Gateway/SSL
