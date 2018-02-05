//var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var accidentService = require('../services/accidentsService');


router.get('/', list_all_accidents);
router.get('/:_id', accidentById);

module.exports = router;


function list_all_accidents(req, res) {
    accidentService.getAllAccidents()
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