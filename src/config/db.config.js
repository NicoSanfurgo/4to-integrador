const ENV_CONFIG = require("./env.config");
const { DATABASE, DB_HOST, DB_PASSWORD } = ENV_CONFIG;
const DB_CONFIG = {
    mongo: {
        uri: DB_HOST.replace('<password>', DB_PASSWORD).replace('<database>', DATABASE),
    }
}

module.exports = DB_CONFIG;