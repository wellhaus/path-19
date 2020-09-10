// import * as bcrypt from "bcryptjs";

import { query } from "express";

// const jwt = require('jsonwebtoken');
const model = require('./model');
require('dotenv').config();
// const TOKEN_SECRET = process.env

// Resolvers define the technique for fetching the types defined in the
// schema.
export const resolvers = {
  Query: {
    locations: async () => {
      const queryText = 'SELECT * FROM Locations'
      try {
        // Send query to Postgres
        const locations = await model.query(queryText);
        console.log('Returned Data: ', locations.rows)

        // invoke locationReducer to return custom date for onset and dateVisited keys
        // otherwise, these keys are returned as a string of unreadable numbers i.e. '1584946800000'
        const locationReducer = (location) => {
          const onsetDate = new Date(location.onset)
          const onsetYear = onsetDate.getFullYear();
          const onsetMonth = monthName(onsetDate.getMonth())
          const onsetDay = onsetDate.getDate();
          const onsetDatestring = `${onsetMonth} ${onsetDay}, ${onsetYear}`;

          const date = new Date(location.dateVisited)
          const year = date.getFullYear();
          const month = monthName(date.getMonth())
          const day = date.getDate();
          const datestring = `${month} ${day}, ${year}`;

          function monthName(index) {
            const monthLegend = {
              0: "January",
              1: "February",
              2: "March",
              3: "April",
              4: "May",
              5: "June",
              6: "July",
              7: "August",
              8: "September",
              9: "October",
              10: "November",
              11: "December"
            }
            return monthLegend[index];
          };
          return {
            _id: location._id,
            name: location.name,
            latitude: location.latitude,
            longitude: location.longitude,
            onset: onsetDatestring,
            dateVisited: datestring,
            user_id: location.user_id,
          };
        }
        // map over locations array of objects, and invoke locationReducer on each object
        // to return custom date format
        return locations.rows.map((locationObj: any) => locationReducer(locationObj));
      } catch (err) {
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
      const { name, longitude, latitude, onset, dateVisited } = data;
      const queryText = `INSERT INTO 
                            Locations (name, latitude, longitude, onset, dateVisited) 
                            VALUES ($1, $2, $3, $4, $5)`;
      try {
        await model.query(queryText, [name, latitude, longitude, onset, dateVisited]);
      } catch (err) {
        console.log('Error in addLocation resolver: ', err);
        return err;
      }
    },

    deleteLocation: async (root, data) => {
      const { _id } = data;
      const queryText = `DELETE `

      try {
        await model.query(queryText, _id);
      } catch (err) {
        console.log('Error in deleteLocation resolver: ', err);

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
