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
            document.querySelector('.bag__items').innerHTML +=
                `<article class="bag__product">
                    <div class="bag__cover">
                        <img src="${elem.product__cover}" alt="product cover">
                    </div>
                    <div class="bag__text">
                        <p>${elem.product__name}</p>
                        <h6>${elem.product__price}</h6>
                    </div>
                </article>`;

        });
    }

    shoppingCart__render();

    document.querySelectorAll('.product .product__button').forEach(function (elem) {
        elem.addEventListener('click', function (event) {
            event.preventDefault();
            let parent = document.querySelector('.product__info');

            let product = {
                product__name: parent.querySelector(".productname").innerHTML,
                product__artist: parent.querySelector(".productartist").innerHTML,
                product__price: parent.querySelector(".productprice").innerHTML,
                product__cover: '/sources/images/products/' + parent.querySelector(".productartist").innerHTML + '/I.' + parent.querySelector(".productname").innerHTML + ' - Cover.jpg'
            };

            shoppingCart.push(product);
            localStorage.setItem('shoppingCart', JSON.stringify(shoppingCart));
            console.log(shoppingCart);
            shoppingCart__render();
        });
    });
});