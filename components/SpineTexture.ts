import * as THREE from 'three';

// Builds a spine texture by sampling the cover's background color and laying
// out the Kodex logo at top + CLOC 2026 at bottom.
export async function generateSpineTexture(frontCoverUrl: string): Promise<THREE.Texture> {
  const cover = await loadImage(frontCoverUrl);
  const logo = await loadImage('/textures/kodex-logo.svg');

  // Sample two points along the cover gradient
  const sampleTop = sampleAverageColor(cover, 0.55, 0.0, 0.9, 0.15);
  const sampleBot = sampleAverageColor(cover, 0.55, 0.85, 0.9, 1.0);

  // Build spine in landscape, then rotate the texture 90° onto the portrait spine face
  const W = 1600;
  const H = 320;
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;

  const grad = ctx.createLinearGradient(0, 0, W, 0);
  grad.addColorStop(0, sampleTop);
  grad.addColorStop(1, sampleBot);
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, W, H);

  // Subtle paper grain
  for (let i = 0; i < 800; i++) {
    ctx.fillStyle = `rgba(0,0,0,${Math.random() * 0.012})`;
    ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
  }

  // Kodex logo (left edge — appears at TOP of spine after rotation)
  const logoH = 150;
  const logoAspect = (logo.naturalWidth || 68) / (logo.naturalHeight || 16);
  const logoW = logoH * logoAspect;
  ctx.drawImage(logo, 90, H / 2 - logoH / 2, logoW, logoH);

  // CLOC 2026 (right edge — appears at BOTTOM of spine after rotation)
  ctx.font = '500 92px -apple-system, BlinkMacSystemFont, Inter, "Segoe UI", sans-serif';
  ctx.textAlign = 'right';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(16, 42, 85, 0.65)';
  ctx.fillText('CLOC 2026', W - 100, H / 2);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 8;
  tex.center.set(0.5, 0.5);
  tex.rotation = -Math.PI / 2;
  tex.needsUpdate = true;
  return tex;
}

function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function sampleAverageColor(
  img: HTMLImageElement,
  x0: number, y0: number, x1: number, y1: number,
): string {
  const c = document.createElement('canvas');
  c.width = c.height = 1;
  const cx = c.getContext('2d')!;
  const sx = Math.floor(img.width * x0);
  const sy = Math.floor(img.height * y0);
  const sw = Math.floor(img.width * (x1 - x0));
  const sh = Math.floor(img.height * (y1 - y0));
  cx.drawImage(img, sx, sy, sw, sh, 0, 0, 1, 1);
  const [r, g, b] = cx.getImageData(0, 0, 1, 1).data;
  return `rgb(${r}, ${g}, ${b})`;
}
