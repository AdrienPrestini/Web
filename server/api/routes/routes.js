module.exports = function(app) {
    
    app.use('/accidents', require('../controllers/accidentsController'));
};