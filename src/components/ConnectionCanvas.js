'use client';
import { useEffect, useRef } from 'react';

export default function ConnectionCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let canvasWidth = 0;
    let canvasHeight = 0;

    function resizeCanvas() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      canvasWidth = rect.width;
      canvasHeight = rect.height;
    }
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const particles = [];
    const chefHatEl = document.querySelector(".chef-hat-wrapper");

    class Particle {
      constructor(sx, sy) {
        this.x = sx;
        this.y = sy;
        this.age = 0;
        this.maxAge = 60 + Math.random() * 30; // 1 to 1.5 seconds
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -0.6 - Math.random() * 0.6; // rise up
        this.steamAlpha = 0.2 + Math.random() * 0.25;
      }
      update() {
        this.age++;
        this.x += this.vx;
        this.y += this.vy;
        this.vy *= 0.97;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 6 + Math.random() * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(236, 214, 204, ${this.steamAlpha * (1 - this.age / this.maxAge)})`;
        ctx.fill();
      }
    }

    function getElementCenter(el) {
      if (!el) return { x: 0, y: 0 };
      const rect = el.getBoundingClientRect();
      const canvasRect = canvas.getBoundingClientRect();
      return {
        x: rect.left - canvasRect.left + rect.width / 2,
        y: rect.top - canvasRect.top + rect.height / 2
      };
    }

    function animLoop() {
      if (!chefHatEl || chefHatEl.offsetParent === null) {
        animationFrameId = requestAnimationFrame(animLoop);
        return;
      }
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      const chefCenter = getElementCenter(chefHatEl);

      if (Math.random() < 0.15 && chefCenter.x > 0) {
        const spawnX = chefCenter.x + (Math.random() - 0.5) * 45;
        const spawnY = chefCenter.y - 45 + (Math.random() - 0.5) * 30;
        particles.push(new Particle(spawnX, spawnY));
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();
        if (p.age >= p.maxAge) {
          particles.splice(i, 1);
        }
      }
      animationFrameId = requestAnimationFrame(animLoop);
    }

    const startTimeout = setTimeout(() => {
      animLoop();
    }, 1000);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(startTimeout);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      id="hero-connection-canvas"
      className="hero-connection-canvas pointer-events-none absolute top-0 left-0 w-full h-full z-2"
    />
  );
}
