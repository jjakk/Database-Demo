const express = require('express');
const bodyParser = require('body-parser');
const pug = require('pug');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = process.env.PORT || 8000;
const mongoUrl = "mongodb://localhost:27017/mydb";

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res){
  MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var query = {};
    dbo.collection("users").find(query).toArray(function(err, result) {
      if (err) throw err;
      res.render('index.pug', {users: result});
      db.close();
    });
  });
}).listen(port);

app.post('/createUser', function(req, res){
  MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    var myobj = { firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age };
    dbo.collection("users").insertOne(myobj, function(err, res) {
      if (err) throw err;
      db.close();
    });
  });
  res.redirect('/');
});

app.post('/deleteUser', function(req, res){
  MongoClient.connect(mongoUrl, {useUnifiedTopology: true}, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    console.log(req.body);
    var myquery = { firstName: req.body.firstName, lastName: req.body.lastName, age: req.body.age };
    dbo.collection("users").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted", myquery);
      db.close();
    });
  });
  res.redirect('/');
});

console.log('Running on port ' + port);
