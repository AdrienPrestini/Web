var express = require('express');
var router = express.Router();
var administrativeAreaService = require('../services/administrativeAreaService');

module.exports = router;

router.get('/regions/:regexp', list_all_regions_by_regexp);
router.get('/departements/:regexp', list_all_departements_by_regexp);
router.get('/communes/:regexp', list_all_cities_by_regexp);

function list_all_regions_by_regexp(req, res){
    console.log("coucou");
    administrativeAreaService.regionsByRegExp(req.params.regexp).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
}

function list_all_departements_by_regexp(req, res) {
    administrativeAreaService.departementsByRegExp(req.params.regexp).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
}

function list_all_cities_by_regexp(req, res) {
    administrativeAreaService.communesByRegExp(req.params.regexp).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        res.status(400).send(error);
    });
}