//var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var accidentService = require('../services/accidentsService');


//router.get('/', list_all_accidents);
router.get('/:_id', accidentById);
router.get('/:lat_start/:lng_start/:lat_end/:lng_end', accidentsOnItinerary);
router.get('/circle/:lat_center/:lng_center/:radius', accidentsInRadius);

//ADD ACCIDENT
router.post('/', newAccident);
//MODIFY ACCIDENT
//DELETE ACCIDENT

//ADD COMMENT ACCIDENT
//DELETE COMMENT ACCIDENT


module.exports = router;


function list_all_accidents(req, res) {
    /*accidentService.getAllAccidents()
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });*/
    res.send('{}');
}

function accidentsInRadius(req, res) {

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

/*
Fonction newAccident
Le body de la requête doit avoir les informations suivantes :
{
    libelle: "nom ou rue de l'accident",
    lat : 1.0
    long : 2.0
}
 */
function newAccident(req, res){
    accidentService.newAccident(req.body).then((result) => {
        console.log("Correctly added");
        res.send(result);
    })
    .catch((error) => {
        console.log("Error while adding accident");
        res.status(400).send(error);
    });
}