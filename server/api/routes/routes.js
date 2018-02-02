module.exports = function(app) {
    var accidentsController = require('../controllers/accidentsController');
  
    app.route('/accidents')
      .get(accidentsController.list_all_accidents);
};