const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  SERVER_ERROR: 500,
};

class HttpError {
  constructor(description, status = 500, details = null) {
    this.description = description;
    this.statusNumber = status;
    this.details = details;
  }
}

const bcrypt = require("bcrypt");
const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(10));
const isValidPassword = (userDB, password) =>
  bcrypt.compareSync(password, userDB.password);

module.exports = {
  HTTP_STATUS,
  HttpError,
  hashPassword,
  isValidPassword,
};
