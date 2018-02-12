//var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var accidentService = require('../services/accidentsService');


//router.get('/', list_all_accidents);
router.get('/:_id', accidentById);
router.get('/:lat_start/:lng_start/:lat_end/:lng_end', accidentsOnItinerary);
router.get('/circle/:lat_center/:lng_center/:radius', accidentsInRadius);

//router.post('/addCommentary/:_id')

//ADD ACCIDENT
//MODIFY ACCIDENT
//DELETE ACCIDENT

//ADD COMMENT ACCIDENT
//DELETE COMMENT ACCIDENT


module.exports = router;

function accidentsInRadius(req, res) {
    accidentService.getAccidentInRadius(req.params.lat_center, req.params.lng_center, req.params.radius)
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function accidentsOnItinerary(req, res) {
    accidentService.getAccidentsOnItinerary(req.params.lat_start, req.params.lng_start, req.params.lat_end, req.params.lng_end)
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function accidentById(req, res){
    accidentService.getAccidentById(req.params._id)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}