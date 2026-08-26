// ==========================================================
// CONFIGURA AQUÍ LOS DATOS DE TU MAMÁ
// ==========================================================
const correctPin = "1990";       // PIN de desbloqueo
const birthYear = 1990;          // Año de nacimiento de tu mamá
const birthMonth = 1;            // Mes de cumpleaños (1-12) -> CAMBIAR
const birthDay = 1;              // Día de cumpleaños (1-31) -> CAMBIAR

// ==========================================================
// LOCK SCREEN
// ==========================================================
const lockScreen = document.getElementById("lock-screen");
const pinInput = document.getElementById("pin-input");
const errorMessage = document.getElementById("error-message");

const music = document.getElementById("backgroundMusic");
const playPauseBtn = document.getElementById("playPauseBtn");

function checkPin() {
    if (pinInput.value === correctPin) {
        lockScreen.classList.add("fade-out");

        setTimeout(() => {
            lockScreen.style.display = "none";
        }, 500);

        music.play();
        if (playPauseBtn) playPauseBtn.innerHTML = "⏸";

        // Confeti de bienvenida al desbloquear
        launchConfetti(60);

    } else {
        errorMessage.textContent = "Código incorrecto, intenta de nuevo";
        pinInput.value = "";
        pinInput.classList.add("shake");
        setTimeout(() => pinInput.classList.remove("shake"), 400);
    }
}

pinInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") checkPin();
});

if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
        if (music.paused) {
            music.play();
            playPauseBtn.innerHTML = "⏸";
        } else {
            music.pause();
            playPauseBtn.innerHTML = "▶";
        }
    });
}

// ==========================================================
// CARTA CON EFECTO DE SOBRE
// ==========================================================
const openLetterBtn = document.getElementById("openLetterBtn");
const envelope = document.getElementById("envelope");

if (openLetterBtn && envelope) {
    envelope.classList.add("open"); // aseguramos que exista en el DOM antes de animarlo
    envelope.classList.remove("open");

    openLetterBtn.addEventListener("click", () => {
        envelope.classList.toggle("open");
        openLetterBtn.textContent = envelope.classList.contains("open")
            ? "Cerrar la carta"
            : "Open the Letter";
    });
}

// ==========================================================
// SCROLL TO TOP
// ==========================================================
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
}

// ==========================================================
// BARRA DE PROGRESO DE SCROLL
// ==========================================================
const scrollProgress = document.getElementById("scroll-progress");

window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    if (scrollProgress) scrollProgress.style.width = progress + "%";
});

// ==========================================================
// FADE-IN DE SECCIONES AL HACER SCROLL
// ==========================================================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, { threshold: 0.15 });

revealElements.forEach((el) => revealObserver.observe(el));

// ==========================================================
// FRASES QUE VAN CAMBIANDO EN EL HERO
// ==========================================================
const phrases = [
    "Mi mejor amiga.",
    "Mi mayor ejemplo.",
    "Mi persona favorita.",
    "El amor más grande que conozco.",
    "Mi hogar, sin importar dónde esté."
];

const heroPhrasesEl = document.getElementById("hero-phrases");
let phraseIndex = 0;

function cyclePhrases() {
    if (!heroPhrasesEl) return;

    heroPhrasesEl.classList.remove("visible");

    setTimeout(() => {
        heroPhrasesEl.textContent = phrases[phraseIndex];
        heroPhrasesEl.classList.add("visible");
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }, 600);
}

if (heroPhrasesEl) {
    cyclePhrases();
    setInterval(cyclePhrases, 3500);
}

// ==========================================================
// CONTADOR (años, días para el próximo cumpleaños, etc.)
// ==========================================================
function animateCounter(el, target, duration = 1500) {
    if (!el) return;
    let startTime = null;

    function step(timestamp) {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        el.textContent = Math.floor(progress * target);
        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(step);
}

function daysUntilNextBirthday() {
    const today = new Date();
    let next = new Date(today.getFullYear(), birthMonth - 1, birthDay);
    if (next < today) {
        next = new Date(today.getFullYear() + 1, birthMonth - 1, birthDay);
    }
    const diffTime = next - today;
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

function currentAge() {
    const today = new Date();
    let age = today.getFullYear() - birthYear;
    const hasHadBirthdayThisYear =
        today.getMonth() + 1 > birthMonth ||
        (today.getMonth() + 1 === birthMonth && today.getDate() >= birthDay);
    if (!hasHadBirthdayThisYear) age -= 1;
    return age;
}

const counterSection = document.getElementById("counter");

if (counterSection) {
    const yearsEl = document.getElementById("counter-years");
    const daysEl = document.getElementById("counter-days-birthday");
    const loveEl = document.getElementById("counter-love");

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                animateCounter(yearsEl, currentAge());
                animateCounter(daysEl, daysUntilNextBirthday());
                animateCounter(loveEl, 9999, 2500);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    counterObserver.observe(counterSection);
}

// ==========================================================
// CONFETI / CORAZONES CAYENDO
// ==========================================================
const confettiContainer = document.getElementById("confetti-container");
const confettiEmojis = ["🎉", "🎈", "💖", "✨", "🌸"];

function launchConfetti(amount = 40) {
    if (!confettiContainer) return;

    for (let i = 0; i < amount; i++) {
        const piece = document.createElement("div");
        piece.classList.add("confetti-piece");
        piece.textContent =
            confettiEmojis[Math.floor(Math.random() * confettiEmojis.length)];

        piece.style.left = Math.random() * 100 + "vw";
        piece.style.fontSize = 14 + Math.random() * 16 + "px";

        const duration = 3 + Math.random() * 3;
        piece.style.animationDuration = duration + "s";
        piece.style.animationDelay = Math.random() * 1.5 + "s";

        confettiContainer.appendChild(piece);

        setTimeout(() => piece.remove(), (duration + 2) * 1000);
    }
}

// ==========================================================
// BOTÓN "APAGAR LAS VELITAS" -> corazones/fuegos artificiales
// ==========================================================
const blowCandlesBtn = document.getElementById("blowCandlesBtn");

if (blowCandlesBtn) {
    blowCandlesBtn.addEventListener("click", () => {
        launchConfetti(80);

        const candlesEl = document.querySelector(".candles");
        if (candlesEl) {
            candlesEl.textContent = "💨 💨 💨";
            setTimeout(() => {
                candlesEl.textContent = "🕯 🕯 🕯";
            }, 2000);
        }
    });
}

// ==========================================================
// CARRUSEL DE LA GALERÍA
// ==========================================================
const carouselTrack = document.getElementById("carouselTrack");
const carouselPrev = document.getElementById("carouselPrev");
const carouselNext = document.getElementById("carouselNext");
const carouselDotsContainer = document.getElementById("carouselDots");

if (carouselTrack) {
    const slides = Array.from(carouselTrack.children);
    let currentSlide = 0;

    slides.forEach((_, i) => {
        const dot = document.createElement("div");
        dot.classList.add("dot");
        if (i === 0) dot.classList.add("active");
        dot.addEventListener("click", () => goToSlide(i));
        carouselDotsContainer.appendChild(dot);
    });

    const dots = Array.from(carouselDotsContainer.children);

    function getSlideStep() {
        const slideStyle = window.getComputedStyle(slides[0]);
        const marginLeft = parseFloat(slideStyle.marginLeft);
        const marginRight = parseFloat(slideStyle.marginRight);
        return slides[0].getBoundingClientRect().width + marginLeft + marginRight;
    }

    function updateCarousel() {
        const step = getSlideStep();
        carouselTrack.style.transform = `translateX(-${currentSlide * step}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle("active", i === currentSlide);
        });
    }

    function goToSlide(index) {
        currentSlide = (index + slides.length) % slides.length;
        updateCarousel();
    }

    if (carouselNext) {
        carouselNext.addEventListener("click", () => goToSlide(currentSlide + 1));
    }

    if (carouselPrev) {
        carouselPrev.addEventListener("click", () => goToSlide(currentSlide - 1));
    }

    window.addEventListener("resize", updateCarousel);

    // Auto-avance cada 5 segundos
    setInterval(() => goToSlide(currentSlide + 1), 5000);

    updateCarousel();
}

// ==========================================================
// HOJAS CAYENDO EN LA CARTA (mientras está abierta)
// ==========================================================
const leavesContainer = document.getElementById("leavesContainer");
let leavesInterval = null;

function createLeaf() {
    if (!leavesContainer) return;

    const leaf = document.createElement("span");
    leaf.classList.add("leaf");
    leaf.textContent = ["🍂", "🍁", "🍃"][Math.floor(Math.random() * 3)];
    leaf.style.left = Math.random() * 100 + "%";
    leaf.style.fontSize = 14 + Math.random() * 10 + "px";

    const duration = 4 + Math.random() * 3;
    leaf.style.animationDuration = duration + "s";

    leavesContainer.appendChild(leaf);
    setTimeout(() => leaf.remove(), duration * 1000);
}

function startLeaves() {
    if (leavesInterval) return;
    createLeaf();
    leavesInterval = setInterval(createLeaf, 500);
}

function stopLeaves() {
    clearInterval(leavesInterval);
    leavesInterval = null;
}

// Se conecta con el botón de abrir/cerrar la carta ya existente
if (openLetterBtn && envelope) {
    openLetterBtn.addEventListener("click", () => {
        if (envelope.classList.contains("open")) {
            startLeaves();
        } else {
            stopLeaves();
        }
    });
}

// ==========================================================
// GRAN FINAL: GALAXIA 3D CON THREE.JS
// ==========================================================
const heartChargeBtn = document.getElementById("heartChargeBtn");
const wishCard = document.getElementById("wishCard");
const galaxyContainer = document.getElementById("galaxyContainer");
let galaxyInitialized = false;

if (heartChargeBtn) {
    heartChargeBtn.addEventListener("click", () => {
        wishCard.classList.add("fade-out-card");

        setTimeout(() => {
            wishCard.style.display = "none";
            galaxyContainer.classList.add("active");
            initGalaxyScene();
        }, 800);
    });
}

function initGalaxyScene() {
    if (galaxyInitialized || typeof THREE === "undefined") return;
    galaxyInitialized = true;

    const width = galaxyContainer.clientWidth;
    const height = galaxyContainer.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(65, width / height, 0.1, 1000);
    camera.position.set(0, 2, 9);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.inset = "0";
    renderer.domElement.style.zIndex = "1";
    galaxyContainer.appendChild(renderer.domElement);

    // ---- Galaxia de partículas ----
    const galaxyGroup = new THREE.Group();
    scene.add(galaxyGroup);

    const particleCount = 6000;
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorInside = new THREE.Color("#fce1e6");
    const colorMid = new THREE.Color("#e2b4bd");
    const colorOutside = new THREE.Color("#6a2c91");

    const branches = 4;
    const radius = 6;
    const spin = 1.6;
    const randomness = 0.4;

    for (let i = 0; i < particleCount; i++) {
        const i3 = i * 3;
        const r = Math.random() * radius;
        const branchAngle = ((i % branches) / branches) * Math.PI * 2;
        const spinAngle = r * spin;

        const randomX = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;
        const randomY = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * 0.3;
        const randomZ = Math.pow(Math.random(), 3) * (Math.random() < 0.5 ? 1 : -1) * randomness * r;

        positions[i3] = Math.cos(branchAngle + spinAngle) * r + randomX;
        positions[i3 + 1] = randomY;
        positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * r + randomZ;

        const mixedColor = colorInside.clone();
        const t = r / radius;
        if (t < 0.5) {
            mixedColor.lerpColors(colorInside, colorMid, t * 2);
        } else {
            mixedColor.lerpColors(colorMid, colorOutside, (t - 0.5) * 2);
        }

        colors[i3] = mixedColor.r;
        colors[i3 + 1] = mixedColor.g;
        colors[i3 + 2] = mixedColor.b;
    }

    const galaxyGeometry = new THREE.BufferGeometry();
    galaxyGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    galaxyGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const galaxyMaterial = new THREE.PointsMaterial({
        size: 0.06,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
        opacity: 0.9
    });

    galaxyGroup.add(new THREE.Points(galaxyGeometry, galaxyMaterial));

    // ---- Corazón de partículas ascendente ----
    const heartGroup = new THREE.Group();
    scene.add(heartGroup);

    const heartCount = 1500;
    const heartPositions = new Float32Array(heartCount * 3);
    const heartColors = new Float32Array(heartCount * 3);
    const heartColorA = new THREE.Color("#ff9ec4");
    const heartColorB = new THREE.Color("#ffffff");

    for (let i = 0; i < heartCount; i++) {
        const i3 = i * 3;
        const t = Math.random() * Math.PI * 2;
        const scale = 0.14 + Math.random() * 0.02;

        const x = 16 * Math.pow(Math.sin(t), 3);
        const y = 13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t);
        const jitter = (Math.random() - 0.5) * 0.6;

        heartPositions[i3] = x * scale + jitter;
        heartPositions[i3 + 1] = y * scale + jitter + 2.5;
        heartPositions[i3 + 2] = (Math.random() - 0.5) * 0.6;

        const mixed = heartColorA.clone().lerp(heartColorB, Math.random() * 0.5);
        heartColors[i3] = mixed.r;
        heartColors[i3 + 1] = mixed.g;
        heartColors[i3 + 2] = mixed.b;
    }

    const heartGeometry = new THREE.BufferGeometry();
    heartGeometry.setAttribute("position", new THREE.BufferAttribute(heartPositions, 3));
    heartGeometry.setAttribute("color", new THREE.BufferAttribute(heartColors, 3));

    const heartMaterial = new THREE.PointsMaterial({
        size: 0.07,
        sizeAttenuation: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexColors: true,
        transparent: true,
        opacity: 0
    });

    heartGroup.add(new THREE.Points(heartGeometry, heartMaterial));
    heartGroup.position.y = -2;

    let heartRise = -2;
    let heartOpacity = 0;

    const clock = new THREE.Clock();

    function animateGalaxy() {
        requestAnimationFrame(animateGalaxy);
        const elapsed = clock.getElapsedTime();

        galaxyGroup.rotation.y = elapsed * 0.08;

        if (heartRise < 0.4) {
            heartRise += 0.004;
            heartGroup.position.y = heartRise;
        }
        if (heartOpacity < 0.95) {
            heartOpacity += 0.003;
            heartMaterial.opacity = heartOpacity;
        }
        heartGroup.rotation.y = elapsed * 0.15;

        renderer.render(scene, camera);
    }

    animateGalaxy();

    window.addEventListener("resize", () => {
        if (!galaxyContainer.classList.contains("active")) return;
        const w = galaxyContainer.clientWidth;
        const h = galaxyContainer.clientHeight;
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
    });
}