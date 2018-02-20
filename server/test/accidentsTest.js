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
const dbName = config.DBName;
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

    describe('Basic operation on empty DB', () => {
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

    describe('Operation on filled DB', () => {
        var accidentID;
        beforeEach((done) => {
            accidents.insertOne({ 
                "geometry" : { 
                    "type" : "Point", 
                    "coordinates" : [ 7.195670121876096, 43.705377028411945 ] 
                }, 
                "properties" : { 
                    "datetime" : "2015-09-16T09:45:00+02:00", 
                    "adr" : "06 rue du 06", 
                    "nbv" : 6, 
                    "code_postal" : "06410", 
                    "coord" : [ 43.705377028411945, 7.195670121876096 ], 
                    "hrmn" : "09:45" 
                }, 
                "comments" : [] 
            }).then((r) => {
                accidentID = r.insertedId;
                done();
            });   
        });
    
        describe('/PUT', () => {
            it('it should update an accident', (done) => {
                //PUT
                chai.request(server)
                .put('/accidents/'+accidentID)
                .send({ 
                    "geometry" : { "type" : "Point", "coordinates" : [ 5.78, 47.95 ] }, 
                    "properties" : { 
                        "datetime" : "2015-09-16T09:45:00+02:00", 
                        "adr" : "06 rue du 06", 
                        "nbv" : 7, 
                        "agg": "En agglomération",
                        "code_postal" : "06410", 
                        "coord" : [ 47.95, 5.78 ], 
                        "hrmn" : "12:45" 
                    }, 
                    "comments" : [], 
                }).end((err, res) => {
                    res.should.have.status(200);
                    res.body.ok.should.be.eql(1);
                    res.body.nModified.should.be.eql(1);
                    chai.request(server)
                        .get('/accidents/'+accidentID)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.properties.should.have.property('adr').eql('06 rue du 06');
                            res.body.properties.should.have.property('nbv').eql(7);
                            res.body.properties.should.have.property('code_postal').eql("06410");
                            res.body.properties.should.have.property('hrmn').eql("12:45");
                            res.body.properties.should.have.property('agg').eql("En agglomération");
                            res.body.properties.coord[1].should.be.eql(5.78);
                            res.body.properties.coord[0].should.be.eql(47.95);
                            done();
                        });
                });
            });
        });
           
        describe('/DELETE', () => {
            it('it should delete an accident', (done) => {
                chai.request(server)
                .delete('/accidents/'+accidentID)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.ok.should.be.eql(1);
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
        });
    });
});