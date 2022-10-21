import { COLORS, resizeCanvas } from "./lib/helper.js";
import { Particle } from "./lib/Particle.js";

/** @type {HTMLCanvasElement} */
const canvas = document.getElementById("my-canvas");
const c = canvas.getContext("2d");

/* == CONSTANTS == */
const FOLLOW_SPEED = 0.05;
const TRAIL_FACTOR = 0.05;
const PARTICLE_COUNT = 100;
const THICKNESS = 2;

const mouse = {
  x: innerWidth / 2,
  y: innerHeight / 2,
};

const game = {
  context: c,
  mouse,
};

let particles;

/* == SETUP == */
const setup = () => {
  resizeCanvas(canvas);

  particles = Array(PARTICLE_COUNT)
    .fill()
    .map(() => {
      const angle = Math.random() * Math.PI * 2;
      const color = COLORS[Math.floor(Math.random() * COLORS.length)];

      const x = innerWidth / 2;
      const y = innerHeight / 2;

      return new Particle(game, x, y, THICKNESS, color, angle);
    });
};

/* == ANIMATE == */
const animate = () => {
  requestAnimationFrame(animate);

  c.fillStyle = `rgb(255, 255, 255, ${TRAIL_FACTOR})`;
  c.fillRect(0, 0, innerWidth, innerHeight);

  // fOLLOWS THE MOUSE
  particles.forEach((particle) => {
    const dx = (mouse.x - particle.center.x) * FOLLOW_SPEED;
    const dy = (mouse.y - particle.center.y) * FOLLOW_SPEED;

    particle.center.x += dx;
    particle.center.y += dy;

    particle.update();
  });
};

/* == LISTENERS == */
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

window.addEventListener("mouseout", () => {
  console.log("hit");
  mouse.x = innerWidth / 2;
  mouse.y = innerHeight / 2;
});

/* == INIT == */
setup();
animate();
