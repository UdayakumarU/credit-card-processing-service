const { isNumeric, isValidLength, checkLugh10 }  = require('../creditCardNumber.util');


describe('Given the isNumeric function is invoked', () => {
    it('should return false it is empty', () => {
        const mockNumber = "";
        expect(isNumeric(mockNumber)).toBe(false);
    });
    it('should return false if consist anything other than numbers', () => {
        const mockNumber = "23233.2";
        expect(isNumeric(mockNumber)).toBe(false);
    });
    it('should return true if consist only numbers', () => {
        const mockNumber = "232332";
        expect(isNumeric(mockNumber)).toBe(true);
    });
});

describe('Given the isValidLength function is invoked', () => {
    it('should return false if its length greater than 19', () => {
        const mockNumber = "2323242342343433334232";
        expect(isValidLength(mockNumber)).toBe(false);
    });
    it('should return true if its length less than 19', () => {
        const mockNumber = "232332";
        expect(isValidLength(mockNumber)).toBe(true);
    });
    it('should return true if its length equal to 19', () => {
        const mockNumber = "1234567890123456789";
        expect(isValidLength(mockNumber)).toBe(true);
    });
});

describe('Given the checkLugh10 function is invoked', () => {
    it('should return false if it lugh is value not divisible by 10', () => {
        const mockNumber = "32423434";
        expect(checkLugh10(mockNumber)).toBe(false);
    });
    it('should return true if it lugh value is divisible by 10', () => {
        const mockNumber = "901";
        expect(checkLugh10(mockNumber)).toBe(true);
    });
});