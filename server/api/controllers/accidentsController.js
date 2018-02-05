//var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();
var accidentService = require('../services/accidentsService');


router.get('/', list_all_accidents);

module.exports = router;


function list_all_accidents(req, res) {
    accidentService.getAllAccidents().then((result) => {
        console.log("COUCOU");
        res.json(result);
    }).catch((error) => {
        console.log(error);
    });
};