const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const typeDefs = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const getUser = require('./schema/utils');

const PORT = 4000;

const app = express();

// Connect to ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const tokenWithBearer = req.headers.authorization || '';
    const token = tokenWithBearer.split(' ')[1];
    const user = getUser(token);
    return user;
  },
});
// Apply express as middleware
server.applyMiddleware({ app, path: '/graphql' });

/* Express error handlers – potentially remove */
// // Error handler - 404 catch-all
// server.use('*', (req, res) => res.sendStatus(404));

// // Error handler – global
// server.use((err, req, res, next) => {
//   const defaultErr = {
//     log: 'Express error handler caught unknown middleware error',
//     status: 400,
//     message: { err: 'An error occurred' },
//   };
//   const errorObj = { ...defaultErr, ...err };
//   console.log(errorObj.log);
//   return res.status(errorObj.status).json(errorObj.message);
// });

server.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
