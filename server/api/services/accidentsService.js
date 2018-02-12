var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var util = require('util');
var fetch = require('node-fetch');

var polygonTools = require('../../tools/polygon');

    
var RouteBoxer = require('geojson.lib.routeboxer'),
    boxer = new RouteBoxer(),
    boxes;
var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const uuidv4 = require('uuid/v4');

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

service.getAccidentsOnItinerary = getAccidentsOnItinerary;
service.getAccidentById = getAccidentById;
service.newAccident = newAccident;
service.getAccidentInRadius = getAccidentInRadius;
service.updateAccident = updateAccident;

service.addComment = addComment;
service.deleteComment = deleteComment;

module.exports = service;

function getAccidentsOnItinerary(lat_start, lng_start, lat_end, lng_end) {
    return new Promise((resolve, reject) => {
        var result = {};
        getDirections({latitude: lat_start, longitude: lng_start}, {latitude: lat_end, longitude: lng_end})
            .then(res => res.json())
            .then(json => {
                if(json.routes[0].legs == 'undefined'){
                    console.log("OKOK");
                    resolve('{}');
                } 
                else {
                    var steps = json.routes[0].legs[0].steps;
                    result.steps = [];
                    for(var i = 0 ; i < steps.length; ++i) {
                        result.steps.push({
                            distance : steps[i].distance,
                            duration : steps[i].duration,
                            instruction :steps[i].html_instructions
                        });
                    }
                    boxes = boxer.box(polygonTools.transformItinerayToLineString(json.routes[0].overview_polyline.points), 0.1);
                    var multiPolygon = polygonTools.transformPolygonArrayToMultiPolygon(boxes);
                    accidents.find({
                        geometry: { 
                            $geoIntersects: {
                                $geometry: {
                                    "type": "MultiPolygon",
                                    "coordinates": multiPolygon
                                }
                            }
                        }
                    }).toArray(function(err, docs) {
                        if(err) {
                            var NEBounds = json.routes[0].bounds.northeast;
                            var SWBounds = json.routes[0].bounds.southwest;
                            console.log(NEBounds);
                            console.log(SWBounds);
                            accidents.find({
                                geometry: { 
                                    $geoIntersects: {
                                        $geometry: {
                                            "type": "Polygon",
                                            "coordinates": [
                                                [
                                                    [NEBounds.lng, NEBounds.lat],
                                                    [NEBounds.lng, SWBounds.lat],
                                                    [SWBounds.lng, SWBounds.lat],
                                                    [SWBounds.lng, NEBounds.lat],
                                                    [NEBounds.lng, NEBounds.lat]
                                                ]
                                            ]
                                        }
                                    }
                                }
                            }).toArray(function(err, docs) {
                                if(err) {
                                    reject(err);
                                }
                                result.dangerPoint = docs;
                                resolve(result);
                            });
                        } else {
                            result.dangerPoint = docs;
                            resolve(result);
                        }
                    });
                }
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

function getAccidentInRadius(lat_center, lng_center, radius) {
    var radiusKM = radius/1000;
    return new Promise((resolve, reject) => {
        accidents.find( {
            geometry: { $geoWithin: { $centerSphere: [ [ lng_center, lat_center ], radiusKM/6,378.1 ] } }
        })
    }) 
}


function getDirections(start, end) {
    return fetch('https://maps.googleapis.com/maps/api/directions/json?language=fr&origin='+start.latitude+','+start.longitude+'&destination='+end.latitude+','+end.longitude+'&key='+GOOGLE_API_KEY);
}

function addComment(infos) {
    return new Promise((resolve, reject) => {
        accidents.update({
            "_id" : new ObjectId(infos._idaccident) 
        },
        {
            $push : {
                "comments" : {
                    'id': uuidv4(),
                    'text' : infos.text,
                    'rate': infos.rate
                }
            }
        },
        { 
            upsert : true 
        }).then((r) => {
            resolve(r);
        });
    });
}

function deleteComment(idaccident, idcomment) {
    return new Promise((resolve, reject) => {
        accidents.update({
            "_id": new ObjectId(idaccident) 
        },
        { 
            $pull: { 
                "comments" : { 
                    id: idcomment 
                } 
            } 
        },
        false,
        true)
        .then((r) => {
            resolve(r);
        });
    });
}

function formatAccidentModel(infos){
    var accident = {geometry:{}, properties:{}};
    accident.geometry.coordinates = [infos.long, infos.lat];
    accident.properties.coord = [infos.lat, infos.long];
    accident.properties.libellevoie = infos.libelle;
    return accident;
}

function newAccident(infos){
    var accident = formatAccidentModel(infos);

    return new Promise((resolve, reject) => {
        accidents.insertOne(accident)
        .then((r) => {
            resolve(r.insertedId);
        }).catch((error) => {
            reject(error);
        });
    });
}

function updateAccident(id, infos){
    var accident = formatAccidentModel(infos);

    return new Promise((resolve, reject) => {
        accidents.updateOne({ _id: new ObjectId(id) }, { $set: accident })
        .then((r) => {
            resolve(r.insertedId);
        }).catch((error) => {
            reject(error);
        });
    });
}