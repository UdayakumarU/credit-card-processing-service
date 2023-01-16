const express = require("express");
const creditCardRouter = express.Router();
const creditCardController = require('../controllers/creditCard.controller'); 


creditCardRouter.get('/', (request, response, next) =>{
    try{
        creditCardController.getAllCreditCards(request, response);
    }
    catch(error){
        next(error);
    }
});

creditCardRouter.post('/', (request, response, next) =>{
    try{
        creditCardController.createCreditCard(request, response);
    }
    catch(error){
        next(error);
    }
});


module.exports = { creditCardRouter };