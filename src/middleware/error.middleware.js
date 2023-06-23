const { HTTP_STATUS } = require("../utils/api.utils");

const errorHandler = (error, req, res, next) => {
    const errorMessage = error.description || error.message || 'There was an unknown error';
    const errorDetails = error.description ? null : error;
    const response = {
        success: false,
        errorMessage,
        errorDetails
    }
    res.status(error.statusNumber || HTTP_STATUS.SERVER_ERROR).json(response);
}

module.exports = errorHandler;