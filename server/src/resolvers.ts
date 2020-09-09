// import * as bcrypt from "bcryptjs";
const jwt = require('jsonwebtoken');
const model = require('./model.js');
require('dotenv').config();
// const TOKEN_SECRET = process.env

// Resolvers define the technique for fetching the types defined in the
// schema.
const resolvers = {
  Query: {
    //   locations:  *some function to execute SQL query *
  },
  Mutation: {
    /* Add a Location */
    //   addLocation: * some function to execute SQL query *
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

export default resolvers;
