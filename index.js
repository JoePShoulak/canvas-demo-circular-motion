import { COLORS, resizeCanvas } from "./lib/helper.js";
import { Particle } from "./lib/Particle.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

const trailFactor = 0.05;
const particleCount = 100;
const followSpeed = 0.05;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const game = {
  context: c,
  mouse,
};

let particles = [];

const setup = () => {
  particles = [];
  resizeCanvas(canvas);

  [...Array(particleCount).keys()].forEach(() => {
    const angle = Math.random() * Math.PI * 2;
    const p = new Particle(
      game,
      innerWidth / 2,
      innerHeight / 2,
      2,
      COLORS[Math.floor(Math.random() * COLORS.length)],
      angle
    );
    particles.push(p);
  });
};

const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = `rgb(255, 255, 255, ${trailFactor})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  particles.forEach((particle) => {
    const dx = (mouse.x - particle.center.x) * followSpeed;
    const dy = (mouse.y - particle.center.y) * followSpeed;

    particle.center = {
      x: particle.center.x + dx,
      y: particle.center.y + dy,
    };

    particle.update();
  });
};

window.addEventListener("contextmenu", (event) => {
  event.preventDefault();

  setup();
});

window.addEventListener("resize", () => {
  resizeCanvas(canvas);
  // setup(); // FIXME
});

window.addEventListener("mousemove", (event) => {
  mouse.x = event.x;
  mouse.y = event.y;
});

setup();
animate();
