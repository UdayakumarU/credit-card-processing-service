const request = require('supertest');
const { creditCardProcessingApp } = require('../../server');

describe('Undefined routes or methods', ()=>{
    describe('on calling any undefined routes', ()=>{
        it('should respond with 404 status and json as Content-Type', async ()=>{
            return request(creditCardProcessingApp)
                .get('/v1/debit-cards')
                .expect(404)
                .expect('Content-Type', /json/);
        });

        it('should respond with error message', async ()=>{
            return request(creditCardProcessingApp)
                .get('/v1/debit-cards')
                .then((response) => {
                    expect(response.body).toEqual(
                        expect.objectContaining({
                            "message": "route not found"
                        })
                )
            });
        })
    })
})