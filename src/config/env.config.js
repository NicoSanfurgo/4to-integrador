const dotenv = require("dotenv");

dotenv.config();

const ENV_CONFIG = {
  DATABASE: process.env.DATABASE || "",
  DB_HOST: process.env.DB_HOST || "",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  PORT: process.env.PORT || 8080,
  SECRET_KEY: process.env.SECRET_KEY || "",
  SESSION_KEY: process.env.SESSION_KEY || "",
  MAILING_SERVICE: process.env.MAILING_SERVICE || "",
  MAILING_USER: process.env.MAILING_USER || "",
  MAILING_PASSWORD: process.env.MAILING_PASSWORD || "",
};

module.exports = ENV_CONFIG;
