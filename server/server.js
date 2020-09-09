import { typeDefs, resolvers } from './schema/index';

const express = require('express');
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

// Error handler - 404 catch-all
server.use('*', (req, res) => res.sendStatus(404));

// Error handler – global 
server.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

server.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
