// Code-drawn pixel art (docs/visual-design.md, "Art direction").
// Sprites are palette-indexed grids drawn with a few raster primitives and
// rendered to crisp SVG at build time; nothing here ships to the browser.
//
// Palette keys map to CSS classes (px-<key>) so the same sprite can be tinted
// per suit or context through custom properties:
//   k ink   c accent-dark   b accent-mid   a accent   h accent-highlight
//   w white-phosphor   y amber   o copper   . transparent

export type PaletteKey = "k" | "c" | "b" | "a" | "h" | "w" | "y" | "o";
export type Grid = string[];

// 4x4 Bayer matrix, normalised to 0..1 thresholds.
const BAYER = [
  [0, 8, 2, 10],
  [12, 4, 14, 6],
  [3, 11, 1, 9],
  [15, 7, 13, 5],
].map((row) => row.map((value) => (value + 0.5) / 16));

export function bayer(x: number, y: number): number {
  return BAYER[y & 3]![x & 3]!;
}

export class Canvas {
  readonly width: number;
  readonly height: number;
  readonly cells: string[][];

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    this.cells = Array.from({ length: height }, () => Array<string>(width).fill("."));
  }

  set(x: number, y: number, key: string): this {
    x = Math.round(x);
    y = Math.round(y);
    if (x >= 0 && y >= 0 && x < this.width && y < this.height && key !== " ") this.cells[y]![x] = key;
    return this;
  }

  get(x: number, y: number): string {
    return this.cells[y]?.[x] ?? ".";
  }

  rect(x: number, y: number, w: number, h: number, key: string): this {
    for (let row = y; row < y + h; row += 1) for (let col = x; col < x + w; col += 1) this.set(col, row, key);
    return this;
  }

  box(x: number, y: number, w: number, h: number, key: string): this {
    this.hline(x, y, w, key).hline(x, y + h - 1, w, key);
    return this.vline(x, y, h, key).vline(x + w - 1, y, h, key);
  }

  hline(x: number, y: number, length: number, key: string): this {
    return this.rect(x, y, length, 1, key);
  }

  vline(x: number, y: number, length: number, key: string): this {
    return this.rect(x, y, 1, length, key);
  }

  /** Bresenham line; `dash` keeps every nth pixel. */
  line(x0: number, y0: number, x1: number, y1: number, key: string, dash = 1): this {
    const dx = Math.abs(x1 - x0);
    const dy = -Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let error = dx + dy;
    let step = 0;
    for (;;) {
      if (step % dash === 0) this.set(x0, y0, key);
      step += 1;
      if (x0 === x1 && y0 === y1) return this;
      const doubled = 2 * error;
      if (doubled >= dy) {
        error += dy;
        x0 += sx;
      }
      if (doubled <= dx) {
        error += dx;
        y0 += sy;
      }
    }
  }

  disc(cx: number, cy: number, r: number, key: string): this {
    for (let y = Math.floor(cy - r); y <= Math.ceil(cy + r); y += 1)
      for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x += 1)
        if ((x - cx) ** 2 + (y - cy) ** 2 <= r * r + r * 0.6) this.set(x, y, key);
    return this;
  }

  /** Circle outline; `density` below 1 dithers it. */
  ring(cx: number, cy: number, r: number, key: string, density = 1): this {
    for (let y = Math.floor(cy - r - 1); y <= Math.ceil(cy + r + 1); y += 1)
      for (let x = Math.floor(cx - r - 1); x <= Math.ceil(cx + r + 1); x += 1)
        if (Math.abs(Math.hypot(x - cx, y - cy) - r) < 0.5 && bayer(x, y) < density) this.set(x, y, key);
    return this;
  }

  /** Ordered-dither fill: `density` 0..1 of the area gets `key`. */
  dither(x: number, y: number, w: number, h: number, key: string, density: number): this {
    for (let row = y; row < y + h; row += 1)
      for (let col = x; col < x + w; col += 1) if (bayer(col, row) < density) this.set(col, row, key);
    return this;
  }

  /** Stamp a literal grid; "." leaves the canvas untouched. */
  glyph(x: number, y: number, rows: Grid): this {
    rows.forEach((row, dy) => [...row].forEach((key, dx) => key !== "." && this.set(x + dx, y + dy, key)));
    return this;
  }

  mirror(x: number, y: number, rows: Grid): this {
    return this.glyph(x, y, rows.map((row) => [...row].reverse().join("")));
  }

  toGrid(): Grid {
    return this.cells.map((row) => row.join(""));
  }
}

/** One SVG path per palette key, merging horizontal runs. */
export function gridToPaths(grid: Grid): Array<{ key: string; d: string }> {
  const paths = new Map<string, string[]>();
  grid.forEach((row, y) => {
    let x = 0;
    while (x < row.length) {
      const key = row[x]!;
      let run = 1;
      while (row[x + run] === key) run += 1;
      if (key !== ".") {
        if (!paths.has(key)) paths.set(key, []);
        paths.get(key)!.push(`M${x} ${y}h${run}v1h-${run}z`);
      }
      x += run;
    }
  });
  return [...paths].map(([key, parts]) => ({ key, d: parts.join("") }));
}
