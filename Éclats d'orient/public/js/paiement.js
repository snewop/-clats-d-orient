document.addEventListener('DOMContentLoaded', function() {
    // Récupérer les éléments du DOM
    const orderDetails = document.getElementById('order-details');
    const subtotalElement = document.getElementById('subtotal');
    const totalAmountElement = document.getElementById('total-amount');
    const shippingCost = 5.00; // Frais de livraison fixes

    // Récupérer les détails du panier depuis le localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    // Calculer les totaux
    let subtotal = 0;
    
    // Afficher les articles
    cart.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('order-item');
        itemDiv.innerHTML = `
            <div class="item-info">
                <h4>${item.name}</h4>
                <span class="quantity">Quantité: ${item.quantity}</span>
            </div>
            <span class="price">Prix: ${item.price}€</span>
        `;
        orderDetails.appendChild(itemDiv);
        subtotal += item.price * item.quantity;
    });

    // Mettre à jour les totaux
    subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
    totalAmountElement.textContent = `${(subtotal + shippingCost).toFixed(2)}€`;
});
