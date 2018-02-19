process.env.NODE_ENV = 'test';

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);


describe('Books', () => {
    
    describe('Accidents', () => {
        it('it should GET all the accidents in ', (done) => {
            chai.request(server)
                .get('/accidents/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(10);
                    done();
                });
        });
    });
});

// /GET accidents
// /GET/departements (test plusieurs)
// /POST
// /PUT
// /DELETE