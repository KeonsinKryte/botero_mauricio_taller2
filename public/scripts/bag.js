window.addEventListener('load', function () {

    var shoppingCart = JSON.parse(localStorage.getItem('shoppingCart'));
    if (shoppingCart === null) {
        shoppingCart = [];
    }

    function shoppingCart__render() {
        shoppingCart.forEach(function (elem) {
            let total = 0;
            total += parseFloat(elem.product__price);
        });
        document.querySelector('.bag__total').innerText = shoppingCart.length;
        shoppingCart.forEach(function (elem) {
            bag(elem);
        });
    }

    function bag(elem) {
        var article = document.createElement('article');
        article.setAttribute('class', 'bag__products');

        var div = document.createElement('div');
        div.setAttribute('class', 'bag__cover');

        var div2 = document.createElement('div');
        div2.setAttribute('class', 'bag__text');

        var img = document.createElement('img');
        img.setAttribute('src', elem.product__cover);

        console.log(elem.product__cover);

        var p = document.createElement('p');
        p.innerText = elem.product__name;

        console.log(elem.product__name);

        var h6 = document.createElement('h6');
        h6.innerText = elem.product__price;

        console.log(elem.product__price);

        div2.appendChild(p);
        div2.appendChild(h6);
        div.appendChild(img);
        article.appendChild(div);
        article.appendChild(div2);



        // document.querySelector('.bag__items').innerHTML = null;
        
        document.querySelector('.bag__items').append(article);
        console.log(article);
    }

    shoppingCart__render();

    document.querySelectorAll('.product button').forEach(function (elem) {
        elem.addEventListener('click', function (event) {
            event.preventDefault();
            let parent = elem.parentElement;

            let product = {
                product__name: parent.querySelector('h5').innerText,
                product__artist: parent.querySelector('h2').innerText,
                product__price: parent.querySelector('h6').innerText,
                product__cover: '/sources/images/products/' + parent.querySelector('h2').innerText + '/I.' + parent.querySelector('h5').innerText + ' - Cover.jpg'
            };

            shoppingCart.push(product);
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            console.log(shoppingCart);
            shoppingCart__render();
        });
    });
});