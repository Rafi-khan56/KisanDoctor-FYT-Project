import { decode } from 'jpeg-js';
import { IMG_SIZE } from './classifier';

const B64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const LOOKUP = new Uint8Array(256);
for (let i = 0; i < B64.length; i++) LOOKUP[B64.charCodeAt(i)] = i;

export function base64ToBytes(b64: string): Uint8Array {
  const clean = b64.replace(/[^A-Za-z0-9+/]/g, ''); // '=' aur nayi line hata do
  const len = clean.length;
  const out = new Uint8Array(Math.floor((len * 3) / 4));
  let p = 0;
  for (let i = 0; i < len; i += 4) {
    const a = LOOKUP[clean.charCodeAt(i)];
    const b = LOOKUP[clean.charCodeAt(i + 1)];
    const c = i + 2 < len ? LOOKUP[clean.charCodeAt(i + 2)] : 0;
    const d = i + 3 < len ? LOOKUP[clean.charCodeAt(i + 3)] : 0;
    out[p++] = (a << 2) | (b >> 4);
    if (i + 2 < len) out[p++] = ((b & 15) << 4) | (c >> 2);
    if (i + 3 < len) out[p++] = ((c & 3) << 6) | d;
  }
  return out.subarray(0, p);
}

// JPEG (base64) -> 224x224 RGB pixels (0..255), beech ka chaukor hissa kaat kar.
export function jpegBase64ToPixels(b64: string): Float32Array {
  const bytes = base64ToBytes(b64);
  if (bytes[0] !== 0xff || bytes[1] !== 0xd8) {
    throw new Error('Sirf JPEG tasveer chalti hai (camera ki ya gallery ki photo lein, screenshot nahi)');
  }
  const img = decode(bytes, {
    useTArray: true,
    formatAsRGBA: true,
    maxMemoryUsageInMB: 512,
  });
  const { width, height, data } = img;

  const side = Math.min(width, height);
  const x0 = Math.floor((width - side) / 2);
  const y0 = Math.floor((height - side) / 2);
  const scale = side / IMG_SIZE;
  const out = new Float32Array(IMG_SIZE * IMG_SIZE * 3);

  for (let y = 0; y < IMG_SIZE; y++) {
    const ys = y0 + Math.floor(y * scale);
    const ye = Math.max(ys + 1, y0 + Math.floor((y + 1) * scale));
    for (let x = 0; x < IMG_SIZE; x++) {
      const xs = x0 + Math.floor(x * scale);
      const xe = Math.max(xs + 1, x0 + Math.floor((x + 1) * scale));
      let r = 0, g = 0, bl = 0, n = 0;
      for (let yy = ys; yy < ye; yy++) {
        for (let xx = xs; xx < xe; xx++) {
          const i = (yy * width + xx) * 4;
          r += data[i];
          g += data[i + 1];
          bl += data[i + 2];
          n++;
        }
      }
      const o = (y * IMG_SIZE + x) * 3;
      out[o] = r / n;
      out[o + 1] = g / n;
      out[o + 2] = bl / n;
    }
  }
  return out;
}

// Hifazati check: patte ki tasveer mein hara rang hota hai. Screenshot, ghari, kagaz jaisi cheezon mein bohat kam.
// pixels: 224x224x3 (0..255). Wapas hare pixels ka hissa (0 se 1).
export function greenRatio(pixels: Float32Array): number {
  let green = 0;
  const n = pixels.length / 3;
  for (let i = 0; i < pixels.length; i += 3) {
    const r = pixels[i];
    const g = pixels[i + 1];
    const b = pixels[i + 2];
    if (g > 40 && g > b * 1.08 && g >= r * 0.85) green++;
  }
  return green / n;
}

export const MIN_GREEN_RATIO = 0.08;
