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
<img width="933" alt="Screen Shot 2021-04-26 at 6 22 38 PM" src="https://user-images.githubusercontent.com/13711827/116162954-6bf1c000-a6bc-11eb-8888-7c138e5c5cc4.png">

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
- Env variable/secret management
- API Gateway/SSL
- Performance of indexing git ip files(Only new changes could be added instead of entire list)
