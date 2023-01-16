const creditCardModel =  require('../models/creditcard.model');
const { isNumeric, isValidLength, checkLugh10 }  = require('../utils/creditCardNumber.util');
const { ApiError }  = require('../utils/errorHandler.util');
const { CONSTANTS } = require('../constants');


const getAllCreditCards = (request, response) => {
        const creditCards = creditCardModel.getAllCreditCards();
        response.status(200).json(creditCards);
}

const createCreditCard = (request, response, next) => {
    const { creditCardHoldername, creditCardNumber, creditCardLimitInGBP } = request.body;

    if (validateCreditCardNumber(creditCardNumber)) {
        const creditCardDetails = {
            creditCardHoldername,
            creditCardNumber,
            creditCardLimitInGBP,
            creditCardBalanceInGBP: 0
        };
        const newCreditCardDetils = creditCardModel.createCreditCard(creditCardDetails);
        response.status(201).json(newCreditCardDetils);
    }
}

const validateCreditCardNumber = (creditCardNumber) =>{
    if(typeof(creditCardNumber) !== 'string') {
        throw new ApiError(400, CONSTANTS.ERROR_MESSAGES.CC_NUMERICAL_STRING_EXP);
    }
    else if(!isNumeric(creditCardNumber) || !isValidLength(creditCardNumber) || !checkLugh10(creditCardNumber)){
        throw new ApiError(400, CONSTANTS.ERROR_MESSAGES.CC_NUMBER_INVALID);
    }
    return true;
}

module.exports= { getAllCreditCards, createCreditCard };