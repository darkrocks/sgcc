/**
 * Created by user on 25.04.2015.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../client'));
require('./routes.js')(app);
app.listen(port);
console.log("App listening on port " + port);