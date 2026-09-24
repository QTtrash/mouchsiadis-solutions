// Backlog Breaker geometry, shared by the build-time poster (sprites.ts) and
// the lazy game engine (scripts/breaker.ts) so both draw the same board.
// Units are logical pixels on a 96x64 canvas that CSS scales up crisply.

export const BOARD = { width: 96, height: 64 } as const;
export const BRICKS = { cols: 8, rows: 4, width: 10, height: 3, gap: 1, left: 4, top: 7 } as const;
export const PADDLE = { width: 16, height: 2, y: 59 } as const;
export const BALL = 2;

/** Palette key per brick row, top to bottom (see pixel.ts palette). */
export const ROW_KEYS = ["y", "o", "a", "h"] as const;

export function brickRect(col: number, row: number): { x: number; y: number; w: number; h: number } {
  return {
    x: BRICKS.left + col * (BRICKS.width + BRICKS.gap),
    y: BRICKS.top + row * (BRICKS.height + BRICKS.gap),
    w: BRICKS.width,
    h: BRICKS.height,
  };
}
