dojo-api
========

This is a simple REST API for use at front-end coding dojo.

Project stack
-------------

- Express 4
- MongoDB
- Redis

**If you need run it using containers**

- Docker
- Docker compose

Start with docker
-----------------

The `docker-compose.yml` file is configured to start Node.js, 
MongoDB and Redis containers. Run the command below for start containers.

```
$ docker-compose up -d
```

Swagger
-------

This project have a documentation using Swagger, you can access this feature using
`/api-docs` route. 

Example: `http://127.0.0.1:8080/api-docs`
