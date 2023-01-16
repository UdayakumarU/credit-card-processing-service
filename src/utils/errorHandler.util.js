const { CONSTANTS } = require("../constants");

class ApiError extends Error {
    constructor(statusCode, message) {
      super(message);
      this.statusCode = statusCode;
      this.errorMessage = message;
    }
};

const errorHandler = (error, request, response, next) => {
  if(error){
    response
      .status(error.statusCode || 500)
      .json({"message" : error.errorMessage || CONSTANTS.ERROR_MESSAGES.INTERNAL_ERROR});
  }
  next();
}

module.exports = { errorHandler, ApiError };