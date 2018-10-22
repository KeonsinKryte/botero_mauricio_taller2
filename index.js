const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

//---------- Mongo Variables ----------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const mongoUrl = 'mongodb://localhost:27017';

const mongodbName = 'Vinyl';
//--------------------

//---------- Mongo init-connect : Create and connnect to database ----------
const mongoClient = new MongoClient(mongoUrl);

mongoClient.connect(function (err) {
    assert.equal(null, err);
    console.log("Ok, connected to server");

    const db = mongoClient.db(mongodbName);
    const products = db.collection('Hola');
    products.insertMany([
        { a: 1 }, { a: 2 }, { a: 3 }
    ], function(err, result){
        assert.equal(err, null);
        console.log("Added 3 documents");
    });

    mongoClient.close();
});
//--------------------

const app = express();

app.use(express.static('public'));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function (request, response) {
    response.render('index');
});

app.get('/about', function (request, response) {
    response.send('About us');
});

app.get('/music', function (request, response) {
    response.send('Music');
});

app.get('/contact', function (request, response) {
    response.send('Contact');
});

app.get('/shop', function (request, response) {
    response.render('shop');
});

app.get('/shop/:product', function (request, response) {
    var product = request.params.product;
    response.send('Product page ' + product);
});

app.listen(5500);