const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

//---------- Mongo Variables ----------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const mongoUrl = 'mongodb://localhost:27017';

const mongodbName = 'Vnyl';
//--------------------

const app = express();

app.use(express.static('public'));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

//---------- Mongo init-connect : Create and connnect to database ----------
const mongoClient = new MongoClient(mongoUrl);

var db = null;

mongoClient.connect(function (err) {
    assert.equal(null, err);
    console.log("Ok, connected to server");

    db = mongoClient.db(mongodbName);
});
//--------------------

//--------------------

function findObjectByKey(array, key, value) {
    for (var i = 0; i < array.length; i++) {
        if (array[i][key] === value) {
            return array[i];
        }
    }
    return null;
}

//--------------------

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

app.get('/store', function (request, response) {
    const products = db.collection('Products');
    products.find({}).toArray(function (err, docs) {
        if (err) {
            console.error(err);
            return;
        }

        var context = {
            products: docs,
        };

        var product__name = request.query.product__name;
        var product = findObjectByKey(docs, 'product__name', product__name);

        if (product !== null) {
            response.render('description', product);
        } else {
            response.render('store', context);
        }
    });
});
app.listen(5500);
