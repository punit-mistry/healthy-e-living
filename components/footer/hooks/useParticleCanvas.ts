import { useEffect, RefObject } from "react";

export function useParticleCanvas(canvasRef: RefObject<HTMLCanvasElement>) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let offscreen: HTMLCanvasElement | null = null;
    let offCtx: CanvasRenderingContext2D | null = null;

    const PARTICLE_COUNT = 55;
    const COLORS = [
      [106, 67, 28], // brand brown
      [180, 110, 40], // amber
      [230, 165, 55], // gold
      [139, 90, 43], // mid brown
      [255, 210, 80], // bright gold
    ];

    interface Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      ci: number; // color index
      alpha: number;
      maxLife: number;
      life: number;
    }

    let W = 0;
    let H = 0;
    const particles: Particle[] = [];

    function makeParticle(fromBottom = false): Particle {
      const maxLife = 220 + Math.random() * 180;
      return {
        x: Math.random() * W,
        y: fromBottom ? H + 4 : Math.random() * H,
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.45 + 0.1),
        r: Math.random() * 2.2 + 0.6,
        ci: Math.floor(Math.random() * COLORS.length),
        alpha: Math.random() * 0.55 + 0.2,
        maxLife,
        life: fromBottom ? maxLife : Math.random() * maxLife,
      };
    }

    function resize() {
      W = canvas.offsetWidth;
      H = canvas.offsetHeight;
      canvas.width = W;
      canvas.height = H;
      
      offscreen = document.createElement("canvas");
      offscreen.width = W;
      offscreen.height = H;
      offCtx = offscreen.getContext("2d")!;
    }

    function init() {
      resize();
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(makeParticle(false));
      }
    }

    let animId = 0;
    let lastT = 0;

    function draw(now: number) {
      animId = requestAnimationFrame(draw);

      if (now - lastT < 20) return;
      lastT = now;

      if (!offCtx || !offscreen) return;

      offCtx.clearRect(0, 0, W, H);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life--;

        if (p.life <= 0 || p.y < -6) {
          particles[i] = makeParticle(true);
          continue;
        }

        const progress = p.life / p.maxLife;
        const fade =
          progress < 0.15
            ? progress / 0.15
            : progress > 0.85
            ? (1 - progress) / 0.15
            : 1;

        const [r, g, b] = COLORS[p.ci];
        const a = p.alpha * fade;

        offCtx.save();
        offCtx.globalAlpha = a;
        offCtx.shadowColor = `rgba(${r},${g},${b},0.9)`;
        offCtx.shadowBlur = p.r * 5;
        offCtx.beginPath();
        offCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        offCtx.fillStyle = `rgb(${r},${g},${b})`;
        offCtx.fill();
        offCtx.restore();
      }

      ctx?.clearRect(0, 0, W, H);
      ctx?.drawImage(offscreen, 0, 0);
    }

    init();
    animId = requestAnimationFrame(draw);

    const ro = new ResizeObserver(() => {
      resize();
    });
    ro.observe(canvas);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      ro.disconnect();
    };
  }, []);
}
