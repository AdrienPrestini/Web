var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var util = require('util');
var Q = require('Q');
//var url = 'mongodb://localhost:27017/test';

// Connection URL
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


exports.getAllAccidents = function() {
    return new Promise((resolve, reject) => {
        accidents.find({}).toArray(function(err, docs) {
            if(err) reject(err);
            resolve(docs);
        });
    });
}