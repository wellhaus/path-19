const jwt = require('jsonwebtoken');
// import secret from DOTENV here

const getUser = (token) => {
  try {
    if (token) {
      return jwt.verify(token, SECRET);
    }
    return null;
  } catch (err) {
    return null;
  }
};
export default getUser;
