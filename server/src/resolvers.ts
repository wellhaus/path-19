import * as bcrypt from "bcryptjs";
require('dotenv').config();
const jwt = require('jsonwebtoken');
const { TOKEN_SECRET } = process.env

const model = require('./model');

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
const monthName = (index) => monthLegend[index];

// Return custom date for onset and dateVisited keys
const locationReducer = (location) => {
  const onsetDate = new Date(location.onset)
  const onsetYear = onsetDate.getFullYear();
  const onsetMonth = monthName(onsetDate.getMonth())
  const onsetDay = onsetDate.getDate();
  const onsetDatestring = `${onsetMonth} ${onsetDay}, ${onsetYear}`;
  const date = new Date(location.date_visited)
  const year = date.getFullYear();
  const month = monthName(date.getMonth())
  const day = date.getDate();
  const datestring = `${month} ${day}, ${year}`
  return {
    _id: location._id,
    name: location.name,
    latitude: location.latitude,
    longitude: location.longitude,
    onset: onsetDatestring,
    date_visited: datestring,
    user_id: location.user_id,
  };
}

// Resolvers define the technique for fetching the types defined in the schema.
export const resolvers = {
  Query: {
    /* client-side query */
    //  query GetLocations {
    //      locations {
    //    			_id
    //    			name
    //    			longitude
    //    			latitude
    //    			onset
    //    			dateVisited
    //      }
    //    }
    locations: async () => {
      const queryText = 'SELECT * FROM Locations'
      try {
        // Send query to Postgres
        const locations = await model.query(queryText);
        console.log('Returned Data: ', locations.rows)
        // Map over locations array to return custom date format
        return locations.rows.map((locationObj: any) => locationReducer(locationObj));
      } catch (err) {
        console.log('Error in getLocations query: ', err)
        return err;
      }
    }
  },
  Mutation: {
    /* addLocation
          client-side mutation is:
              mutation AddLocation {
                 addLocation(name: "Urrth Cafe", longitude: 234234, 
                 latitude: 23523, onset: "2020-06-06", 
                 dateVisited: "2020-06-01", user_id: 10) {
           success
           message
           }
              }
      }
    */
    addLocation: async (root, data) => {
      const { name, latitude, longitude, onset, date_visited, user_id } = data;
      console.log('Data in addLocation', data)
      const queryText = `INSERT INTO 
                            Locations (name,latitude,longitude,onset,dateVisited,user_id) 
                            VALUES ($1,$2,$3,$4,$5,$6)`;
      try {
        await model.query(queryText, [name, latitude, longitude, onset, date_visited, user_id]);
        return { success: true, message: `${name} successfully added to locations.`, }
      } catch (err) {
        console.log('Error in addLocation resolver:', err);
        return err;
      }
    },

    // client-side mutation is:
    //     mutation deleteLocation{
    //       deleteLocation(locationId: 4) {
    // success
    // message
    // }
    //    }
    deleteLocation: async (root, data) => {
      const { locationId } = data;
      const queryText = `DELETE FROM public.locations
                        WHERE locations._id = ${locationId};`
      try {
        await model.query(queryText);
        const message = `Location Number ${locationId}  successfully deleted in database.`
        console.log(message);
        return { success: true, message }
      } catch (err) {
        console.log('Error in deleteLocation resolver: ', err);
        return err;
      }
    },

    // EDIT LOCATION MUTATION HAS NOT BEEN TESTED
    editLocation: async (root, data) => {
      const { _id, name, latitude, longitude, onset, dateVisited } = data;
      const queryText = `UPDATE public.locations
                        SET 
                        name = 'Keane Coffee',
                        longitude = 50,
                        latitude = 50
                        WHERE locations._id = ${_id};`
      const queryParams = [name, latitude, longitude, onset, dateVisited];
      try {
        await model.query(queryText, queryParams);
        // if successful, query will edit single item in database
        console.log(`Location Number ${_id} - ${name} successfully edited in database.`);
      } catch (err) {
        console.log('Error in updateLocation resolver: ', err);
        return err;
      }
    },


    /* Register */
    // client-side mutation:
    // mutation register {
    //   register(email: "h@hi.com", password: "helloworld", 
    //     firstname: "Me", lastname: "You", 
    //     status: false) {
    //     token
    //     user
    //   }
    // }

    register: async (root, data) => {
      const { email, password, firstname, lastname, status } = data;
      const insertQuery = `INSERT INTO Users (email,password,firstname,lastname,status) 
                                VALUES ($1,$2,$3,$4,$5)`;
      const findQuery = 'SELECT * FROM Users WHERE email=$1';
      const hashedPassword = await bcrypt.hash(password, 10);
      try {
        // add user
        await model.query(insertQuery, [email, hashedPassword, firstname, lastname, status]);
        // find added user
        const user = await model.query(findQuery, [email]);
        // add token to user - not sure that we'll need this *
        const token = jwt.sign({ email: user.email }, TOKEN_SECRET);
        return { token, user };
      } catch (err) {
        console.log('Error in register:', err);
        return err;
      }
    },

    /* Login */
    // CLIENT-SIDE QUERY:
    // mutation login {
    //   login(email: "h@hi.com", password: "helloworld", 
    //    ) {
    //     token
    //     user {
    //      email
    //     }
    //   }
    // }

    login: async (root, { email, password }) => {
      const findQuery = 'SELECT * FROM Users WHERE email=$1';
      try {
        // * find user in db *
        const res = await model.query(findQuery, [email]);
        const [user] = res.rows;
        if (!user) throw new Error('Cannot find user in database');
        // * check for matching password *
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) throw new Error('Invalid password')
        // on success
        const token = jwt.sign({ email: user.email }, TOKEN_SECRET);
        return { token, user };
        // handle any other error
      } catch (err) {
        console.log('Error in login:', err)
        return err;
      }
    }
  },
}



// if (!user) throw new Error('Cannot find user in database')
