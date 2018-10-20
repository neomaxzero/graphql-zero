const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLID,
  GraphQLInt,
  GraphQLString,
  GraphQLBoolean,
  GraphQLNonNull,
  GraphQLList,
  GraphQLInputObjectType
} = require("graphql");

const graphNodeInterface = require("./graphTypes/node");

const videoRepository = require("./data/index");

const videoType = new GraphQLObjectType({
  name: "Video",
  description: "Magical description",
  fields: {
    id: { type: GraphQLNonNull(GraphQLID), description: "id of the video" },
    title: { type: GraphQLString, description: "title of the video" },
    duration: { type: GraphQLInt, description: "duration of the video" },
    watched: { type: GraphQLBoolean, description: "watched or not" }
  },
  interfaces: [graphNodeInterface]
});

const videoInputType = new GraphQLInputObjectType({
  name: "VideoInput",
  fields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: "title"
    },
    duration: {
      type: new GraphQLNonNull(GraphQLInt),
      description: "duration"
    },
    released: {
      type: new GraphQLNonNull(GraphQLBoolean),
      description: "released"
    }
  }
});

const mutation = new GraphQLObjectType({
  name: "Mutation",
  description: "root mutation",
  fields: {
    createVideo: {
      type: videoType,
      args: {
        video: {
          type: new GraphQLNonNull(videoInputType)
        }
      },
      resolve: (_, args) => videoRepository.createVideo(args.video)
    }
  }
});

const queryType = new GraphQLObjectType({
  name: "QueryType",
  description: "The root query type",
  fields: {
    video: {
      args: {
        id: {
          type: GraphQLNonNull(GraphQLID),
          description: "id of the video we want to retrieve"
        }
      },
      type: videoType,
      resolve: (_, args) => videoRepository.getVideoById(args.id)
    },
    videos: {
      type: GraphQLList(videoType),
      resolve: videoRepository.getVideoById
    }
  }
});

const schema = new GraphQLSchema({
  query: queryType,
  mutation
});

const query = `
    query {
        videos {
            id,
            title,
            duration,
            watched
        }
    }
`;

module.exports = {
  schema
};
