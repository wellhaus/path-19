import { typeDefs, resolvers } from './index';

const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');
const { ApolloServer } = require('apollo-server-express');

const PORT = 4000;

const app = express();

// Connect to ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});
// Apply express as middleware
server.applyMiddleware({ app, path: '/graphql' });

server.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
