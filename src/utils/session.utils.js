const jwt = require("jsonwebtoken");
const ENV_CONFIG = require("../config/env.config");
const { SECRET_KEY, SESSION_KEY } = ENV_CONFIG;

const generateToken = (user) => {
  const token = jwt.sign(user, SECRET_KEY, { expiresIn: "24h" });
  return token;
};

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies[SESSION_KEY];
  }
  return token;
};

module.exports = {
  generateToken,
  cookieExtractor,
};
