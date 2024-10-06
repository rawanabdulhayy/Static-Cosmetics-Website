//JS for Redirection
function handleLogin() {
    // Perform your validation logic here
    var username = document.getElementById('username').value;
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    // Example: Validate that username, email, and password are not empty
    if (username === '' || email === '' || password === '') {
        alert('Please fill in all fields.');
        return false; // Prevent the form from submitting
    }

    // Example: Redirect to "home.html"
    window.location.href = 'home.html';

    // Return false to prevent the form from submitting (you've already redirected)
    return false;
}

function handleSignup() {
    // Perform your validation logic here
    var newusername = document.getElementById('newUsername').value;
    var pass = document.getElementById('pass').value;
    var confirmedpass = document.getElementById('conpass').value;

    // Example: Validate that username, email, and password are not empty
    if (newusername === '' || pass === '' || confirmedpass === '') {
        alert('Please fill in all fields.');
        return false; // Prevent the form from submitting
    }
    if (pass != confirmedpass) {
        alert('Wrong Password');
        return false; // Prevent the form from submitting
    }

    // Example: Redirect to "home.html"
    window.location.href = 'home.html';

    // Return false to prevent the form from submitting (you've already redirected)
    return false;
}

//JS for Shopping Cart
const top_items_count = document.querySelector('.items-count'),
    exit = document.querySelector('.exit'),
    bucket = document.querySelector('.cart').style;

var items = document.querySelectorAll('.itemsc');

top_items_count.innerHTML = count;

function openBucket() {
    bucket.visibility = "visible";
    bucket.opacity = "1";
    bucket.zIndex = "9";
    bucket.transition = "all 0.5s";
}

function closeBucket() {
    bucket.visibility = "hidden";
    bucket.opacity = "0";
    bucket.zIndex = "-9";
    bucket.transition = "all 0.5s";
}
var _cart = [];

() => {

    if (localStorage._cart) {
        _cart = JSON.parse(localStorage._cart);
        showCart();
    }

}

var qty = 1;

for (i = 0; i <= items.length - 1; i++) {
    var count = 0;
    items[i].onclick = e => {
        count = count + 1
        var itemName = e.target.dataset.item;
        var price = e.target.dataset.price;
        addToCart(itemName, price, qty);
        top_items_count.innerHTML = count;
    }
}

function addToCart(itemName, price, qty) {

    for (var i in _cart) {
        if (_cart[i].Product == itemName) {
            _cart[i].Qty += qty;
            showCart();
            saveCart();
            return;
        }
    }

    var itemArray = {
        Product: itemName,
        Price: price,
        Qty: qty
    }

    _cart.push(itemArray)
    saveCart();
    showCart();
}

function saveCart() {
    if (window.localStorage) {
        localStorage._cart = JSON.stringify(_cart);
    }
}

function deleteItem(index) {
    _cart.splice(index, 1);
    showCart();
    saveCart();
}

function showCart() {
    if (_cart.length == 0) {
        var _ul = document.querySelector('#ul');
        _ul.innerHTML = "";
        return;
    }

    var _ul = document.querySelector('#ul');
    _ul.innerHTML = "";
    for (var i in _cart) {
        var item = _cart[i];
        var li = document.createElement("li")
        var row = `<span>${item.Product}</span><span onclick='deleteItem(" + i + ")'><i class='fas fa-trash'></i></span><span>${item.Qty}</span><span>${item.Qty * item.Price}</span>`;
        li.innerHTML += row;
        var _ul = document.querySelector('#ul');
        _ul.appendChild(li);
    }
}

//JS For feedback
const ratingEls = document.querySelectorAll(".rating");
const btnEl = document.getElementById("btn");

const containerEl = document.getElementById("container");

let selectedRating = "";

ratingEls.forEach((ratingEl) => {
    ratingEl.addEventListener("click", (event) => {
        removeActive();
        selectedRating =
            event.target.innerText || event.target.parentNode.innerText;
        event.target.classList.add("active");
        event.target.parentNode.classList.add("active");
    });
});

btnEl.addEventListener("click", () => {
    if (selectedRating !== "") {
        containerEl.innerHTML = `
        <strong>Thank you!</strong>
        <br>
        <br>
        <strong>Feedback: ${selectedRating}</strong>
        <p>We'll use your feedback to improve our customer support.</p>
        `;
    }
});

function removeActive() {
    ratingEls.forEach((ratingEl) => {
        ratingEl.classList.remove("active");
    });
}