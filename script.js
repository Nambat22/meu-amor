// --- CONFIGURAÇÕES DE DATA ---
const startDateString = '2026-02-22T16:10:00'; 
const startDate = new Date(startDateString);

// --- TELA INICIAL (CLIQUE AQUI) ---
const startBtn = document.getElementById('start-btn');
const startScreen = document.getElementById('start-screen');
const mainContent = document.getElementById('main-content');
const bgMusic = document.getElementById('bg-music');

startBtn.addEventListener('click', () => {
    // Esconde a tela de clique
    startScreen.classList.add('fade-out');
    
    // Mostra o conteúdo principal com fade-in
    setTimeout(() => {
        startScreen.classList.add('hidden');
        mainContent.classList.remove('hidden');
        
        // Toca a música após o clique do usuário (necessário para browsers modernos)
        bgMusic.play().catch(error => {
            console.log('Autoplay da música falhou', error);
        });
    }, 1000); // tempo do fade-out
});

// --- CARROSSEL DE FOTOS ---
const slides = document.querySelectorAll('.slide');
const dots = document.querySelectorAll('.dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentSlide = 0;

function showSlide(index) {
    // Reseta todos
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    // Atualiza o índice com loop
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Ativa o atual
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

prevBtn.addEventListener('click', () => showSlide(currentSlide - 1));
nextBtn.addEventListener('click', () => showSlide(currentSlide + 1));

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => showSlide(index));
});

// Troca automática de foto a cada 4 segundos
setInterval(() => {
    if(!mainContent.classList.contains('hidden')) {
        showSlide(currentSlide + 1);
    }
}, 4500);


// --- LÓGICA DO CRONÔMETRO (CAIXAS QARTINHA) ---
// O timer agora é fixo em 365 dias, portanto a lógica de semanas e dias foi removida.



// --- EFEITO DE CORAÇÕES CAINDO DE FUNDO ---
function createFallingHeart() {
    const container = document.getElementById('hearts-container');
    if(!container) return;

    const heart = document.createElement('i');
    heart.classList.add('fa-solid', 'fa-heart', 'bg-heart-particle');
    
    // Posição X aleatória por toda a tela
    heart.style.left = Math.random() * 100 + 'vw';
    
    // Tamanhos diferentes
    const scale = Math.random() * 1 + 0.5; // 0.5x a 1.5x do tamanho normal
    heart.style.transform = `scale(${scale})`;

    // Opacidade máxima variável para depth
    const maxOpacity = Math.random() * 0.4 + 0.1;
    heart.style.setProperty('--max-opacity', maxOpacity);

    container.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 8000); // tempo de vida da partícula no DOM (baseado na animação)
}

setInterval(createFallingHeart, 1200);
