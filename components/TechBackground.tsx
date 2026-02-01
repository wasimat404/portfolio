"use client";

import { useEffect, useRef } from "react";

type Props = {
  /** off-white particle color (default matches your palette) */
  color?: string;
};

export default function TechBackground({ color = "#e8e6e3" }: Props) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const state = {
      w: 0,
      h: 0,
      t: 0,
      particles: [] as {
        x: number;
        y: number;
        vx: number;
        vy: number;
        r: number;
      }[],
      pointer: { x: 0, y: 0, active: false },
    };

    function resize() {
      const { clientWidth, clientHeight } = canvas;
      state.w = clientWidth;
      state.h = clientHeight;
      canvas.width = Math.floor(clientWidth * dpr);
      canvas.height = Math.floor(clientHeight * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // rebuild particles based on area
      const density = 0.00008; // tweak for more/less
      const count = Math.max(35, Math.floor(clientWidth * clientHeight * density));
      state.particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * clientWidth,
        y: Math.random() * clientHeight,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 1.2,
      }));
    }

    function onMove(e: PointerEvent) {
      const rect = canvas.getBoundingClientRect();
      state.pointer.x = e.clientX - rect.left;
      state.pointer.y = e.clientY - rect.top;
      state.pointer.active = true;
    }

    function onLeave() {
      state.pointer.active = false;
    }

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("pointermove", onMove);
    canvas.addEventListener("pointerleave", onLeave);

    function draw() {
      state.t += 1;

      // clear
      ctx.clearRect(0, 0, state.w, state.h);

      // soft vignette
      const g = ctx.createRadialGradient(
        state.w * 0.5,
        state.h * 0.45,
        0,
        state.w * 0.5,
        state.h * 0.45,
        Math.max(state.w, state.h) * 0.7
      );
      g.addColorStop(0, "rgba(232,230,227,0.08)");
      g.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, state.w, state.h);

      // particles
      const maxDist = 130;
      const linkDist = maxDist * maxDist;

      // pointer magnet
      const px = state.pointer.x;
      const py = state.pointer.y;

      for (const p of state.particles) {
        // gentle drift
        p.x += p.vx;
        p.y += p.vy;

        // bounce
        if (p.x < 0 || p.x > state.w) p.vx *= -1;
        if (p.y < 0 || p.y > state.h) p.vy *= -1;

        // slight pull toward pointer (subtle)
        if (state.pointer.active && !prefersReduced) {
          const dx = px - p.x;
          const dy = py - p.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 220 * 220) {
            p.x += dx * 0.0022;
            p.y += dy * 0.0022;
          }
        }
      }

      // links
      ctx.lineWidth = 1;
      for (let i = 0; i < state.particles.length; i++) {
        const a = state.particles[i];
        for (let j = i + 1; j < state.particles.length; j++) {
          const b = state.particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < linkDist) {
            const alpha = 1 - d2 / linkDist;
            ctx.strokeStyle = hexToRgba(color, 0.14 * alpha);
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw nodes last
      for (const p of state.particles) {
        ctx.fillStyle = hexToRgba(color, 0.55);
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("pointermove", onMove);
      canvas.removeEventListener("pointerleave", onLeave);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [color]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}

function hexToRgba(hex: string, a: number) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r},${g},${b},${a})`;
}
