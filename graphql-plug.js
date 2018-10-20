const graphqlHTTP = require("express-graphql");
const { server } = require('./server');
const { schema } = require('./graphql');

function init() {
    const graphqlHTTPhandler = graphqlHTTP({
        schema,
        graphiql: true
    })
    
    server.use('/graphql', graphqlHTTPhandler);
}

module.exports = init;