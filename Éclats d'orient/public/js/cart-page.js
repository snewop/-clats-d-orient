document.addEventListener('DOMContentLoaded', () => {
    const cartPageItems = document.getElementById('cart-page-items');
    const cartSummary = document.getElementById('cart-summary');
    const subtotalElement = document.getElementById('subtotal');
    const totalAmountElement = document.getElementById('total-amount');
    const checkoutBtn = document.getElementById('checkout-btn');
    const shippingCost = 5.00;

    // Création d'un élément de panier
    function createCartItem(item) {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-page-item';
        itemElement.innerHTML = `
            <img src="images/huile${item.id}.jpg" alt="${item.name}">
            <div class="item-details">
                <h3>${item.name}</h3>
                <p class="item-price">${formatPrice(item.price, false)}</p>
                <p class="item-subtotal">Total: ${formatPrice(item.price * item.quantity)}</p>
            </div>
            <div class="item-controls">
                <button class="quantity-btn minus" data-id="${item.id}">-</button>
                <span class="quantity">${item.quantity}</span>
                <button class="quantity-btn plus" data-id="${item.id}">+</button>
                <button class="remove-btn" data-id="${item.id}">🗑️</button>
            </div>
        `;

        // Ajouter les événements
        const minusBtn = itemElement.querySelector('.minus');
        const plusBtn = itemElement.querySelector('.plus');
        const removeBtn = itemElement.querySelector('.remove-btn');

        minusBtn.addEventListener('click', () => updateQuantity(item.id, -1));
        plusBtn.addEventListener('click', () => updateQuantity(item.id, 1));
        removeBtn.addEventListener('click', () => removeItem(item.id));

        return itemElement;
    }

    function formatPrice(price, includeSuffix = true) {
        if (includeSuffix) {
            return `${price.toFixed(2)} CHF TTC`;
        }
        return price.toFixed(2);
    }

    function updateQuantity(id, change) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const itemIndex = cart.findIndex(item => item.id === id);
        
        if (itemIndex !== -1) {
            cart[itemIndex].quantity += change;
            if (cart[itemIndex].quantity <= 0) {
                cart.splice(itemIndex, 1);
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            updateCartPage();
            updateCartCount();
        }
    }

    function removeItem(id) {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const newCart = cart.filter(item => item.id !== id);
        localStorage.setItem('cart', JSON.stringify(newCart));
        updateCartPage();
        updateCartCount();
    }

    function updateCartCount() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        document.getElementById('cart-count').textContent = count;
    }

    // Mettre à jour la page du panier
    function updateCartPage() {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        
        requestAnimationFrame(() => {
            cartPageItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartSummary.style.display = 'none';
                checkoutBtn.style.display = 'none';
                cartPageItems.innerHTML = '<div class="empty-cart"><p>Votre panier est vide</p></div>';
                subtotalElement.textContent = formatPrice(0);
                totalAmountElement.textContent = formatPrice(shippingCost);
                return;
            }

            cartSummary.style.display = 'block';
            checkoutBtn.style.display = 'block';

            const fragment = document.createDocumentFragment();
            let subtotal = 0;

            cart.forEach(item => {
                subtotal += item.price * item.quantity;
                fragment.appendChild(createCartItem(item));
            });

            cartPageItems.appendChild(fragment);
            subtotalElement.textContent = formatPrice(subtotal);
            totalAmountElement.textContent = formatPrice(subtotal + shippingCost);
        });
    }

    // Gérer le checkout
    checkoutBtn.addEventListener('click', () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        if (cart.length === 0) {
            alert('Votre panier est vide !');
            return;
        }
        
        // Rediriger vers la page de paiement
        window.location.href = 'paiement.html';
    });

    // Initialisation
    updateCartPage();
    updateCartCount();
});
