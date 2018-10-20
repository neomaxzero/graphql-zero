'use strict';

const {
    GraphQLInterfaceType,
    GraphQLNonNull,
    GraphQLID
} = require('graphql');

const nodeInterface = new GraphQLInterfaceType({
    name: 'node',
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
        }
    }
});

module.exports = nodeInterface;
