import { useEffect, useRef } from "react";

const FireworkCanvas = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let cw, ch;
    let fireworks = [];
    let particles = [];
    let hue = 120;

    const resizeCanvas = () => {
      cw = canvas.width = window.innerWidth;
      ch = canvas.height = 500;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const random = (min, max) => Math.random() * (max - min) + min;

    function Firework(sx, sy, tx, ty) {
      this.x = sx;
      this.y = sy;
      this.sx = sx;
      this.sy = sy;
      this.tx = tx;
      this.ty = ty;
      this.distanceToTarget = Math.hypot(tx - sx, ty - sy);
      this.distanceTraveled = 0;
      this.coordinates = Array(3).fill([sx, sy]);
      this.angle = Math.atan2(ty - sy, tx - sx);
      this.speed = 2;
      this.brightness = random(50, 80);
    }

    Firework.prototype.update = function () {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);

      const vx = Math.cos(this.angle) * this.speed;
      const vy = Math.sin(this.angle) * this.speed;

      this.x += vx;
      this.y += vy;

      const dx = this.tx - this.x;
      const dy = this.ty - this.y;
      if (Math.abs(dx) < 3 && Math.abs(dy) < 3) {
        createParticles(this.tx, this.ty);
        return true;
      }
      return false;
    };

    Firework.prototype.draw = function () {
      ctx.beginPath();
      ctx.moveTo(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1]
      );
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
      ctx.stroke();
    };

    function Particle(x, y) {
      this.x = x;
      this.y = y;
      this.coordinates = Array(5).fill([x, y]);
      this.angle = random(0, 2 * Math.PI);
      this.speed = random(1, 10);
      this.friction = 0.95;
      this.gravity = 1;
      this.hue = random(0, 360);
      this.alpha = 1;
      this.decay = random(0.01, 0.03);
    }

    Particle.prototype.update = function () {
      this.coordinates.pop();
      this.coordinates.unshift([this.x, this.y]);
      this.speed *= this.friction;
      this.x += Math.cos(this.angle) * this.speed;
      this.y += Math.sin(this.angle) * this.speed + this.gravity;
      this.alpha -= this.decay;
      return this.alpha <= 0;
    };

    Particle.prototype.draw = function () {
      ctx.beginPath();
      ctx.moveTo(
        this.coordinates[this.coordinates.length - 1][0],
        this.coordinates[this.coordinates.length - 1][1]
      );
      ctx.lineTo(this.x, this.y);
      ctx.strokeStyle = `hsla(${this.hue}, 100%, 60%, ${this.alpha})`;
      ctx.stroke();
    };

    const createParticles = (x, y) => {
      for (let i = 0; i < 30; i++) {
        particles.push(new Particle(x, y));
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      ctx.globalCompositeOperation = "destination-out";
      ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
      ctx.fillRect(0, 0, cw, ch);
      ctx.globalCompositeOperation = "lighter";

      if (Math.random() < 0.03) {
        fireworks.push(
          new Firework(
            random(cw * 0.2, cw * 0.8),
            ch,
            random(cw * 0.2, cw * 0.8),
            random(50, ch * 0.6)
          )
        );
      }

      fireworks = fireworks.filter((firework) => {
        firework.draw();
        return !firework.update();
      });

      particles = particles.filter((particle) => {
        particle.draw();
        return !particle.update();
      });
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-[500px] z-0 pointer-events-none"
    />
  );
};

export default FireworkCanvas;
