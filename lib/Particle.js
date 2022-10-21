export class Particle {
  static orbitRadius = 100;
  static orbitRadiusVariance = 40;

  static orbitSpeed = 0.02;
  static orbitSpeedVariance = 0.005;

  static get randomOrbit() {
    return (
      this.orbitRadius +
      Math.random() * 2 * this.orbitRadiusVariance -
      this.orbitRadiusVariance
    );
  }

  static get randomSpeed() {
    return (
      this.orbitSpeed +
      Math.random() * 2 * this.orbitSpeedVariance -
      this.orbitSpeedVariance
    );
  }

  constructor(game, x, y, radius, color, angle) {
    this.center = {
      x,
      y,
    };

    this.angle = angle;

    this.x;
    this.y;
    this.getPosition();
    this.oldX = this.x;
    this.oldY = this.y;

    this.orbitRadius = Particle.orbitRadius;
    this.orbitRadius = Particle.randomOrbit;
    this.speed = Particle.orbitSpeed;
    this.speed = Particle.randomSpeed;

    this.radius = radius;
    this.color = color;

    this.mouse = game.mouse;
    /** @type {CanvasRenderingContext2D} */
    this.c = game.context;
  }

  getPosition = () => {
    this.x = this.center.x + Math.cos(this.angle) * this.orbitRadius;
    this.y = this.center.y + Math.sin(this.angle) * this.orbitRadius;
  };

  update = () => {
    this.oldX = this.x;
    this.oldY = this.y;
    this.getPosition();

    this.angle += this.speed;

    this.draw();
  };

  draw = () => {
    this.c.fillStyle = this.color;
    this.c.strokeStyle = this.color;
    this.c.lineWidth = this.radius * 2;
    this.c.beginPath();
    this.c.moveTo(this.oldX, this.oldY);
    this.c.lineTo(this.x, this.y);

    this.c.stroke();
    this.c.closePath();
  };
}
