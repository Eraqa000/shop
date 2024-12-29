document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCountElement = document.getElementById('cart-count');
    const cartContainer = document.getElementById('cart-container');
    const clearCartButton = document.getElementById('clear-cart');

    const updateCartCount = () => {
        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartCountElement.textContent = totalItems || '0';

        // Добавляем анимацию при изменении
        cartCountElement.classList.add('animate');
        setTimeout(() => cartCountElement.classList.remove('animate'), 500);
    };

    const renderCart = () => {
        cartContainer.innerHTML = cart.length
            ? cart.map(item => `
                <div class="cart-item">
                    <img src="${item.image}" alt="${item.name}" class="cart-item-image">
                    <div class="cart-item-info">
                        <p class="cart-item-name">${item.name}</p>
                        <p class="cart-item-price">${item.price} ₽</p>
                        <p class="cart-item-quantity">Количество: ${item.quantity}</p>
                    </div>
                </div>
            `).join('')
            : '<p>Корзина пуста</p>';
    };

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

    clearCartButton?.addEventListener('click', () => {
        cart.length = 0;
        localStorage.removeItem('cart');
        updateCartCount();
        renderCart();
    });

    updateCartCount();
    renderCart();
});