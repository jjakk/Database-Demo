const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 8000;
const mongoUrl = process.env.MONGODB_URI || "mongodb://localhost:27017/mydb";

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

var data;
MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function(err, db) {
  if (err) throw err;
  var dbo = db.db("mydb");
  var myobj = { name: "Hello World", address: "Highway 37" };
  dbo.collection("customers").insertOne(myobj, function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    db.close();
  });
  dbo.collection("customers").findOne({}, function(err, result) {
    if (err) throw err;
    console.log(result);
    data = result;
    db.close();
  });
});

app.get('/', function(req, res){
  res.render('index.pug', {data: data.name});
}).listen(port);

console.log('Running on port ' + port);
