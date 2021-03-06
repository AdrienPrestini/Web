
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var assert = require('assert');
var util = require('util');
var fetch = require('node-fetch');
var config = require('config');

var polygonTools = require('../../tools/polygon');
var gpsPointsTools = require('../../tools/gpsPoints');

    
var RouteBoxer = require('geojson.lib.routeboxer'),
    boxer = new RouteBoxer(),
    boxes;
var GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || '';
const uuidv4 = require('uuid/v4');

const url = 'mongodb://localhost:27017';
// Database Name
const dbName = config.DBName;
//var
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
service.getAccidentsOnItinerary = getAccidentsOnItinerary;
service.getAccidentById = getAccidentById;
service.newAccident = newAccident;
service.getAccidentInRadius = getAccidentInRadius;
service.updateAccident = updateAccident;
service.removeAccident = removeAccident;
service.getAccidentInPolygon = getAccidentInPolygon;

service.addComment = addComment;
service.deleteComment = deleteComment;

service.accidentInRegion = getAccidentsInRegion;
service.accidentInDepartement = getAccidentsInDepartement;
service.accidentInCommune = getAccidentsInCommune;

module.exports = service;

function constructFilters(params) {
    var filters = {};
    if(params.date_deb || params.date_fin) {
        if(!params.date_deb) {
            filters['properties.datetime'] = {
                "$lt": new Date(params.date_fin)
            }
        } else if(!params.date_fin) {
            filters['properties.datetime'] = {
                "$gte": new Date(params.date_deb)
            }
        } else {
            filters['properties.datetime'] = {
                "$gte": new Date(params.date_deb),
                "$lt": new Date(params.date_fin)
            }
        }
    }
    if(params.heure_deb || params.heure_fin) {
        if(!params.heure_deb) {
            filters['properties.hrmn'] = {
                "$lt": params.heure_fin
            }
        } else if(!params.heure_fin) {
            filters['properties.hrmn'] = {
                "$gte": params.heure_deb
            }
        } else {
            filters['properties.hrmn'] = {
                "$gte": params.heure_deb,
                "$lt": params.heure_fin
            }
        }
    }
    if(params.code_postal) {
        filters['properties.code_postal'] = {
            "$eq": params.code_postal
        }
    }
    return filters;
}

function getAllAccidents(params) {
    return new Promise((resolve, reject) => {
        accidents.find(constructFilters(params)).toArray(function(err, docs) {
            if(err)
                reject(err);
            resolve(docs);
        });
    });
}

function getAccidentInPolygon(lat, lng, distance) {
    var polygon = gpsPointsTools.getPolygonAroundLocation(lat, lng, distance);
    return new Promise((resolve, reject) => {
        accidents.find({geometry: { 
            $geoIntersects: {
                $geometry: {
                    "type": "Polygon",
                    "coordinates": [polygon]
                }
            }
        }}).toArray(function(err, docs) {
            if(err)
                reject(err);
            //console.log(docs.length);
            resolve(docs);
        });
    }) 
}

function getAccidentsOnItinerary(lat_start, lng_start, lat_end, lng_end) {
    return new Promise((resolve, reject) => {
        var result = {};
        getDirections({latitude: lat_start, longitude: lng_start}, {latitude: lat_end, longitude: lng_end})
            .then(res => res.json())
            .then(json => {
                if(json.routes[0].legs == 'undefined'){
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
    console.log(parseFloat(lat_center));
    console.log(parseFloat(lng_center));
    return new Promise((resolve, reject) => {
        accidents.find({geometry: { 
            $geoIntersects: {
                $geometry: {
                    "type": "Polygon",
                    "coordinates": [
                        [
                          [
                            5.33935546875,
                            43.25345500174343
                          ],
                          [
                            5.484580993652344,
                            43.25345500174343
                          ],
                          [
                            5.484580993652344,
                            43.35938481464255
                          ],
                          [
                            5.33935546875,
                            43.35938481464255
                          ],
                          [
                            5.33935546875,
                            43.25345500174343
                          ]
                        ]
                      ]
                }
            }
        }}).toArray(function(err, docs) {
            if(err)
                reject(err);
            console.log(docs.length);
            resolve(docs);
        });
    }) 
}


function getDirections(start, end) {
    return fetch('https://maps.googleapis.com/maps/api/directions/json?language=fr&origin='+start.latitude+','+start.longitude+'&destination='+end.latitude+','+end.longitude+'&key='+GOOGLE_API_KEY);
}

function getAccidentsInRegion(idRegion) {
    return new Promise((resolve, reject) => {     
        db.collection("regions").findOne({'_id': new ObjectId(idRegion)}, (err, reg) => {
            if(err) reject(err);
            accidents.find({ 
                geometry: { 
                    $geoWithin: { 
                        $geometry: reg.geometry 
                    } 
                } 
            }).toArray(function(err, docs) {
                if(err)
                    reject(err);
                resolve(docs);
            });
        }); 
    });
}

function getAccidentsInDepartement(idDep) {
    return new Promise((resolve, reject) => {     
        db.collection("departements").findOne({'_id': new ObjectId(idDep)}, (err, dep) => {
            if(err) reject(err);
            accidents.find({ 
                geometry: { 
                    $geoWithin: { 
                        $geometry: dep.geometry 
                    } 
                } 
            }).toArray(function(err, docs) {
                if(err)
                    reject(err);
                resolve(docs);
            });
        });
    });
}

function getAccidentsInCommune(idCom) {
    return new Promise((resolve, reject) => {     
        db.collection("communes").findOne({'_id': new ObjectId(idCom)}, (err, com) => {
            if(err) reject(err);
            accidents.find({ 
                geometry: { 
                    $geoWithin: { 
                        $geometry: com.geometry 
                    } 
                } 
            }).toArray(function(err, docs) {
                if(err)
                    reject(err);
                resolve(docs);
            });
        });   
    });
}


function addComment(idaccident, infos) {
    return new Promise((resolve, reject) => {
        accidents.update({
            "_id" : new ObjectId(idaccident) 
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
    var accident = {geometry:{}, properties:{}, comments: []};
    accident.geometry.type = "Point";
    accident.geometry.coordinates = [parseFloat(infos.long), parseFloat(infos.lat)];

    accident.properties.datetime = infos.datetime;
    accident.properties.adr = infos.adr;
    accident.properties.nbv = parseInt(infos.nbv);
    accident.properties.code_postal = infos.code_postal;
    accident.properties.coord = [parseFloat(infos.lat), parseFloat(infos.long)];
    accident.comments = infos.comments;
    accident.properties.agg = infos.agg;
    accident.properties.hrmn = infos.hrmn;
    console.log(accident);
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
    //var accident = formatAccidentModel(infos);
    infos.geometry.coordinates[0] = parseFloat(infos.geometry.coordinates[0]);
    infos.geometry.coordinates[1] = parseFloat(infos.geometry.coordinates[1]);
    infos.properties.coord[0] = parseFloat(infos.properties.coord[0]);
    infos.properties.coord[1] = parseFloat(infos.properties.coord[1]);
    infos.properties.nbv = parseInt(infos.properties.nbv);
    return new Promise((resolve, reject) => {
        accidents.updateOne({ _id: new ObjectId(id) }, { $set: infos })
        .then((r) => {
            resolve(r);
        }).catch((error) => {
            reject(error);
        });
    });
}

function removeAccident(id){
    return new Promise((resolve, reject) => {
        accidents.removeOne({ _id: new ObjectId(id) })
        .then((r) => {
            resolve(r);
        }).catch((error) => {
            reject(error);
        });
    });
}