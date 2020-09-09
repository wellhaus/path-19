const jwt = require('jsonwebtoken');
// import secret from DOTENV here

export const getUser = (token) => {
  try {
    if (token) {
      // add secret as second arg to verify
      return jwt.verify(token);
    }
    return null;
  } catch (err) {
    return null;
  }
};

