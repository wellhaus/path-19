const { ApolloServer, gql } = require('apollo-server');

// Define tables and types for each field
// Exclamation point means that it is non-nullable (aka it's required)
const typeDefs: any = gql`
  # type Query defines all top-level entry points for queries that clients can execute
  type Query {
    currentUser: User!
    locations: [Location]
  }

  type User {
    id: Int!
    email: String!
    locations: [Location]
    # jwt: String
  }

  type Location {
    _id: Int!
    name: String!
    longitude: Int!
    latitude: Int!
    onset: String!
    dateVisited: String!
    timestamp: Int!
    user: User
  }

  # query GetLocations {
  #  locations {
  # 			id
  #   		name
  #    	longitude
  #    	latitude
  #    	onset
  #    	dateVisited
  #   }
  # }

# Send LoginResponse rather than user, so client can save token for additional requests
  type LoginResponse {
    token: String!
    user: User!
  }

  # Mutation type defines entry points for write operations
  type Mutation {
    addLocation(longitude: Int, latitude: Int, timestamp: Int): Location
    register(email: String!, password: String!): LoginResponse
    login(email: String!, password: String!): LoginResponse
  }
`;

export default typeDefs;
