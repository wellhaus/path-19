// import * as bcrypt from "bcryptjs";
// const jwt = require('jsonwebtoken');
const model = require('./model');
require('dotenv').config();
// const TOKEN_SECRET = process.env

// Resolvers define the technique for fetching the types defined in the
// schema.
export const resolvers = {
  Query: {
       locations: async () => {
         const queryText =  'SELECT * FROM Locations'
        try {
          const locations = await model.query(queryText);
          console.log(locations.rows)
          return locations.rows;
        } catch(err) {
          console.log('Error in getLocations query: ', err)
          return err;
        }
  
       } 
  },
  Mutation: {
    /* Add a Location 
          client-side mutation will look something like:
                mutation addLocation {
                 updateUserEmail(name: 'Benny', longitude: '234234.24, 
                 latitude: 23523.9023, onset: '2020-06-06', 
                 dateVisited: '2020-06-01'){
              }
      }
    */

    // data is an object that contains all GraphQL arguments provided for this field
       addLocation: async (root, data) => {
      const {name, longitude, latitude, onset, dateVisited} = data;
         const queryText = `INSERT INTO 
                            Locations (name,longitude,latitude,onset,dateVisited) 
                            VALUES ($1,$2,$3,$4,$5)`;
         try {
         await model.query(queryText, [name, longitude, latitude, onset, dateVisited]);
       }  catch (err) {
         console.log('Error in addLocation resolver:', err);
         return err;
       }
        }
    /* Register */
    //  register: async (root, {email, password}) => {
    // const insertQuery = 'INSERT INTO Users (email, password) VALUES ($1,$2)';
    // const findQuery = 'SELECT * FROM Users WHERE username=$1';
    //  const hashedPassword = await bcrypt.hash(password, 10);
    //  * insert user into SQL db using  *
    //  await model.query(insertQuery, [email, hashedPassWord);
    //  *find user in db so we can sign the JWT with their id*
    //  const user = await model.query(findQuery, [username]);
    // * add token to user - not sure that we'll need this *
    // const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
    // return { token, user };
    /* Login */
    //  login: async (root, {email, password}) => {
    // * find user in db *
    // const user = await model.query(findQuery, [username]);
    // if (!user) throw new Error('Cannot find user in database')
    // * check for matching password *
    // const isMatch = await bcrypt.compare(password, user.password);
    // if (!isMatch) throw new Error('Invalid password')
    // const token = jwt.sign({ _id: user._id }, TOKEN_SECRET);
    // return { token, user };
    // }
  },
};
