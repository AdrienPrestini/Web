process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


describe('Books', () => {

    describe('Accidents', () => {
        it('it should GET all the accidents', (done) => {
            chai.request(server)
                .get('/accidents/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                    done();
                });
        });

        it('it should return all accidents in department Var', (done) => {
            //GET
        });

        it('it should create an accident', (done) => {
            //POST
        });

        it('it should update an accident', (done) => {
            //PUT
        });

        it('it should add a comment to an accident', (done) => {
            //POST
        });

        it('it should delete an accident', (done) => {
            //DELETE
        });
    });
});