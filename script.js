document.addEventListener('DOMContentLoaded', function () {
    let productDiv = document.querySelector(".product");
    let categoryListDiv = document.querySelector(".CategoryList");
    let allCategories = [];

    async function displayProducts(selectedCategories = []) {
        productDiv.innerHTML = '';
        let response = await fetch('https://fakestoreapi.com/products');
        let products = await response.json();

        products.forEach(product => {
            if (!allCategories.includes(product.category)) {
                categoryListDiv.innerHTML += `
                    <label>
                        <input type="checkbox" onclick='filterByCategory()' value="${product.category}"> ${product.category}
                    </label>
                `;
                allCategories.push(product.category);
            }

            if (selectedCategories.length === 0) {
                selectedCategories = allCategories;
            }

            if (selectedCategories.includes(product.category)) {
                productDiv.innerHTML += `
                    <div class="productItems">
                        <img src="${product.image}" alt="">
                        <h4>${product.category}</h4>
                        <p>Price: Rs. ${product.price} | Rating: ${product.rating.rate}</p>
                        <h3>${product.title}</h3>
                        <button class="addToCart" onclick="addToCart(${product.id}, '${product.title}', '${product.image}', ${product.price})">Add to Cart</button>
                    </div>
                `;
            }
        });
    }

    window.filterByCategory = function () {
        let checkedInputs = document.querySelectorAll("input[type='checkbox']:checked");
        let selectedCategories = Array.from(checkedInputs).map(input => input.value);
        displayProducts(selectedCategories);
    }

    window.addToCart = function (id, title, image, price) {
        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        let product = { id, title, image, price };

        let isProductInCart = cart.some(item => item.id === id);
        if (!isProductInCart) {
            cart.push(product);
            localStorage.setItem('cart', JSON.stringify(cart));
            alert("Added to cart!");
        } else {
            alert("This item is already in your cart.");
        }
    }

    displayProducts();
});


