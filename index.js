const express = require('express');
const path = require('path');
const hbs = require('express-handlebars');

const app = express();

app.use(express.static('public'));

app.engine('handlebars', hbs());
app.set('view engine', 'handlebars');

app.get('/', function(request, response){
    response.render('index');
});

app.get('/about', function(request, response){
    response.send('About us');
});

app.get('/music', function(request, response){
    response.send('Music');
});

app.get('/contact', function(request, response){
    response.send('Contact');
});

app.get('/shop', function(request, response){
    response.send('Shop');
});

app.get('/shop/:product', function(request, response){
    var product = request.params.product;
    response.send('Product page ' + product);
});

app.listen(5500);