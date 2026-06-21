// Dados dos beats
const beatsData = [
    {
        id: 'kizomba-001',
        title: 'Noite de Kizomba',
        category: 'kizomba',
        price: 29.99,
        bpm: 95,
        icon: '💃',
        audioSrc: 'assets/audio/kizomba/noite-de-kizomba.mp3'
    },
    {
        id: 'kizomba-002',
        title: 'Ritmo Suave',
        category: 'kizomba',
        price: 24.99,
        bpm: 88,
        icon: '🌙',
        audioSrc: 'assets/audio/kizomba/ritmo-suave.mp3'
    },
    {
        id: 'marrabenta-001',
        title: 'Maputo Groove',
        category: 'marrabenta',
        price: 34.99,
        bpm: 120,
        icon: '🎸',
        audioSrc: 'assets/audio/marrabenta/maputo-groove.mp3'
    },
    {
        id: 'marrabenta-002',
        title: 'Dança Moçambicana',
        category: 'marrabenta',
        price: 29.99,
        bpm: 115,
        icon: '🥁',
        audioSrc: 'assets/audio/marrabenta/danca-mocambicana.mp3'
    },
    {
        id: 'hiphop-001',
        title: 'Street Flow',
        category: 'hiphop',
        price: 39.99,
        bpm: 90,
        icon: '🎤',
        audioSrc: 'assets/audio/hiphop/street-flow.mp3'
    },
    {
        id: 'hiphop-002',
        title: 'Urban Beats',
        category: 'hiphop',
        price: 34.99,
        bpm: 85,
        icon: '🎧',
        audioSrc: 'assets/audio/hiphop/urban-beats.mp3'
    },
    {
        id: 'house-001',
        title: 'Deep House Vibes',
        category: 'house',
        price: 44.99,
        bpm: 128,
        icon: '🎹',
        audioSrc: 'assets/audio/house/deep-house-vibes.mp3'
    },
    {
        id: 'house-002',
        title: 'Club Night',
        category: 'house',
        price: 39.99,
        bpm: 125,
        icon: '🎶',
        audioSrc: 'assets/audio/house/club-night.mp3'
    },
    {
        id: 'jazz-001',
        title: 'Smooth Jazz',
        category: 'jazz',
        price: 49.99,
        bpm: 110,
        icon: '🎷',
        audioSrc: 'assets/audio/jazz/smooth-jazz.mp3'
    },
    {
        id: 'jazz-002',
        title: 'Late Night Jazz',
        category: 'jazz',
        price: 44.99,
        bpm: 95,
        icon: '🎺',
        audioSrc: 'assets/audio/jazz/late-night-jazz.mp3'
    }
];

// Renderizar beats
function renderBeats(filter = 'all') {
    const beatsGrid = document.getElementById('beats-grid');
    beatsGrid.innerHTML = '';
    
    const filteredBeats = filter === 'all' 
        ? beatsData 
        : beatsData.filter(beat => beat.category === filter);
    
    filteredBeats.forEach(beat => {
        const beatCard = document.createElement('div');
        beatCard.className = 'beat-card fade-in';
        beatCard.innerHTML = `
            <div class="beat-icon">${beat.icon}</div>
            <h3 class="beat-title">${beat.title}</h3>
            <p class="beat-category">${beat.category.toUpperCase()}</p>
            <div class="beat-info">
                <span class="beat-bpm">${beat.bpm} BPM</span>
                <span class="beat-price">€${beat.price.toFixed(2)}</span>
            </div>
            <div class="beat-actions">
                <button class="beat-btn play-beat-btn" data-id="${beat.id}">▶️ Play</button>
                <button class="beat-btn add-cart-btn" data-id="${beat.id}">🛒 Add</button>
            </div>
        `;
        beatsGrid.appendChild(beatCard);
    });
    
    // Adicionar event listeners
    document.querySelectorAll('.play-beat-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const beatId = e.target.getAttribute('data-id');
            playBeat(beatId);
        });
    });
    
    document.querySelectorAll('.add-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const beatId = e.target.getAttribute('data-id');
            addToCart(beatId);
        });
    });
}

// Filtros
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.getAttribute('data-filter');
        renderBeats(filter);
    });
});

// Mobile menu
document.getElementById('mobile-menu-btn').addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('active');
});

// Fechar menu mobile ao clicar em link
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobile-menu').classList.remove('active');
    });
});

// Language selector
document.getElementById('language-selector').addEventListener('change', (e) => {
    changeLanguage(e.target.value);
});

// Contact form
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert(translations[currentLang]['message-sent']);
    e.target.reset();
});

// Inicializar
renderBeats();