delete process.env.GOOGLE_API_KEY;

require('dotenv').config();

var config = require('config');
var cors = require('cors')
var express = require('express');

var app = express();
app.use(cors());

var bodyParser = require('body-parser');

port = config.Server_Port;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/routes');
routes(app);

app.listen(port);
console.log("Server started on port "+port);

module.exports = app;
