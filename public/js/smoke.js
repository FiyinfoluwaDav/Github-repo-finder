
const canvas = document.createElement('canvas');
document.body.appendChild(canvas);
const ctx = canvas.getContext('2d');

canvas.style.position = 'fixed';
canvas.style.top = 0;
canvas.style.left = 0;
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = 9999;

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
});

const mouse = {
    x: null,
    y: null,
    isMoving: false
};

window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.isMoving = true;
    setTimeout(() => {
        mouse.isMoving = false;
    }, 200);
});
window.addEventListener('mouseout', () => {
    mouse.isMoving = false;
});


class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.alpha = 1;
        this.velocity = {
            x: Math.random() - 0.5,
            y: Math.random() - 0.5
        };
    }

    update() {
        this.x += this.velocity.x;
        this.y += this.velocity.y;
        this.alpha -= 0.02;
        this.size -= 0.1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.alpha})`;
        ctx.fill();
    }
}

const particles = [];

function animate() {
    ctx.clearRect(0, 0, width, height);

    if (mouse.isMoving) {
        for (let i = 0; i < 2; i++) {
            particles.push(new Particle(mouse.x, mouse.y));
        }
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.alpha <= 0 || p.size <= 0.2) {
            particles.splice(i, 1);
        }
    }

    requestAnimationFrame(animate);
}

animate();
