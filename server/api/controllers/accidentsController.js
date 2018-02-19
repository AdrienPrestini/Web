var express = require('express');
var router = express.Router();
var accidentService = require('../services/accidentsService');

//PROPERTIES GET METHODS
router.get('/', list_all_accidents);//Tous les accidents
router.get('/itinerary/'/*:lat_start/:lng_start/:lat_end/:lng_end'*/, accidentsOnItinerary); //GET ACCIDENTS ON ITINERARY
router.get('/polygon/', accidentsInPolygon); 
router.get('/:_id', accidentById);//Accident par ID
router.get('/departement/:_idDep', accidentInDepartement);
router.get('/region/:_idReg', accidentInRegion);
router.get('/commune/:_idCom', accidentInCommune);
//Accident par departement / ville / region
//Accident par nombre de commentaires ?



//GEOSPATIAL GET METHODS

//router.get('/circle/:lat_center/:lng_center/:radius', accidentsInRadius); //GET ACCIDENTS IN CIRCLE
//GET ACCIDENTS IN CIRCLE

router.post('/', newAccident); //ADD ACCIDENT
router.put('/:_id', updateAccident); //MODIFY ACCIDENT
//DELETE ACCIDENT
router.delete('/:_id', removeAccident);


router.post('/:_idaccident/comment', newComment); //ADD COMMENT ACCIDENT
router.delete('/:_idaccident/comment/:_idcomment', deleteComment); //DELETE COMMENT ACCIDENT


module.exports = router;

function accidentsInRadius(req, res) {
    console.log('Accident in Radius');
    accidentService.getAccidentInRadius(req.params.lat_center, req.params.lng_center, req.params.radius)
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function accidentsInPolygon(req, res) {
    console.log('Accident in Polygon');
    accidentService.getAccidentInPolygon(req.query.lat_center, req.query.lng_center, req.query.distance)
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function accidentsOnItinerary(req, res) {
    console.log('Accident on itinerary');
    accidentService.getAccidentsOnItinerary(req.query.latstart, req.query.lngstart, req.query.latend, req.query.lngend)
    .then((result) => {
        res.send(result);
    }).catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function accidentById(req, res){
    console.log("Accident by ID");
    accidentService.getAccidentById(req.params._id)
    .then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function accidentInRegion(req, res) {
    console.log("Accident in Region");
    accidentService.accidentInRegion(req.params._idReg).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
}

function accidentInDepartement(req, res) {
    console.log("Accident in Departement");
    accidentService.accidentInDepartement(req.params._idDep).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
}

function accidentInCommune(req, res) {
    console.log("Accident in Commune");
    accidentService.accidentInCommune(req.params._idCom).then((result) => {
        res.send(result);
    }).catch((error) => {
        res.status(400).send(error);
    });
}

function newComment(req, res) {
    console.log("Comment adding");
    accidentService.addComment(req.params._idaccident, req.body).then((result) => {
        console.log("Comment added");
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function deleteComment(req, res) {
    console.log("Deleting comment "+ req.params._idcomment);
    accidentService.deleteComment(req.params._idaccident, req.params._idcomment).then((result) => {
        console.log("Comment "+ req.params._idcomment+ " deleted.");
        res.send(result);
    })
    .catch((error) => {
        console.log(error);
        res.status(400).send(error);
    });
}

function list_all_accidents(req, res) {
    console.log("Get all accident");
    accidentService.getAllAccidents(req.query).then((result) => {
        res.send(result);
    }).catch((error) => {
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
    console.log("Add accident");
    accidentService.newAccident(req.body).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log("Error while adding accident");
        res.status(400).send(error);
    });
}

/*
Fonction updateAccident
Le body de la requête doit avoir les informations suivantes :
{
    libelle: "nom ou rue de l'accident",
    lat : 1.0
    long : 2.0
}
 */
function updateAccident(req, res){
    console.log("Update Accident");
    accidentService.updateAccident(req.params._id, req.body).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log("Error while updating accident");
        res.status(400).send(error);
    });
}

/*
Fonction removeAccident
 */
function removeAccident(req, res){
    console.log("delete");
    accidentService.removeAccident(req.params._id).then((result) => {
        res.send(result);
    })
    .catch((error) => {
        console.log("Error while removing accident");
        res.status(400).send(error);
    });
}