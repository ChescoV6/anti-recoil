// Nebula starfield animation
const canvas = document.getElementById('nebula-canvas');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const stars = [];
const STAR_COUNT = 200;

function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Initialize stars
for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
        x: random(0, width),
        y: random(0, height),
        radius: random(0.5, 2.5),
        alpha: random(0.3, 1),
        dx: random(-0.1, 0.1),
        dy: random(-0.05, 0.05)
    });
}

function drawStars() {
    ctx.clearRect(0, 0, width, height);
    for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(180, 145, 255, ${star.alpha})`;
        ctx.fill();

        // Move stars
        star.x += star.dx;
        star.y += star.dy;

        // Wrap around edges
        if (star.x < 0) star.x = width;
        if (star.x > width) star.x = 0;
        if (star.y < 0) star.y = height;
        if (star.y > height) star.y = 0;
    }

    requestAnimationFrame(drawStars);
}

// Start animation
drawStars();

// Simulate loading
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('content').style.display = 'flex';
    }, 3000); // 3 seconds loader
});

// Handle resize
window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});
