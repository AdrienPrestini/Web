module.exports = function(app) {
    var todoList = require('../controllers/accidentsController');
  
    // todoList Routes
    app.route('/accidents')
      .get(todoList.list_all_accidents);
};