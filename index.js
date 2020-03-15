const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const app = express();
const port = process.env.PORT || 8000;

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  res.send('Hello world');
}).listen(port);

console.log('Running on port ' + port);
