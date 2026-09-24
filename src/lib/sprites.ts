// The pixel sprite library. Art is 40x20 (card/cover windows), icons 9x9,
// suits 7x7. Each drawing illustrates what the record actually does.
import { Canvas, type Grid } from "./pixel.ts";
import { BALL, BOARD, BRICKS, PADDLE, ROW_KEYS, brickRect } from "./breaker-layout.ts";

export const ART_W = 40;
export const ART_H = 20;

const art = (draw: (c: Canvas) => void): Grid => {
  const canvas = new Canvas(ART_W, ART_H);
  draw(canvas);
  return canvas.toGrid();
};

const wave = (c: Canvas, base: number, amp: number, period: number, phase: number, key: string) => {
  for (let x = 0; x < ART_W; x += 1) c.set(x, base + amp * Math.sin(x / period + phase), key);
};

// ---- project art: keyed by record slug ----

const projectArt: Record<string, Grid> = {
  // payouts flow from a coin stack into a ledger; the last row reconciles
  ypay: art((c) => {
    for (const y of [15, 13, 11, 9]) {
      c.rect(4, y, 10, 2, "b").hline(5, y, 8, "a").set(6, y, "h");
    }
    c.hline(16, 11, 6, "b").set(21, 10, "b").set(21, 12, "b").set(22, 11, "a");
    c.rect(25, 4, 10, 13, "c").box(24, 3, 12, 15, "a").hline(25, 5, 10, "b");
    for (const y of [8, 11]) c.hline(26, y, 5, "b").set(33, y, "a");
    c.hline(26, 14, 4, "b").glyph(31, 13, ["...y", "y.y.", ".y.."]);
  }),

  // tickets ride three tenant lanes into a desk; the bell is the notification worker
  ydesk: art((c) => {
    const ticket = (x: number, y: number) => c.rect(x, y, 6, 3, "b").hline(x + 1, y + 1, 3, "a");
    for (const y of [5, 10, 15]) c.hline(1, y + 3, 26, "c");
    [3, 13].forEach((x) => ticket(x, 5));
    ticket(8, 10);
    [1, 10, 19].forEach((x) => ticket(x, 15));
    c.box(29, 6, 9, 13, "a").rect(30, 7, 7, 11, "c");
    for (const y of [9, 12, 15]) c.hline(31, y, 5, "b");
    c.glyph(31, 0, ["..y..", ".yyy.", ".yyy.", "yyyyy", "..y.."]);
  }),

  // a replay heat-map under a crosshair, with a scrubbable match timeline
  grindlike: art((c) => {
    for (let y = 2; y < 16; y += 3) for (let x = 2; x < 28; x += 3) c.set(x, y, "c");
    c.dither(6, 4, 8, 6, "b", 0.5).disc(10, 7, 1.5, "a");
    c.dither(15, 8, 8, 6, "b", 0.35).disc(19, 11, 1, "a");
    c.ring(19, 10, 4, "h").hline(12, 10, 3, "h").hline(24, 10, 3, "h").vline(19, 3, 3, "h").vline(19, 15, 2, "h");
    c.hline(2, 18, 36, "c").hline(2, 18, 22, "a").vline(24, 16, 3, "w");
    [8, 15, 21].forEach((x) => c.set(x, 17, "y"));
    [[30, 6], [32, 9], [34, 4], [36, 11]].forEach(([x, h]) => c.vline(x!, 15 - h!, h!, "b").set(x!, 15 - h!, "a"));
  }),

  // two squad members on a contour map, linked through a sealed relay
  "raid-signal": art((c) => {
    wave(c, 5, 2, 5, 0, "c");
    wave(c, 12, 2, 6, 1, "c");
    wave(c, 17, 1.5, 4, 2, "b");
    c.line(8, 14, 16, 10, "y", 2).line(23, 9, 31, 6, "y", 2);
    c.disc(7, 14, 1.2, "a").set(7, 14, "w").disc(32, 6, 1.2, "a").set(32, 6, "w");
    c.glyph(17, 5, ["..aaa..", ".a...a.", ".a...a.", "aaaaaaa", "aayyyaa", "aaayaaa", "aaaaaaa"]);
  }),

  // a winged controller under a halo
  "flygod-studios": art((c) => {
    const wing = ["aaaa......", ".abbaa....", "..abbbaa..", "...abbbbaa", ".....abbba", ".......aab"];
    c.glyph(3, 4, wing).mirror(27, 4, wing);
    c.hline(17, 1, 6, "y").set(16, 2, "y").set(23, 2, "y").hline(17, 3, 6, "y");
    c.rect(13, 8, 14, 6, "b").rect(12, 11, 3, 5, "b").rect(25, 11, 3, 5, "b");
    c.set(13, 8, ".").set(26, 8, ".").hline(14, 8, 12, "a");
    c.hline(15, 10, 3, "h").vline(16, 9, 3, "h");
    c.set(23, 10, "y").set(24, 11, "a").set(22, 11, "a");
  }),

  // a sudoku board with one selected cell, synced to the cloud
  "alice-plays": art((c) => {
    c.rect(11, 1, 17, 17, "c").box(10, 0, 19, 19, "a").vline(16, 1, 17, "b").vline(22, 1, 17, "b");
    c.hline(11, 6, 17, "b").hline(11, 12, 17, "b");
    [[12, 2], [14, 4], [18, 3], [20, 9], [13, 10], [25, 14], [19, 15], [26, 3], [12, 16]].forEach(([x, y]) =>
      c.rect(x!, y!, 2, 2, "h"),
    );
    c.box(23, 7, 5, 5, "y").set(25, 9, "y");
    c.disc(33, 8, 2, "b").disc(36, 9, 1.5, "b").rect(31, 9, 7, 2, "b");
    c.vline(34, 11, 4, "a").set(33, 12, "a").set(35, 12, "a");
    c.glyph(3, 7, [".y.", "yyy", ".y."]).glyph(5, 12, [".y.", "yyy", ".y."]);
  }),

  // the rifle-revolver hybrid in profile
  "rifle-revolver": art((c) => {
    c.hline(6, 10, 5, "b").hline(4, 11, 7, "b").hline(2, 12, 9, "b").hline(2, 13, 8, "b");
    c.rect(10, 9, 8, 4, "b").hline(10, 9, 8, "a");
    c.rect(18, 8, 6, 5, "a").vline(19, 9, 3, "c").vline(21, 9, 3, "c").vline(23, 9, 3, "c");
    c.rect(24, 9, 14, 2, "b").hline(24, 9, 14, "a").set(36, 8, "b");
    c.rect(12, 6, 9, 2, "c").set(12, 6, "a").set(20, 6, "a").set(15, 8, "b");
    c.set(13, 13, "b").hline(13, 14, 4, "b").set(16, 13, "b").set(14, 13, "h");
    c.hline(3, 16, 34, "c");
  }),

  // a revolver whose muzzle burns
  "incendiary-revolver": art((c) => {
    c.rect(7, 11, 4, 3, "b").rect(6, 14, 4, 3, "b").rect(5, 17, 4, 2, "b");
    c.rect(9, 8, 6, 4, "b").set(9, 7, "b").hline(9, 8, 6, "a");
    c.rect(15, 7, 5, 5, "a").vline(16, 8, 3, "c").vline(18, 8, 3, "c");
    c.rect(20, 8, 11, 2, "b").hline(20, 8, 11, "a").set(12, 12, "b").hline(12, 13, 3, "b");
    c.glyph(30, 3, [
      "...y....",
      "..yy..y.",
      ".yyoy.y.",
      ".yoooyy.",
      "yyoowoyy",
      "yoowwooy",
      "yoowwooy",
      ".yoooyy.",
      "..yyyy..",
    ]);
    c.set(26, 3, "y").set(35, 1, "y").set(24, 5, "o");
  }),
};

// ---- experience / generic covers: keyed by content `cover` ----

const coverArt: Record<string, Grid> = {
  cloud: art((c) => {
    c.disc(15, 8, 3, "b").disc(20, 6, 4, "b").disc(25, 8, 3, "b").rect(12, 8, 16, 4, "b");
    c.hline(17, 2, 6, "a").set(16, 3, "a").set(23, 3, "a").set(13, 6, "a").set(26, 6, "a");
    c.vline(17, 13, 5, "a").set(16, 14, "a").set(18, 14, "a");
    c.vline(23, 13, 5, "y").set(22, 16, "y").set(24, 16, "y");
  }),
  analytics: art((c) => {
    [[8, 7], [13, 11], [18, 5], [23, 14], [28, 9]].forEach(([x, h]) => c.rect(x!, 17 - h!, 3, h!, "b").hline(x!, 17 - h!, 3, "a"));
    c.hline(6, 17, 28, "c").line(9, 9, 14, 5, "y").line(14, 5, 19, 11, "y").line(19, 11, 24, 2, "y").line(24, 2, 29, 7, "y");
  }),
  medical: art((c) => {
    c.rect(18, 2, 4, 12, "a").rect(14, 6, 12, 4, "a").set(19, 3, "w");
    c.hline(2, 17, 12, "y").line(14, 17, 16, 13, "y").line(16, 13, 18, 19, "y").line(18, 19, 20, 15, "y").hline(20, 17, 18, "y");
  }),
  fleet: art((c) => {
    c.rect(8, 9, 24, 5, "b").hline(8, 9, 24, "a").rect(13, 5, 13, 4, "b").hline(13, 5, 13, "a");
    c.rect(15, 6, 4, 2, "c").rect(21, 6, 4, 2, "c").rect(17, 3, 5, 2, "y");
    c.disc(13, 14, 2, "c").ring(13, 14, 2, "a").disc(27, 14, 2, "c").ring(27, 14, 2, "a");
    c.hline(2, 17, 36, "c");
  }),
  precision: art((c) => {
    c.disc(20, 10, 5, "b").disc(20, 10, 2, "c").set(20, 10, "a");
    for (let i = 0; i < 8; i += 1) {
      const angle = (i / 8) * Math.PI * 2;
      c.rect(19.5 + Math.cos(angle) * 6.5, 9.5 + Math.sin(angle) * 6.5, 2, 2, "a");
    }
    c.hline(3, 18, 8, "c").hline(29, 18, 8, "c");
  }),
  chip: art((c) => {
    c.rect(13, 5, 14, 10, "b").box(13, 5, 14, 10, "a").rect(17, 8, 6, 4, "c").set(19, 9, "y");
    for (let x = 15; x < 26; x += 3) c.vline(x, 2, 3, "a").vline(x, 15, 3, "a");
    c.hline(4, 10, 8, "c").hline(28, 10, 8, "c");
  }),
};

const COVER_ALIASES: Record<string, string> = {
  telemetry: "analytics",
  platform: "chip",
  delivery: "chip",
  refactor: "chip",
  consulting: "chip",
  testing: "chip",
  scraping: "chip",
  support: "chip",
};

/** Record art first, then the content cover (through aliases), then the chip. */
export function artFor(record: string | undefined, cover: string): Grid {
  return (record && projectArt[record]) || coverArt[COVER_ALIASES[cover] ?? cover] || coverArt.chip!;
}

// ---- suits (7x7) ----

export const suitSprites: Record<"platform" | "tool" | "game", Grid> = {
  platform: ["...a...", "..aha..", ".aahaa.", "aahhhaa", ".aahaa.", "..aaa..", "...a..."],
  tool: [".aa....", "a..a...", "a..aa..", ".aaaaa.", "...aaaa", "....aaa", ".....aa"],
  game: ["..aaa..", ".aaaaa.", "aahaaaa", "aaaaaaa", "aaaaaaa", ".aaaaa.", "..aaa.."],
};

// ---- navigation icons (9x9) ----

export const navSprites: Record<string, Grid> = {
  overview: ["aaaaaaaaa", "a.......a", "a.h.....a", "a..h....a", "a.h..hh.a", "a.......a", "aaaaaaaaa", "...aaa...", ".aaaaaaa."],
  work: ["...aaa...", "..a...a..", "aaaaaaaaa", "a.......a", "ahhhahhha", "a.......a", "a.......a", "aaaaaaaaa", "........."],
  games: [".........", ".aaaaaaa.", "aaaaaaaaa", "ahaaaaaya", "hhhaaayay", "ahaaaaaya", "aaaaaaaaa", "aaa...aaa", ".a.....a."],
  experience: ["aaaaaaaaa", "a.......a", "a.hhh...a", "a.......a", "a.hhhhh.a", "a.hhhh..a", "aaa.a.aaa", "..a.a.a..", "..aa.aa.."],
  tooling: [".aa......", "a..a.....", "a..aa....", ".aaaaa...", "...aaaa..", "....aaaa.", ".....aaaa", "......aaa", ".......a."],
  notes: ["aaaaaa...", "a....aa..", "a.hhh.aa.", "a......a.", "a.hhhhha.", "a......a.", "a.hhhh.a.", "a......a.", "aaaaaaaa."],
  contact: ["....a....", "..a.a.a..", ".a..a..a.", "....a....", "...aaa...", "...a.a...", "..a...a..", "..a...a..", ".a.....a."],
};

// ---- card back monogram (15x7) ----

export const monogram: Grid = [
  "a...a.....aaaa.",
  "aa.aa....a.....",
  "a.a.a....a.....",
  "a...a.....aaa..",
  "a...a........a.",
  "a...a........a.",
  "a...a....aaaa..",
];

// ---- terminal chassis (drawn in the casing's own olive-graphite accent) ----

export const chassisSprites = {
  screw: ["..ccc..", ".chbbc.", "chbbkbc", "cbbkbbc", "cbkbbbc", ".cbbbc.", "..ccc.."],
  knob: [
    "..ccccc..",
    ".cbhhbbc.",
    "cbhbhbbkc",
    "cbbbhbbkc",
    "cbbbbbbkc",
    "cbbbbbbkc",
    "cbbbbbkkc",
    ".ckkkkkc.",
    "..ccccc..",
  ],
  // "MS-86" name plate: bevelled plate, 5x7 glyphs
  plate: (() => {
    const glyphs: Record<string, string[]> = {
      M: ["h...h", "hh.hh", "h.h.h", "h...h", "h...h", "h...h", "h...h"],
      S: [".hhhh", "h....", "h....", ".hhh.", "....h", "....h", "hhhh."],
      "-": [".....", ".....", ".....", ".hhh.", ".....", ".....", "....."],
      "8": [".hhh.", "h...h", "h...h", ".hhh.", "h...h", "h...h", ".hhh."],
      "6": ["..hh.", ".h...", "h....", "hhhh.", "h...h", "h...h", ".hhh."],
    };
    const text = "MS-86";
    const width = text.length * 6 + 5;
    const rows: string[][] = Array.from({ length: 11 }, (_, y) =>
      Array.from({ length: width }, (_, x): string => {
        if (y === 0 || x === 0) return "b";
        if (y === 10 || x === width - 1) return "c";
        return "k";
      }),
    );
    [...text].forEach((char, index) =>
      glyphs[char]!.forEach((row, dy) =>
        [...row].forEach((key, dx) => {
          if (key !== ".") rows[2 + dy]![3 + index * 6 + dx] = key;
        }),
      ),
    );
    return rows.map((row) => row.join(""));
  })(),
};

// ---- Backlog Breaker poster: the board before the game code loads ----

export const breakerPoster: Grid = (() => {
  const c = new Canvas(BOARD.width, BOARD.height);
  for (let row = 0; row < BRICKS.rows; row += 1)
    for (let col = 0; col < BRICKS.cols; col += 1) {
      const { x, y, w, h } = brickRect(col, row);
      c.rect(x, y, w, h, ROW_KEYS[row]!).hline(x, y, w, "w");
    }
  const paddleX = (BOARD.width - PADDLE.width) / 2;
  c.rect(paddleX, PADDLE.y, PADDLE.width, PADDLE.height, "w");
  c.rect(paddleX + PADDLE.width / 2 - 1, PADDLE.y - BALL - 1, BALL, BALL, "y");
  return c.toGrid();
})();
