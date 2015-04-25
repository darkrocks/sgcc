/**
 * Created by user on 25.04.2015.
 */
var path = require('path');

module.exports = function(app) {
    app.get('*', function (req, res) {
         console.log('default route');
         res.sendFile(path.join(__dirname, '../client/app', 'index.html'));
    });
};