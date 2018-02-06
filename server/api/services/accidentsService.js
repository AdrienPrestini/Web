var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var util = require('util');
var fetch = require('node-fetch');

var polygonTools = require('../../tools/polygon');

var API_KEY = 'AIzaSyCc1nFIcd0mm88LpTCiHxgrCImzOs7JxN4';

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
        var result = {};
        getDirections({latitude: '43.686277', longitude: '7.236539'}, {latitude: '43.691242', longitude: '7.244883'})
            .then(res => res.json())
            .then(json => { 
                var steps = json.routes[0].legs[0].steps;
                result.steps = [];
                for(var i = 0 ; i < steps.length; ++i) {
                    result.steps.push({
                        distance : steps[i].distance,
                        duration : steps[i].duration,
                        instruction :steps[i].html_instructions
                    });
                }
                var polygonItinerary = polygonTools.getPolygonByPolyline(json.routes[0].overview_polyline.points);
                console.log(polygonItinerary);
                accidents.find({
                    geometry: { 
                        $geoIntersects: {
                            $geometry: {
                                "type": "Polygon",
                                "coordinates": [
                                    polygonItinerary
                                ]
                            }
                        }
                    }    
                    //_id: new ObjectId('5a78635aa4f6552feb9084c3')
                }).toArray(function(err, docs) {
                    if(err) 
                        reject(err);
                    console.log(docs);
                    result.dangerPoint = docs;
                    resolve(result);
                });
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


function getDirections(start, end) {
    return fetch('https://maps.googleapis.com/maps/api/directions/json?origin='+start.latitude+','+start.longitude+'&destination='+end.latitude+','+end.longitude+'&key='+API_KEY);
}

