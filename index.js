const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

//---------- Mongo Variables ----------
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const mongoUrl = 'mongodb+srv://vnyl-y0aqb.mongodb.net/store';

const mongodbName = 'Vnyl';
//--------------------

const app = express();

app.use(express.static('public'));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

//---------- Mongo init-connect : Create and connnect to database ----------
const mongoClient = new MongoClient(mongoUrl);

var db = null;

MongoClient.connect('mongodb+srv://vnyl-y0aqb.mongodb.net/store',
    {
        auth: {
            user: 'KeonsinKryte',
            password: 'Keonsin1248Kryte'
        }
    }, function(err, client){
        if(err) throw err;

        db = client.db(mongodbName);

        app.listen(process.env.PORT || 1234);
    }
)

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
    var product__name = request.query.product__name;

    const products = db.collection('Products');
    var filter__type = request.query.product__filterType;
    var filter__value = request.query.product__filterValue;

    if ((filter__type !== null && filter__value !== null) && (filter__type !== undefined && filter__value !== undefined) && (filter__type !== "" && filter__value !== "")) {
        if (filter__type === "year" || filter__type === "Year") {
            products.find({
                product__year: filter__value,

            }).toArray(function (err, docs) {
                console.log(filter__type);
                if (err) {
                    console.error(err);
                    return;
                }

                var context = {
                    products: docs,
                };

                var product = findObjectByKey(docs, 'product__name', product__name);

                if (product !== null) {
                    response.render('description', product);
                } else {
                    response.render('store', context);
                }
            });
        }
        if (filter__type === "artist" || filter__type === "Artist") {
            products.find({
                product__artist: filter__value,

            }).toArray(function (err, docs) {
                console.log(filter__type);
                if (err) {
                    console.error(err);
                    return;
                }

                var context = {
                    products: docs,
                };

                var product = findObjectByKey(docs, 'product__name', product__name);

                if (product !== null) {
                    response.render('description', product);
                } else {
                    response.render('store', context);
                }
            });
        }
        if (filter__type === "price" || filter__type === "Price") {
            products.find({
                product__price: { $lt: parseFloat(filter__value) },

            }).toArray(function (err, docs) {
                console.log(filter__type);
                if (err) {
                    console.error(err);
                    return;
                }

                var context = {
                    products: docs,
                };

                var product = findObjectByKey(docs, 'product__name', product__name);

                if (product !== null) {
                    response.render('description', product);
                } else {
                    response.render('store', context);
                }
            });
        }
    } else {
        products.find({}).toArray(function (err, array) {
            if (err) {
                console.error(err);
                return;
            }

            var context = {
                products: array,
            };

            var product = findObjectByKey(array, 'product__name', product__name);

            if (product !== null) {
                response.render('description', product);
            } else {
                response.render('store', context);
            }
        });
    }

});
app.listen(5500);
