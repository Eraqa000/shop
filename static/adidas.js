document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart-container');
    const clearCartButton = document.getElementById('clear-cart');
    const otherProductsContainer = document.getElementById('other-products-container');
    const toggleProductsButton = document.getElementById('other-products-button');

    const additionalProducts = [
        { id: 7_2, name: 'adidas-4', price: 2300, image: '/photo/adidas_11.png' },
        { id: 8_2, name: 'adidas-5', price: 2400, image: '/photo/adidas_12.png' },
        { id: 9_2, name: 'adidas-6', price: 2500, image: '/photo/adidas_13.png' },
        { id: 10_2, name: 'adidas-7', price: 2600, image: '/photo/adidas_4.png' },
        { id: 11_2, name: 'adidas-8', price: 2700, image: '/photo/adidas_5.png' },
        { id: 12_2, name: 'adidas-9', price: 2800, image: '/photo/adidas_6.png' },
        { id: 13_2, name: 'adidas-10', price: 2900, image: '/photo/adidas_7.webp' },
        { id: 14_2, name: 'adidas-11', price: 3000, image: '/photo/adidas_8.png' },
        { id: 15_2, name: 'adidas-12', price: 3100, image: '/photo/adidas_9.png' },
        { id: 16_2, name: 'adidas-13', price: 3200, image: '/photo/adidas_10.png' },
        { id: 17_2, name: 'adidas-14', price: 3300, image: '/photo/adidas_14.webp' },
        { id: 18_2, name: 'adidas-15', price: 3400, image: '/photo/adidas_15.jpg' }
    ];

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems;

        // Если корзина пустая, сбросить значение
        if (totalItems === 0) {
            cartCountElement.textContent = '0';
        }

        // Добавляем анимацию при изменении
        cartCountElement.classList.add('animate');
        setTimeout(() => cartCountElement.classList.remove('animate'), 500);
    };

    const renderCart = () => {
        cartContainer.innerHTML = cart.length
            ? cart.map(item => `
                <p>${item.name} x${item.quantity} - ${item.price} ₽</p>
                `).join('')
            : '<p>Корзина пуста</p>';
    };

    

    document.body.addEventListener('click', (event) => {
        if (event.target.classList.contains('cart-button')) {
            const card = event.target.closest('.card');
            const product = {
                id: parseInt(card.dataset.id, 10),
                name: card.dataset.name,
                price: parseInt(card.dataset.price, 10),
            };
            addToCart(product);
            alert(`${product.name} добавлен в корзину!`);
        }
    });

    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartCount();
        renderCart();
    };

    toggleProductsButton?.addEventListener('click', () => {
        const isHidden = otherProductsContainer.classList.contains('hidden');
        if (isHidden) {
            additionalProducts.forEach(product => {
                const productElement = document.createElement('div');
                productElement.classList.add('card');
                productElement.dataset.id = product.id;
                productElement.dataset.name = product.name;
                productElement.dataset.price = product.price;
                productElement.innerHTML = `
                    <h4 align="center">${product.name}</h4>
                    <img src="${product.image}" alt="${product.name}" class="card-image">
                    <p><h4>${product.price} ₽</h4></p>
                    <div class="card-buttons">
                        <button class="buy-button">Купить</button>
                        <button class="cart-button">Положить в корзину</button>
                    </div>
                `;
                otherProductsContainer.appendChild(productElement);
            });
            otherProductsContainer.classList.remove('hidden');
            toggleProductsButton.textContent = 'Скрыть продукты';
        } else {
            otherProductsContainer.innerHTML = '';
            otherProductsContainer.classList.add('hidden');
            toggleProductsButton.textContent = 'Показать другие продукты';
        }
    });

    clearCartButton?.addEventListener('click', () => {
            cart.length = 0;
            localStorage.removeItem('cart');
            updateCartCount();
            renderCart();
    });

    updateCartCount();
    renderCart();
});

