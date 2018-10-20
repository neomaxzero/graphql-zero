const server = require('./server');
const graphQlMiddleware = require('./graphql-plug');

graphQlMiddleware();

server.start();