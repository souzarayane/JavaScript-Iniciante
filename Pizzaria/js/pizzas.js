//Listagem das pizzas
let pizzaJson = [
    {id:1, name: 'Brigadeiro', img: 'img/brigadeiro-morango.png', price: 35.90, sizes: ['100g', '530g', '860g'], description: 'Pizza de Brigadeiro Moça feita com MOÇA Brigadeiro e NESTLÉ Chocolate Blend ralado.'},
    {id:2, name: 'Frutos do mar', img: 'img/pizza-de-frutos-do-mar.png', price: 30.00, sizes: ['100g', '530g', '860g'], description: 'A Pizza de frutos do mar fica muito saborosa e combina a base crocante da pizza com vieiras, camarões, salmão e mexilhões temperados com azeite e endro.'},
    {id:3, name: 'Pepperoni', img: 'img/pizza-pepperoni.png', price: 25.90, sizes: ['100g', '530g', '860g'], description: 'Pepperoni é uma variedade ítalo-americana apimentada do salame seco, feita de carne de porco e bovina, incluindo algumas vezes toucinho.'},
    {id:4, name: 'Italiana', img: 'img/pizza-italiana.png', price: 40.70, sizes: ['100g', '530g', '860g'], description: ' A Composição das Pizzas na Itália · Marinara (Napolitana): tomate, azeite de oliva, orégano e alho.'},
    {id:5, name: 'Queijo e Tomate', img: 'img/pizza-tomate.png', price: 34.90, sizes: ['100g', '530g', '860g'], description: 'Molho de tomate, queijo mussarela, rodelas de tomate e orégano. '},
    {id:6, name: 'Cogumelo', img: 'img/pizza-cogumelo.png', price: 15.90, sizes: ['100g', '530g', '860g'], description: 'Pizza com cogumelos e bacon com esta excelente pizza saborosa.'}
];

let modalQtd = 1;
let cart = [];
let modalKey = 0;

const c = (el) => document.querySelector(el);
const cs = (el) => document.querySelectorAll(el);

pizzaJson.map((item, index) => {
    let pizzaItem = c('.models .pizza-item').cloneNode(true);

    pizzaItem.setAttribute('data-key', index);
    pizzaItem.querySelector('.pizza-item--img img').src = item.img;
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`;
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name;
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description;
    pizzaItem.querySelector('a').addEventListener('click', (e) => {
        e.preventDefault();
        
        let key = e.target.closest('.pizza-item').getAttribute('data-key');
        modalQtd = 1;
        modalKey = key;

        c('.pizzaBig img').src = pizzaJson[key].img;
        c('.pizzaInfo h1').innerHTML = pizzaJson[key].name;
        c('.pizzaInfo--desc').innerHTML = pizzaJson[key].description;
        c('.pizzaInfo--actualPrice').innerHTML = `R$ ${pizzaJson[key].price.toFixed(2)}`;
        c('.pizzaInfo--size.selected').classList.remove('selected');
        cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
            if(sizeIndex == 2) {
                size.classList.add('selected');
            }
            size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex];
        });
        c('.pizzaInfo--qt').innerHTML = modalQtd;

        c('.pizzaWindowArea').style.opacity = 0;
        c('.pizzaWindowArea').style.display = 'flex';
        setTimeout(() => {
            c('.pizzaWindowArea').style.opacity = 1;
        }, 200);
    });

    c('.pizza-area').append(pizzaItem);
});

//Eventos do Modal
function closeModal() {
    c('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
        c('.pizzaWindowArea').style.display = 'none';
    }, 500);
}

cs('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
    item.addEventListener('click', closeModal);
});
c('.pizzaInfo--qtmenos').addEventListener('click', () => {
    if(modalQtd > 1) {
        modalQtd--;
        c('.pizzaInfo--qt').innerHTML = modalQtd;
    }
});
c('.pizzaInfo--qtmais').addEventListener('click', () => {
    modalQtd++;
    c('.pizzaInfo--qt').innerHTML = modalQtd;
});
cs('.pizzaInfo--size').forEach((size, sizeIndex) => {
   size.addEventListener('click', (e) => {
    c('.pizzaInfo--size.selected').classList.remove('selected');
        size.classList.add('selected');
   });
});
c('.pizzaInfo--addButton').addEventListener('click', () => {
    let size = parseInt(c('.pizzaInfo--size.selected').getAttribute('data-key'));

    let identifier = pizzaJson[modalKey].id + '@' + size;

    let key = cart.findIndex((item) => item.identifier == identifier);

    if(key > -1) {

        cart[key].qt += modalQtd;

    } else {
        cart.push({
            identifier,
            id: pizzaJson[modalKey].id,
            size,
            qt: modalQtd
        });
    }
    updateCart();
    closeModal();
}); 

c('.menu-openner').addEventListener('click', () => {
    if(cart.length > 0){
        c('aside').style.length = '0';
    }
});
c('.menu-closer').addEventListener('click', () => {
    c('aside').style.left = '100vw';
});

function updateCart() {
    c('.menu-openner span').innerHTML = cart.length;

    if(cart.length > 0) {
        c('aside').classList.add('show');
        c('.cart').innerHTML = ' ';

        let subtotal = 0;
        let desconto = 0;
        let total = 0;

        for(let i in cart) {

            let pizzaItem = pizzaJson.find((item) => item.id == cart[i].id);
            subtotal += pizzaItem.price * cart[i].qt;

            let cartItem = c('.models .cart--item').cloneNode(true);

            let pizzaSizeName;
            switch(cart[i].size) {
                case 0:
                    pizzaSizeName = 'P';
                    break;
                case 1:
                    pizzaSizeName = 'M';
                    break;
                case 2:
                    pizzaSizeName = 'G';
                    break;
            }

            let pizzaName = `${pizzaItem.name} (${pizzaSizeName})`;

            cartItem.querySelector('img').src = pizzaItem.img;
            cartItem.querySelector('.cart--item-nome').innerHTML = pizzaName;
            cartItem.querySelector('.cart--item--qt').innerHTML = cart[i].qt;
            cartItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                if(cart[i].qt > 1) {
                    cart[i].qt--;
                } else {
                    cart.splice(i, 1);
                }
                updateCart();
            });
            cartItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                cart[i].qt++;
                updateCart();
            });

            c('.cart').append(cartItem)
        }

        desconto = subtotal * 0.1;
        total = subtotal - desconto;

        c('.subtotal span:last-child').innerHTML = `R$ ${subtotal.toFixed(2)}`;
        c('.desconto span:last-child').innerHTML = `R$ ${desconto.toFixed(2)}`;
        c('.total span:last-child').innerHTML = `R$ ${total.toFixed(2)}`;

    } else {
        c('aside').classList.remove('show');
        c('aside').style.left = '100vw';
    }
}