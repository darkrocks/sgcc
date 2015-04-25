/**
 * Created by user on 25.04.2015.
 */
var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var path = require('path');

app.use(express.static(path.join(__dirname, '../')));
require('./routes.js')(app);
app.listen(port);
console.log("App listening on port " + port);