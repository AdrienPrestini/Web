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
                    //res.body.length.should.be.eql(15);
                    done();
                });
        });

        it('it should return all accidents in department Var', (done) => {
            chai.request(server)
                .get('/administrativeAreas/departements/Var')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.length.should.be.eql(1);
                    chai.request(server)
                    .get('/accidents/departement/'+res.body[0]._id)
                    .end((err, res) => {
                        res.should.have.status(200);
                        res.body.length.should.be.eql(5);
                        done();
                    });
                });
            //GET
        });

        it('it should create an accident', (done) => {
            //POST
            chai.request(server)
            .post('/accidents')
            .send({
                datetime: "2015-09-16T09:45:00+02:00",
                lat: 43.705377028411945,
                long: 7.195670121876096,
                code_postal: "06410",
                comments: [],
                adr: "06 rue du 06",
                nbv: 6,
                hrmm: "09:45"
            })
            .end((err, res) => {
                res.should.have.status(200);
                //console.log(res.body);
                done();
            }); 
        });

        it('it should update an accident', (done) => {
            //PUT
            chai.request(server)
            .put('/accidents/5a78a49ee9eaca2f596687e4')
            .send({
                datetime: "2015-09-16T09:45:00+02:00",
                lat: 43.705377028411945,
                long: 7.195670121876096,
                code_postal: "06410",
                comments: [],
                adr: "06 rue du 06",
                nbv: 7,
                hrmm: "09:45"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.ok.should.be.eql(1);
                res.body.nModified.should.be.eql(1);
                done();
            });
        });

        it('it should delete an accident', (done) => {
            //DELETE
            chai.request(server)
            .post('/accidents')
            .send({
                datetime: "2015-09-16T09:45:00+02:00",
                lat: 43.705377028411945,
                long: 7.195670121876096,
                code_postal: "06410",
                comments: [],
                adr: "06 rue du 06",
                nbv: 6,
                hrmm: "09:45"
            })
            .end((err, res) => {
                res.should.have.status(200);

                chai.request(server)
                .delete('/accidents/'+res.body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.ok.should.be.eql(1);
                    done();
                });
            }); 
        });

        after(()=> {
            chai.request(server)
            .put('/accidents/5a78a49ee9eaca2f596687e4')
            .send({
                datetime: "2015-09-16T09:45:00+02:00",
                lat: 43.705377028411945,
                long: 7.195670121876096,
                code_postal: "06410",
                comments: [],
                adr: "06 rue du 06",
                nbv: 6,
                hrmm: "09:45"
            })
            .end((err, res) => {
            });
        });
    });
});