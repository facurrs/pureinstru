// Carrinho de compras
let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartUI() {
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    
    if (cart.length === 0) {
        cartItems.innerHTML = `<p class="empty-cart">${translations[currentLang]['empty-cart']}</p>`;
        cartTotal.textContent = '€0.00';
        return;
    }
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        total += item.price;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-info">
                <h4>${item.icon} ${item.title}</h4>
                <p>${item.category.toUpperCase()} - €${item.price.toFixed(2)}</p>
            </div>
            <button class="remove-item-btn" data-id="${item.id}">Remover</button>
        `;
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = `€${total.toFixed(2)}`;
    
    // Adicionar event listeners para remover
    document.querySelectorAll('.remove-item-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const id = e.target.getAttribute('data-id');
            removeFromCart(id);
        });
    });
}

function addToCart(beatId) {
    const beat = beatsData.find(b => b.id === beatId);
    if (!beat) return;
    
    // Verificar se já está no carrinho
    if (cart.find(item => item.id === beatId)) {
        alert('Este beat já está no carrinho!');
        return;
    }
    
    cart.push(beat);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
    
    // Feedback visual
    alert(translations[currentLang]['added-to-cart']);
}

function removeFromCart(beatId) {
    cart = cart.filter(item => item.id !== beatId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
}

function openCart() {
    document.getElementById('cart-modal').classList.add('active');
    updateCartUI();
}

function closeCart() {
    document.getElementById('cart-modal').classList.remove('active');
}

function checkout() {
    if (cart.length === 0) {
        alert(translations[currentLang]['empty-cart']);
        return;
    }
    
    // Aqui você pode integrar com PayPal, Stripe, etc.
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    alert(`Total: €${total.toFixed(2)}\n\nIntegre com seu sistema de pagamento aqui!`);
    
    // Limpar carrinho após checkout
    // cart = [];
    // localStorage.setItem('cart', JSON.stringify(cart));
    // updateCartUI();
    // closeCart();
}

// Event listeners
document.getElementById('cart-btn').addEventListener('click', openCart);
document.getElementById('close-cart').addEventListener('click', closeCart);
document.getElementById('checkout-btn').addEventListener('click', checkout);

// Fechar modal ao clicar fora
document.getElementById('cart-modal').addEventListener('click', (e) => {
    if (e.target.id === 'cart-modal') {
        closeCart();
    }
});

// Inicializar carrinho
updateCartUI();