function resizeScene() {
    const scene = document.querySelector('.scene');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    const baseWidth = 1080;
    const baseHeight = 1920;
    
    const scaleX = windowWidth / baseWidth;
    const scaleY = windowHeight / baseHeight;
    // Mantém a escala responsiva padrão
    const scale = Math.min(scaleX, scaleY) * 0.95;
    
    scene.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', resizeScene);
window.addEventListener('DOMContentLoaded', resizeScene);

function fireFlocos() {
    const container = document.getElementById('confetti-container');
    
    // Explosão de Flocos a partir do centro
    for (let i = 0; i < 60; i++) {
        const flake = document.createElement('img');
        flake.src = 'flocos.png';
        flake.classList.add('flake-explode');
        
        // Direções aleatórias
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.random() * 600 + 200; 
        const duration = Math.random() * 1.5 + 1; // 1s a 2.5s
        
        const dx = Math.cos(angle) * distance;
        // Joga mais para cima (gravidade simulada com bias negativo no y)
        const dy = Math.sin(angle) * distance - 200; 
        
        flake.style.setProperty('--dx', `${dx}px`);
        flake.style.setProperty('--dy', `${dy}px`);
        
        flake.style.left = '50%';
        flake.style.top = '50%';
        flake.style.transform = 'translate(-50%, -50%)';
        
        flake.style.animationDuration = `${duration}s`;
        flake.style.width = (Math.random() * 40 + 20) + 'px'; // flocos de tamanhos variados
        
        container.appendChild(flake);
        setTimeout(() => flake.remove(), duration * 1000);
    }
    
    // Flocos caindo como neve (contínuo por um tempo)
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const flake = document.createElement('img');
            flake.src = 'flocos.png';
            flake.classList.add('flake-fall');
            flake.style.left = Math.random() * 100 + 'vw';
            flake.style.animationDuration = (Math.random() * 4 + 3) + 's';
            flake.style.width = (Math.random() * 40 + 20) + 'px';
            container.appendChild(flake);
            setTimeout(() => flake.remove(), 8000);
        }, Math.random() * 2500); // Surgem aos poucos nos primeiros 2.5s
    }
}

function openEnvelope() {
    const flapLeft = document.getElementById('flapLeft');
    const flapRight = document.getElementById('flapRight');
    const envelopeBg = document.getElementById('envelopeBg');
    const sealImg = document.getElementById('sealImg');
    const cardWrapper = document.getElementById('cardWrapper');
    const flipArea = document.getElementById('flipArea');
    const popSound = document.getElementById('popSound');

    // 1. Esconde o selo
    sealImg.classList.add('hide');

    // Toca o efeito sonoro!
    if (popSound) {
        popSound.currentTime = 0;
        popSound.play().catch(err => console.log("Áudio bloqueado pelo navegador", err));
    }

    // Dispara apenas os flocos.png (como pedido)
    fireFlocos();

    // 2. Abre a aba ESQUERDA (invertido novamente conforme pedido)
    flapLeft.classList.add('open');

    // 3. Espera a aba abrir e puxa a carta
    setTimeout(() => {
        cardWrapper.classList.add('out');
        
        // 4. Quando a carta vier pra frente (em 1000ms da animação), o envelope cai
        setTimeout(() => {
            flapLeft.classList.add('drop');
            flapRight.classList.add('drop');
            envelopeBg.classList.add('drop');
            
            // 5. Ativa o clique na carta
            setTimeout(() => {
                flipArea.style.display = 'block';
            }, 1000);
        }, 1000);
    }, 800);
}

function flipCard() {
    const card = document.getElementById('card');
    card.classList.toggle('flipped');
}
