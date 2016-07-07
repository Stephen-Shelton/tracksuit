var express = require('express');
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337;
var app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '../public'));



app.listen(port);
console.log("Server listening on port " + port);
