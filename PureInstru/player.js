// Player de áudio
let currentBeat = null;
let audio = null;
let isPlaying = false;

function playBeat(beatId) {
    const beat = beatsData.find(b => b.id === beatId);
    if (!beat) return;
    
    // Se já está tocando o mesmo beat, apenas pause/play
    if (currentBeat && currentBeat.id === beatId) {
        togglePlayPause();
        return;
    }
    
    // Carregar novo beat
    currentBeat = beat;
    
    if (audio) {
        audio.pause();
    }
    
    audio = new Audio(beat.audioSrc);
    
    // Atualizar UI do player
    document.getElementById('player-title').textContent = beat.title;
    document.getElementById('player-category').textContent = beat.category.toUpperCase();
    document.getElementById('player-icon').textContent = beat.icon;
    
    // Event listeners do áudio
    audio.addEventListener('timeupdate', updateProgress);
    audio.addEventListener('ended', nextBeat);
    audio.addEventListener('loadedmetadata', () => {
        updateTimeDisplay();
    });
    
    // Iniciar reprodução
    audio.play();
    isPlaying = true;
    document.getElementById('play-btn').textContent = '⏸️';
}

function togglePlayPause() {
    if (!audio) return;
    
    if (isPlaying) {
        audio.pause();
        document.getElementById('play-btn').textContent = '▶️';
    } else {
        audio.play();
        document.getElementById('play-btn').textContent = '⏸️';
    }
    
    isPlaying = !isPlaying;
}

function nextBeat() {
    if (!currentBeat) return;
    
    const currentIndex = beatsData.findIndex(b => b.id === currentBeat.id);
    const nextIndex = (currentIndex + 1) % beatsData.length;
    
    playBeat(beatsData[nextIndex].id);
}

function prevBeat() {
    if (!currentBeat) return;
    
    const currentIndex = beatsData.findIndex(b => b.id === currentBeat.id);
    const prevIndex = currentIndex === 0 ? beatsData.length - 1 : currentIndex - 1;
    
    playBeat(beatsData[prevIndex].id);
}

function updateProgress() {
    if (!audio) return;
    
    const progress = (audio.currentTime / audio.duration) * 100;
    document.getElementById('progress-bar').value = progress;
    
    updateTimeDisplay();
}

function updateTimeDisplay() {
    if (!audio) return;
    
    const current = formatTime(audio.currentTime);
    const duration = formatTime(audio.duration);
    document.getElementById('time-display').textContent = `${current} / ${duration}`;
}

function formatTime(seconds) {
    if (isNaN(seconds)) return '0:00';
    
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// Event listeners do player
document.getElementById('play-btn').addEventListener('click', togglePlayPause);
document.getElementById('next-btn').addEventListener('click', nextBeat);
document.getElementById('prev-btn').addEventListener('click', prevBeat);

document.getElementById('progress-bar').addEventListener('input', (e) => {
    if (!audio) return;
    
    const progress = e.target.value;
    audio.currentTime = (progress / 100) * audio.duration;
});