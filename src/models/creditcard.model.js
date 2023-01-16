const { creditCards } = require("../data/creditCard.data");


const getAllCreditCards = () => {
    return creditCards;
}

const createCreditCard = (creditCard) => {
    const newCreditCard = { id: (creditCards.length+1).toString(), ...creditCard};
    creditCards.push(newCreditCard);
    return newCreditCard;
}

module.exports = { getAllCreditCards, createCreditCard };