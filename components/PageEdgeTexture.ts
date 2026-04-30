import * as THREE from 'three';

// Generates a striated page-edge texture (stack of paper pages seen from the side).
export function generatePageEdgeTexture(): THREE.Texture {
  const W = 2048;
  const H = 256;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  // Cream paper base
  ctx.fillStyle = '#f3ecdc';
  ctx.fillRect(0, 0, W, H);

  // Layer 1: many fine vertical lines, each is one page edge
  const numPages = 420;
  for (let i = 0; i < numPages; i++) {
    const x = (i / numPages) * W + (Math.random() - 0.5) * 1.5;
    const lineW = 0.6 + Math.random() * 1.4;
    const a = 0.06 + Math.random() * 0.18;
    ctx.fillStyle = `rgba(70, 55, 30, ${a})`;
    ctx.fillRect(x, 0, lineW, H);
  }

  // Layer 2: occasional darker page (signature breaks, dirty edges)
  for (let i = 0; i < 24; i++) {
    const x = Math.random() * W;
    ctx.fillStyle = `rgba(80, 60, 30, ${0.18 + Math.random() * 0.18})`;
    ctx.fillRect(x, 0, 1.5, H);
  }

  // Layer 3: fine grain noise
  const imgData = ctx.getImageData(0, 0, W, H);
  const d = imgData.data;
  for (let i = 0; i < d.length; i += 4) {
    const n = (Math.random() - 0.5) * 14;
    d[i]     = Math.max(0, Math.min(255, d[i] + n));
    d[i + 1] = Math.max(0, Math.min(255, d[i + 1] + n));
    d[i + 2] = Math.max(0, Math.min(255, d[i + 2] + n));
  }
  ctx.putImageData(imgData, 0, 0);

  // Layer 4: top/bottom soft shadow so corners feel slightly darker
  const grad = ctx.createLinearGradient(0, 0, 0, H);
  grad.addColorStop(0, 'rgba(0,0,0,0.10)');
  grad.addColorStop(0.5, 'rgba(0,0,0,0)');
  grad.addColorStop(1, 'rgba(0,0,0,0.10)');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.needsUpdate = true;
  return tex;
}
