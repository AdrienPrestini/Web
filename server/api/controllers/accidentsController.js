//var mongoose = require('mongoose');
var accidentService = require('../services/accidentsService');

exports.list_all_accidents = function(req, res) {
    accidentService.getAllAccidents().then((result) => {
        console.log("COUCOU");
        res.json(result);
    }).catch((error) => {
        console.log(error);
    });
};