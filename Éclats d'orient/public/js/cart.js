// Initialisation du panier
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Fonctions
function addToCart(e) {
    const button = e.target;
    const id = button.dataset.id;
    const name = button.dataset.name;
    const price = parseFloat(button.dataset.price);

    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }

    updateCart();
}

function updateCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Événements
document.addEventListener('DOMContentLoaded', () => {
    // Mettre à jour le compteur du panier au chargement de la page
    updateCartCount();

    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', addToCart);
    });

    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', () => {
            // Vérifier si le panier n'est pas vide
            if (cart.length > 0) {
                window.location.href = 'paiement.html';
            } else {
                alert('Votre panier est vide !');
            }
        });
    }
});
