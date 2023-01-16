const request = require('supertest');
const { creditCardProcessingApp } = require('../../server');



describe('GET /v1/credit-cards', ()=>{
    describe('on calling the given route and http method', ()=>{
        it('should respond with 200 status and json as Content-Type', async ()=>{
            return request(creditCardProcessingApp)
                .get('/v1/credit-cards')
                .expect(200)
                .expect('Content-Type', /json/);
        });

        it('should respond with array of all credit card details', async ()=>{
            return request(creditCardProcessingApp)
                .get('/v1/credit-cards')
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.arrayContaining([
                            expect.objectContaining({
                                "id": expect.any(String),
                                "creditCardHoldername": expect.any(String),
                                "creditCardNumber": expect.any(String),
                                "creditCardBalanceInGBP": expect.any(Number),
                                "creditCardLimitInGBP": expect.any(Number),
                            })
                        ])
                    )
                })
        });
    });
});

describe('POST /v1/credit-cards', ()=>{
    describe('Given the valid credit card number in the request body', ()=>{
        const mockRequest = {
            "creditCardHoldername" : "some name",
            "creditCardNumber" : "901",
            "creditCardLimitInGBP": 1000
        };

        it('should respond with 201 status and json as content type', async ()=>{
            return request(creditCardProcessingApp)
                .post('/v1/credit-cards')
                .send(mockRequest)
                .expect(201)
                .expect('Content-Type', /json/);
        });

        it('should respond with newly inserted credit card detail', async ()=>{
            return request(creditCardProcessingApp)
                .post('/v1/credit-cards')
                .send(mockRequest)
                .then( (response) =>{
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            "id": expect.any(String),
                            "creditCardHoldername": "some name",
                            "creditCardNumber": "901",
                            "creditCardBalanceInGBP": 0,
                            "creditCardLimitInGBP": 1000
                        })
                    )
                })
        });
    });

    describe('Given the invalid credit card number in the request body', ()=>{
        const mockRequest = {
            "creditCardHoldername" : "some name",
            "creditCardNumber" : "dfdsfsfddsf",
            "creditCardLimitInGBP": 1000
        };
        
        it('should respond with 400 status and json as content type', async ()=>{
            return request(creditCardProcessingApp)
                .post('/v1/credit-cards')
                .send(mockRequest)
                .expect(400)
                .expect('Content-Type', /json/);
        });

        it('should respond with error message', async ()=>{
            return request(creditCardProcessingApp)
                .post('/v1/credit-cards')
                .send(mockRequest)
                .then( (response) =>{
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            "message": "invalid credit card number"
                        })
                    )
                })
        });
    });

    describe('Given the credit card number in non numerical string type', ()=>{
        const mockRequest = {
            "creditCardHoldername" : "some name",
            "creditCardNumber" : 12323323,
            "creditCardLimitInGBP": 1000
        };
        
        it('should respond with 400 status and json as content type', async ()=>{
            return request(creditCardProcessingApp)
                .post('/v1/credit-cards')
                .send(mockRequest)
                .expect(400)
                .expect('Content-Type', /json/);
        });

        it('should respond with error message', async ()=>{
            return request(creditCardProcessingApp)
                .post('/v1/credit-cards')
                .send(mockRequest)
                .then( (response) =>{
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            "message": "can't parse credit card number! numerical string is expected"
                        })
                    )
                })
        });
    });
})