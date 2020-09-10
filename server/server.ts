import { ApolloServer } from 'apollo-server';
import typeDefs from './src/typeDefs'; // Apollo type definitions 
import { resolvers } from './src/resolvers';
import { getUser } from './src/utils';

const PORT = 5000

// TODO: move context into utils.ts
// set up global context for each resolver
const context = ({ req }) => {
  const tokenWithBearer = req.headers.authorization || '';
  const token = tokenWithBearer.split(' ')[1];
  const user = getUser(token);
  return user;
}

// Connect to ApolloServer
const server = new ApolloServer({
  typeDefs, // instantiate type definitions
  resolvers,
  context,
  tracing: true,
});

server.listen({ port: PORT }, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}/`);
});
