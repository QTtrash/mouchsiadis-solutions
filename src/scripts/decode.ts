// Text decode (scramble -> settle) and typewriter effects.
// Callers gate on prefers-reduced-motion; these functions just animate.

const GLYPHS = "▓▒░#%&@$01<>/\\";

function scrambleChar(): string {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]!;
}

/** Scramble the element's text and settle it left-to-right. Safe to re-run. */
export function decodeText(el: HTMLElement, durationMs = 380): void {
  const original = el.dataset.decodeText ?? el.textContent ?? "";
  el.dataset.decodeText = original;
  if (!original.trim()) return;
  const started = performance.now();
  const existing = Number(el.dataset.decodeRaf ?? 0);
  if (existing) cancelAnimationFrame(existing);

  const frame = (now: number): void => {
    const progress = Math.min(1, (now - started) / durationMs);
    const settled = Math.floor(original.length * progress);
    let out = original.slice(0, settled);
    for (let i = settled; i < original.length; i += 1) {
      const ch = original[i]!;
      out += ch === " " ? " " : scrambleChar();
    }
    el.textContent = out;
    if (progress < 1) {
      el.dataset.decodeRaf = String(requestAnimationFrame(frame));
    } else {
      el.textContent = original;
      delete el.dataset.decodeRaf;
    }
  };
  el.dataset.decodeRaf = String(requestAnimationFrame(frame));
}

/** Type text into an element character by character. Returns a cancel function. */
export function typeText(el: HTMLElement, text: string, charMs = 14, onDone?: () => void): () => void {
  let i = 0;
  let timer = 0;
  el.textContent = "";
  const step = (): void => {
    // type in small chunks so long lines stay snappy
    i = Math.min(text.length, i + 1 + Math.floor(Math.random() * 2));
    el.textContent = text.slice(0, i);
    if (i < text.length) {
      timer = window.setTimeout(step, charMs);
    } else {
      onDone?.();
    }
  };
  step();
  return () => {
    window.clearTimeout(timer);
    el.textContent = text;
  };
}
