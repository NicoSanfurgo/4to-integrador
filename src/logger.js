const winston = require("winston");

const customLevelOptions = {
  levels: {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
  },
  colors: {
    fatal: "red",
    error: "magenta",
    warning: "yellow",
    info: "green",
    http: "blue",
    debug: "gray",
  },
};

const logger = winston.createLogger({
  levels: customLevelOptions.levels,
  transports: [
    new winston.transports.Console({
      level: "info",
      format: winston.format.combine(
        winston.format.colorize({ colors: customLevelOptions.colors }),
        winston.format.simple()
      ),
    }),
    new winston.transports.File({
      filename: "src/logs/errors.log",
      level: "error",
    }),
    new winston.transports.File({
      filename: "src/logs/warn.log",
      level: "warning",
    }),
    new winston.transports.File({
      filename: "src/logs/fatal.log",
      level: "fatal",
    }),
    new winston.transports.File({
      filename: "src/logs/http.log",
      level: "http",
    }),
    new winston.transports.File({
      filename: "src/logs/debug.log",
      level: "debug",
    }),
  ],
});

module.exports = logger;