document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart-container');
    const clearCartButton = document.getElementById('clear-cart');
    const otherProductsContainer = document.getElementById('other-products-container');
    const toggleProductsButton = document.getElementById('other-products-button');

    const additionalProducts = [
        { id: 7_1, name: 'Nike-4', price: 2300, image: '/photo/image1_1.jpg' },
        { id: 8_1, name: 'Nike-5', price: 2400, image: '/photo/image1_2.jpeg' },
        { id: 9_1, name: 'Nike-6', price: 2500, image: '/photo/image1_3.jpg' },
        { id: 10_1, name: 'Nike-7', price: 2600, image: '/photo/image2_1.jpg' },
        { id: 11_1, name: 'Nike-8', price: 2700, image: '/photo/image2_2.png' },
        { id: 12_1, name: 'Nike-9', price: 2800, image: '/photo/image2_3.jpg' },
        { id: 13_1, name: 'Nike-10', price: 2900, image: '/photo/image2_4.jpeg' },
        { id: 14_1, name: 'Nike-11', price: 3000, image: '/photo/image3_1.jpg' },
        { id: 15_1, name: 'Nike-12', price: 3100, image: '/photo/image3_2.jpg' },
        { id: 16_1, name: 'Nike-13', price: 3200, image: '/photo/image3_3.jpeg' },
        { id: 17_1, name: 'Nike-14', price: 3300, image: '/photo/image3_4.jpg' },
        { id: 18_1, name: 'Nike-15', price: 3400, image: '/photo/image3.jpeg' }
    ];

    // Обновление счетчика корзины
    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems === 0 ? '0' : totalItems;

        // Если нужно добавить анимацию
        cartCountElement.classList.add('animate');
        setTimeout(() => cartCountElement.classList.remove('animate'), 500);
    };

    // Отображение товаров в корзине
    const renderCart = () => {
        cartContainer.innerHTML = cart.length
            ? cart.map(item => `
                <p>${item.name} x${item.quantity} - ${item.price} ₽</p>
            `).join('')
            : '<p>Корзина пуста</p>';
    };

    // Обработчик для добавления товара в корзину
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
            updateCartCount();  // Обновляем счетчик сразу после добавления товара
            renderCart();  // Перерисовываем корзину
        }
    });

    // Функция для добавления товара в корзину
    const addToCart = (product) => {
        const existingProduct = cart.find(item => item.id === product.id);
        if (existingProduct) {
            existingProduct.quantity += 1;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
    };

    // Переключение отображения дополнительных товаров
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

    // Очистка корзины
    clearCartButton?.addEventListener('click', () => {
        cart.length = 0;
        localStorage.removeItem('cart');
        updateCartCount();  // Обновляем счетчик
        renderCart();  // Перерисовываем корзину
    });

    // Инициализация состояния при загрузке страницы
    updateCartCount();
    renderCart();
});
