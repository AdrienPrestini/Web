module.exports = function(app) {
    
    app.use('/accidents', require('../controllers/accidentsController'));

    app.use('/administrativeAreas', require('../controllers/administrativeAreaController'));
};