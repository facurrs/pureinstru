// Sistema de traduções
const translations = {
    pt: {
        'home': 'Início',
        'beats': 'Beats',
        'contact': 'Contato',
        'hero-title': 'Instrumentais Premium',
        'hero-subtitle': 'Kizomba, Marrabenta, Hip Hop, House Music, Jazz e muito mais',
        'explore-beats': 'Explorar Beats',
        'beats-title': 'Nossos Beats',
        'all': 'Todos',
        'contact-title': 'Contato',
        'name': 'Nome',
        'email': 'Email',
        'message': 'Mensagem',
        'send': 'Enviar',
        'rights': 'Todos os direitos reservados.',
        'cart-title': 'Carrinho de Compras',
        'total': 'Total:',
        'checkout': 'Finalizar Compra',
        'empty-cart': 'Seu carrinho está vazio',
        'added-to-cart': 'Adicionado ao carrinho!',
        'removed-from-cart': 'Removido do carrinho',
        'message-sent': 'Mensagem enviada com sucesso!'
    },
    en: {
        'home': 'Home',
        'beats': 'Beats',
        'contact': 'Contact',
        'hero-title': 'Premium Instrumentals',
        'hero-subtitle': 'Kizomba, Marrabenta, Hip Hop, House Music, Jazz and more',
        'explore-beats': 'Explore Beats',
        'beats-title': 'Our Beats',
        'all': 'All',
        'contact-title': 'Contact',
        'name': 'Name',
        'email': 'Email',
        'message': 'Message',
        'send': 'Send',
        'rights': 'All rights reserved.',
        'cart-title': 'Shopping Cart',
        'total': 'Total:',
        'checkout': 'Checkout',
        'empty-cart': 'Your cart is empty',
        'added-to-cart': 'Added to cart!',
        'removed-from-cart': 'Removed from cart',
        'message-sent': 'Message sent successfully!'
    },
    es: {
        'home': 'Inicio',
        'beats': 'Beats',
        'contact': 'Contacto',
        'hero-title': 'Instrumentales Premium',
        'hero-subtitle': 'Kizomba, Marrabenta, Hip Hop, House Music, Jazz y más',
        'explore-beats': 'Explorar Beats',
        'beats-title': 'Nuestros Beats',
        'all': 'Todos',
        'contact-title': 'Contacto',
        'name': 'Nombre',
        'email': 'Email',
        'message': 'Mensaje',
        'send': 'Enviar',
        'rights': 'Todos los derechos reservados.',
        'cart-title': 'Carrito de Compras',
        'total': 'Total:',
        'checkout': 'Finalizar Compra',
        'empty-cart': 'Tu carrito está vacío',
        'added-to-cart': '¡Añadido al carrito!',
        'removed-from-cart': 'Eliminado del carrito',
        'message-sent': '¡Mensaje enviado con éxito!'
    },
    fr: {
        'home': 'Accueil',
        'beats': 'Beats',
        'contact': 'Contact',
        'hero-title': 'Instrumentaux Premium',
        'hero-subtitle': 'Kizomba, Marrabenta, Hip Hop, House Music, Jazz et plus',
        'explore-beats': 'Explorer les Beats',
        'beats-title': 'Nos Beats',
        'all': 'Tous',
        'contact-title': 'Contact',
        'name': 'Nom',
        'email': 'Email',
        'message': 'Message',
        'send': 'Envoyer',
        'rights': 'Tous droits réservés.',
        'cart-title': 'Panier',
        'total': 'Total:',
        'checkout': 'Commander',
        'empty-cart': 'Votre panier est vide',
        'added-to-cart': 'Ajouté au panier!',
        'removed-from-cart': 'Retiré du panier',
        'message-sent': 'Message envoyé avec succès!'
    }
};

let currentLang = 'pt';

function changeLanguage(lang) {
    currentLang = lang;
    
    // Atualizar textos
    document.querySelectorAll('[data-lang]').forEach(el => {
        const key = el.getAttribute('data-lang');
        if (translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // Atualizar placeholders
    document.querySelectorAll('[data-lang-placeholder]').forEach(el => {
        const key = el.getAttribute('data-lang-placeholder');
        if (translations[lang][key]) {
            el.placeholder = translations[lang][key];
        }
    });
    
    // Salvar preferência
    localStorage.setItem('language', lang);
}

// Carregar idioma salvo
window.addEventListener('load', () => {
    const savedLang = localStorage.getItem('language') || 'pt';
    document.getElementById('language-selector').value = savedLang;
    changeLanguage(savedLang);
});