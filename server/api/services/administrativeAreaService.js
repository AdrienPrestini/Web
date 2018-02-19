var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

var accents = require('remove-accents');
var assert = require('assert');
var util = require('util');
var fetch = require('node-fetch');
var config = require('config');
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = config.DBName;
// This file's collection

var db;

var departements;
var regions;
var communes;

MongoClient.connect(url, function(err, client) {
    if(err)
        console.log("Connexion impossible à MongoDB. Collection : ", collectionName);

    db = client.db(dbName);

    departements = db.collection("departements");
    regions = db.collection("regions");
    communes = db.collection("communes");
});

var service = {};
service.regionsByRegExp = getAllRegionsByRegExp;
service.departementsByRegExp = getAllDepartementsByRegExp;
service.communesByRegExp = getCitiesByRegExp;

module.exports = service;

function getAllRegionsByRegExp(regexp) {
    regexp = accents.remove(regexp);
    return new Promise((resolve, reject) => {
        regions.find({
           'properties.nom' : { $regex: new RegExp('^'+regexp), $options : 'i' }
        },
        { 
            _id: 1, 
            properties: 1 
        }).toArray(function(err, docs) {
            console.log(docs);
            if(err)
                reject(err);
            resolve(docs);
        });
    });
}

function getAllDepartementsByRegExp(regexp) {
    return new Promise((resolve, reject) => {
        departements.find({
           'properties.nom' : { $regex: new RegExp('^'+regexp), $options : 'i' }
        },
        { 
            _id: 1, 
            properties: 1 
        }).toArray(function(err, docs) {
            console.log(docs);
            if(err)
                reject(err);
            resolve(docs);
        });
    });
}

function getCitiesByRegExp(regexp) {
    return new Promise((resolve, reject) => {
        communes.find({
           'properties.nom' : { $regex: new RegExp('^'+regexp), $options : 'i' }
        },
        { 
            _id: 1, 
            properties: 1 
        }).toArray(function(err, docs) {
            console.log(docs);
            if(err)
                reject(err);
            resolve(docs);
        });
    });
}