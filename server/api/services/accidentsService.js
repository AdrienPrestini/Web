var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var util = require('util');

const url = 'mongodb://localhost:27017';

const dbName = 'accidents';

exports.getAllAccidents = function() {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, function(err, client) {
            if(err)
                reject("Connexion impossible à MongoDB");

            var db = client.db(dbName);
            db.collection('Accidents').find({ 
                geometry: {
                    
                    $geoWithin:
                    { 
                        $centerSphere: [ [ 7.261953, 43.710173 ], 5 / 3963.2 ] 
                    } 
                    
                }
            }).toArray(function(err, docs) {
                console.log(docs.length);
                resolve(docs);
            });
        });
    });
}