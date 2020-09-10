const { gql } = require('apollo-server');

// Define tables and types for each field
// ! = non-nullable (aka it's required)
const typeDefs: any = gql`
  # type Query defines all top-level entry points for queries that clients can execute
  type Query {
    currentUser: Users!
    locations: [Locations]
  }

  type Users {
    id: Int!
    email: String!
    firstname: String!
    lastname: String!
    status: Boolean!
    locations: [Locations]
  }

  type Locations {
    _id: Int!
    name: String!
    latitude: Float!
    longitude: Float!
    onset: String!
    date_visited: String!
    user_id: Int
    user: Users
  }

# Send LoginResponse rather than user, so client can save token for additional requests
  type LoginResponse {
    token: String!
    user: Users!
  }

  # Let client know whether location was successfully updated
  type UpdateLocation {
    success: Boolean!
    message: String
    # locations: [Locations] # return array of locations, if successful
  }

  # Mutation type defines entry points for write operations
  type Mutation {
    # if false, add location failed -- check errors
    addLocation(name: String!, latitude: Int, longitude: Int, onset: String!, date_visited: String!, user_id: Int): UpdateLocation
    # if false, delete location failed -- check errors
    deleteLocation(locationId: Int!): UpdateLocation
    editLocation(locationId: Int!): UpdateLocation
    register(email: String!, password: String!, firstname: String!, lastname: String! status: Boolean): LoginResponse
    login(email: String!, password: String!): LoginResponse
  }
`;

export default typeDefs;
