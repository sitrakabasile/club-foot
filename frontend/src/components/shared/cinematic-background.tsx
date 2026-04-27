"use client";

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * CinematicBackground — A bespoke, high-end motion background 
 * realized through code. Combines light leaks, particles, and parallax.
 */
export function CinematicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    class Particle {
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX: number = 0;
      speedY: number = 0;
      opacity: number = 0;

      constructor() {
        this.reset();
      }

      reset() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
        this.opacity = Math.random() * 0.5;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas!.width || this.y < 0 || this.y > canvas!.height) {
          this.reset();
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
        ctx.fill();
      }
    }

    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = [];
      for (let i = 0; i < 100; i++) {
        particles.push(new Particle());
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    window.addEventListener("resize", init);
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", init);
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-black">
      {/* Layer 1: The Generated Stadium Image with Slow Cinematic Zoom */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.4, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0"
      >
        <img 
          src="/hero-bg.png" 
          alt="Bespoke Stadium" 
          className="h-full w-full object-cover grayscale opacity-50 contrast-125"
        />
      </motion.div>

      {/* Layer 2: Custom Light Leaks (Realized by Code) */}
      <motion.div
        animate={{
          x: [-100, 100, -100],
          y: [-50, 50, -50],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/20 rounded-full blur-[180px] mix-blend-screen"
      />
      <motion.div
        animate={{
          x: [100, -100, 100],
          y: [50, -50, 50],
          scale: [1.2, 1, 1.2],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-accent/15 rounded-full blur-[180px] mix-blend-screen"
      />

      {/* Layer 3: Particle System Canvas */}
      <canvas 
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-40"
      />

      {/* Layer 4: Cinematic Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background opacity-60" />
      <div className="absolute inset-0 bg-black/40 mix-blend-multiply" />
      
      {/* Layer 5: Soft Fog Overlay */}
      <motion.div 
        animate={{ x: ["-20%", "20%"] }}
        transition={{ duration: 30, repeat: Infinity, repeatType: "mirror", ease: "linear" }}
        className="absolute bottom-0 left-0 w-[200%] h-1/2 bg-gradient-to-t from-background to-transparent opacity-40 blur-3xl"
      />
    </div>
  );
}
