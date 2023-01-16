const express = require("express");
const notFoundRouter = express.Router();
const { CONSTANTS } = require("../constants");

notFoundRouter.get('*', (request, response) =>{
    response.status(404).json({message: CONSTANTS.ERROR_MESSAGES.ROUTE_NOT_FOUND});
});

module.exports = { notFoundRouter };