var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var util = require('util');
var Q = require('Q');
//var url = 'mongodb://localhost:27017/test';

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'projetWeb';

exports.getAllAccidents = function() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, client) {
            if(err)
                reject("Connexion impossible à MongoDB");

            var db = client.db(dbName);
            db.collection('Caracteristiques').find({}).toArray(function(err, docs) {
                console.log("Found the following records");
                resolve(docs);
            });
        });
    });
}