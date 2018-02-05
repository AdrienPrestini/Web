var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var util = require('util');

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'accidents';
// This file's collection
const collectionName = 'Accidents';

var db;
var accidents;
MongoClient.connect(url, function(err, client) {
    if(err)
        console.log("Connexion impossible à MongoDB. Collection : ", collectionName);

    db = client.db(dbName);
    accidents = db.collection(collectionName);
    console.log("Connexion à la collection ", collectionName);
});

var service = {};

service.getAllAccidents = getAllAccidents;
service.getAccidentById = getAccidentById;

module.exports = service;




function getAllAccidents() {
    return new Promise((resolve, reject) => {
        accidents.find({
            geometry:
                { $geoWithin:
                   { $centerSphere: [ [ 7.261953, 43.710173 ], 5 / 3963.2 ] } } 
        }).toArray(function(err, docs) {
            if(err) reject(err);
            resolve(docs);
        });
    });
}

function getAccidentById(id){
    return new Promise((resolve, reject) => {
        accidents.findOne({'_id': new ObjectId(id)}, (err, docs) => {
            if(err) reject(err);
            resolve(docs);
        });
    });
}