const creditCardController = require('../creditCard.controller');
const creditCardModel =  require('../../models/creditcard.model');

jest.mock('../../models/creditcard.model');

describe('Given the controller getAllCreditCards is invoked', () => {
    it('should call status with 200 and json with models return value', () => {
        const mockModelReturnValue = [
            {"creditCardDetails": "1"},
            {"creditCardDetails": "2"}
        ];
        creditCardModel.getAllCreditCards.mockReturnValueOnce(mockModelReturnValue);
        const mockRequest = {};
        const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        creditCardController.getAllCreditCards(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(200);
        expect(mockResponse.json).toBeCalledWith(mockModelReturnValue);
    });
});

describe('Given the createCreditCard is invoked', () => {
    const definiteErrorCaller = (mockRequest, mockResponse) => {
       return creditCardController.createCreditCard(mockRequest, mockResponse)
    }
    const mockRequest = { body:{
        creditCardHoldername:"some name",
        creditCardNumber: 123,
        creditCardLimitInGBP: 100,
    }};
    const mockResponse = {};

    it('should throw error when creditCardNumber is not string', () => {
        expect(()=>definiteErrorCaller(mockRequest, mockResponse))
            .toThrow("can't parse credit card number! numerical string is expected");
    });

    it('should throw error if creditCardNumber is not numeric string', () => {
        mockRequest.body.creditCardNumber = "123213sadds";
        expect(()=>definiteErrorCaller(mockRequest, mockResponse)).toThrow("invalid credit card number");
    });
    
    it('should throw error if creditCardNumber length is greater than 19', () => {
        mockRequest.body.creditCardNumber = "12323123231231231231231";
        expect(()=>definiteErrorCaller(mockRequest, mockResponse)).toThrow("invalid credit card number");
    });
    
    it('should throw error if creditCardNumber not lugh 10 compatible', () => {
        mockRequest.body.creditCardNumber = "123";
        expect(()=>definiteErrorCaller(mockRequest, mockResponse)).toThrow("invalid credit card number");
    });
    
    it('should call status with 201 and json with models return value for valid credit card number', () => {
        const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        mockRequest.body.creditCardNumber = "901";
        creditCardModel.createCreditCard.mockReturnValueOnce(mockRequest.body);
        creditCardController.createCreditCard(mockRequest, mockResponse);
        expect(mockResponse.status).toBeCalledWith(201);
        expect(mockResponse.json).toBeCalledWith(mockRequest.body);
    });
});