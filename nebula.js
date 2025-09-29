const loader = document.getElementById('loader');
const canvas = document.getElementById('nebula-canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];
for (let i = 0; i < 200; i++) {
    stars.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height, r: Math.random()*1.5+0.5, speed: Math.random()*0.5+0.2 });
}

function animateStars() {
    ctx.fillStyle = "#0b0b1e";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    ctx.fillStyle = "#9b59b6";
    stars.forEach(star => {
        star.y -= star.speed;
        if (star.y < 0) star.y = canvas.height;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI*2);
        ctx.fill();
    });
    requestAnimationFrame(animateStars);
}
animateStars();

// Simulate loading then fade
setTimeout(() => {
    loader.style.transition = "opacity 1s";
    loader.style.opacity = 0;
    setTimeout(() => { loader.style.display = "none"; document.getElementById('dashboard').style.display = 'block'; }, 1000);
}, 3000);
