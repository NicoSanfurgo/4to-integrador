const passport = require("passport");
const passportJwt = require("passport-jwt");
const passportGithub = require("passport-github2");
const { HTTP_STATUS } = require("../utils/api.utils");
const ENV_CONFIG = require("../config/env.config");
const { cookieExtractor } = require("../utils/session.utils");
const getDAOS = require("../models/daos/index.dao");
const githubStrategy = passportGithub.Strategy;
const jwtStrategy = passportJwt.Strategy;
const ExtractJwt = passportJwt.ExtractJwt;
const { usersDAO } = getDAOS();
const { SECRET_KEY } = ENV_CONFIG;

passport.use(
  new jwtStrategy(
    {
      secretOrKey: SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
    },
    async (jwt_payload, done) => {
      try {
        done(null, jwt_payload);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  new githubStrategy(
    {
      clientID: "Iv1.fa385e5f07a97079",
      clientSecret: "db857bce80b3d391bf9dc204811a27b8fc3230b4",
      callbackURL: "http://localhost:8080/api/sessions/github/callback",
    },
    async (_aToken, _rToken, profile, done) => {
      const userData = profile._json;
      try {
        const user = await usersDAO.getUserByEmail(userData.email);
        if (!user) {
          const newUser = {
            first_name: userData.name.split(" ")[0],
            last_name: userData.name.split(" ")[1],
            email: userData.email,
            password: null,
            github_username: userData.login,
            role: "USER",
          };
          const newUserResponse = await usersDAO.createUser(newUser);
          done(null, newUserResponse._doc);
          return;
        }
        done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

const passportCustom = (strategy, options = {}) => {
  return async (req, res, next) => {
    await passport.authenticate(
      strategy,
      { session: false, ...options },
      (error, user, info) => {
        if (error) {
          return next(error);
        }
        if (!user) {
          return res
            .status(HTTP_STATUS.UNAUTHORIZED)
            .json({ error: info.message ?? `${info}` });
        }
        req.user = user;
        next();
      }
    )(req, res, next);
  };
};

module.exports = passportCustom;
