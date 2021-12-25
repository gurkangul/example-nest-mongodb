## Description

[Nest](https://github.com/nestjs/nest) framework(with Fastify) TypeScript starter repository.
Swagger(http://localhost:3000/doc)

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Deployment

```bash
$ docker-compose build && docker-compose up -d
```

## Environment

```bash
# docker-compose.yml or You can create .env file in project directory
MONGO_URL: mongodb+srv://ggadmin:ggtest123@cluster0.k7e9w.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
JWT_SECRET: 32dhfnct94q
HASH_SECRET: 545647546564fdgdfgsfh

```

## License

Nest is [MIT licensed](LICENSE).
