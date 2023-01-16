const { ApiError, errorHandler } = require('../errorHandler.util');

describe('Given initializing the ApiError object', () => {
    it('should assign values to statusCode and errorMessage', () => {
        const apiError = new ApiError(100, "some error message");
        expect(apiError.statusCode).toBe(100);
        expect(apiError.errorMessage).toBe("some error message");
    });
});

describe('Given the middleware errorHandler is invoked', () => {
    const mockRequest = {};
    const mockNext = jest.fn();
    const mockResponse = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    it('should call next when error is undefined', () => {
        const mockError = {errorMessage:"some error Message"};
        errorHandler(mockError, mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toBeCalledWith(500);
        expect(mockNext).toBeCalled();

    });
    it('should call status with 500 if statusCode is undefined', () => {
        const mockError = {};
        errorHandler(mockError, mockRequest, mockResponse, mockNext);
        expect(mockResponse.status).toBeCalledWith(500);

    });
    it('should call json with `internal server error` if errorMessage is undefined', () => {
        const mockError = {};
        errorHandler(mockError, mockRequest, mockResponse, mockNext);
        expect(mockResponse.json).toBeCalledWith({message: "internal server error"});

    });
});