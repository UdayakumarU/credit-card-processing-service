const express = require('express');
const swaggerUI = require("swagger-ui-express");
const { creditCardRouter } = require('./routes/creditcard.routes');
const { notFoundRouter } = require('./routes/notFound.routes');

const { errorHandler } = require("./utils/errorHandler.util");
const swaggerSpecs = require('./swagger.json');


const creditCardProcessingApp = express();
/** MIDDLEWARES **/
creditCardProcessingApp.use(express.json());
creditCardProcessingApp.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

/** ROUTES **/
creditCardProcessingApp.use('/v1/credit-cards', creditCardRouter);
creditCardProcessingApp.use('*', notFoundRouter);
creditCardProcessingApp.use(errorHandler);

const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'test') {
    creditCardProcessingApp.listen(PORT);
}

module.exports = { creditCardProcessingApp };