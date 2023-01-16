/**
 * @param {string} number 
 * @returns {boolean}
 */
const isNumeric = (number) =>{
   return /^[0-9]+$/.test(number);
}


/**
 * @param {string} number 
 * @returns {boolean}
 */
const isValidLength = (number) =>{
    return (number.length <= 19);
}


/**
 * @param {string} cardNumber 
 * @returns {boolean}
 */
const checkLugh10 = (cardNumber) =>{
    let sum = 0;
    let canDouble = false;
    for(let index = cardNumber.length-1; index >= 0; --index){
        const currentDigit = parseInt(cardNumber[index]);
        if(canDouble){
            const doubledValue = (currentDigit*2);
            sum += doubledValue > 9? doubledValue-9: doubledValue;
        }
        else{
            sum += currentDigit;
        }
        canDouble = !canDouble;
    }
    return ((sum%10) == 0);
}

module.exports = { isNumeric, isValidLength, checkLugh10 }