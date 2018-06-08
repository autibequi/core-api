# CORE API

This project aims to create a efficient `CORE API` capable of improving request latency and reduce costs.

## Quick Start
This project uses Docker for its development environment. To start type `make up`

To access the docker environment to run `npm` or `yarn` commands execute `make access`

## Deploy

This project uses elasticbeanstalk for its production environment. You will need the `AWS CLI` to execute the `./deploy.sh` script. 

You can install `AWS CLI` with `PIP` using:

```sh
pip install awsebcli --upgrade --user
```

You will also need to set the variables required in `./deploy.sh`

## Docker or Nodejs in production

You can either deploy the project on `EB` on a `DOCKER` environment or in a `NODEJS` environmnet.

In my test there was almost no impact in running the project with docker if the instance is big enougth.

## Load Test

You can make a load test to a single endpoint usiung `testlaod`

To install execute: `npm install -g testload`

The you can run the following example:

```sh
loadtest http://URL/auth -T 'application/json' -P '{"email":"???","password":"???"}' -c 10 --rps 20
```