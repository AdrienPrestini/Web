process.env.NODE_ENV = 'test';

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var config = require('config');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../server');
let should = chai.should();

chai.use(chaiHttp);

const url = 'mongodb://localhost:27017';
console.log(config.DBName);
const dbName = 'accidents_test';
const collectionName = 'Accidents';
var accidents;

MongoClient.connect(url, function(err, client) {
    if(err)
        console.log("Connexion impossible à MongoDB. Collection : ", collectionName);

    db = client.db(dbName);
    accidents = db.collection(collectionName);
    console.log("Connexion à la collection ", collectionName);
});

describe('Accidents', () => {

    beforeEach((done) => {
        accidents.remove({}, function(err, delOK) {
            if (err) 
                throw err;
            done();
        });    
    });

    describe('/GET basic', () => {
        it('it should GET empty result', (done) => {
            chai.request(server)
                .get('/accidents/')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    res.body.length.should.be.eql(0);
                    done();
                });
        });
    });

    describe('/POST accident', () => {
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
                hrmn: "09:45"
            })
            .end((err, res) => {
                chai.request(server)
                .get('/accidents/'+res.body)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.properties.should.have.property('datetime').eql('2015-09-16T09:45:00+02:00');
                    res.body.properties.should.have.property('adr').eql('06 rue du 06');
                    res.body.properties.should.have.property('nbv').eql(6);
                    res.body.properties.should.have.property('code_postal').eql("06410");
                    res.body.properties.should.have.property('hrmn').eql("09:45");
                    res.body.properties.coord.should.be.a('array');
                    res.body.properties.coord.length.should.be.eql(2);
                    res.body.properties.coord[1].should.be.eql(7.195670121876096);
                    res.body.properties.coord[0].should.be.eql(43.705377028411945);
                    done();
                });
            }); 
        });
    });

    /*describe('/PUT', () => {
        it('it should create an accident', (done) => {
            done();
        });

        it('it should update the created accident', (done) => {
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
    });
       
    describe('/DELETE', () => {
        it('it should create an accident', (done) => {
            done();
        });

        it('it should delete the created accident', (done) => {
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
    });*/

        /*it('it should return all accidents in department Var', (done) => {
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
        */

        

        

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