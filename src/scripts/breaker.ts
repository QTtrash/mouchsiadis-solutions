// Backlog Breaker engine. Loaded on first Start (see BacklogBreaker.astro).
// Draws on a 96x64 canvas that CSS scales with image-rendering: pixelated.
// Controls: pointer or finger drag, ← → keys; click, tap, or Space launches;
// P or Escape pauses. The game pauses itself when hidden or off-panel.

import { BALL, BOARD, BRICKS, PADDLE, ROW_KEYS, brickRect } from "../lib/breaker-layout";
import { SoundEngine } from "./sound";

type State = "serve" | "playing" | "paused" | "won" | "lost";

interface Copy {
  start: string;
  pause: string;
  resume: string;
  again: string;
  serve: string;
  won: string;
  lost: string;
}

const COLORS: Record<string, string> = {
  y: "#ffb000",
  o: "#e07b42",
  a: "#8dff7a",
  h: "#c6f4bd",
  w: "#eefbe9",
  ground: "#031005",
  grid: "#0b2310",
  ball: "#ffcf66",
};
const LIVES = 3;
const START_SPEED = 52;
const MAX_SPEED = 92;
const KEY_SPEED = 96;

export function mountBreaker(root: HTMLElement): void {
  if (root.dataset.arcadeMounted) return;
  root.dataset.arcadeMounted = "true";

  const copy = JSON.parse(root.dataset.copy ?? "{}") as Copy;
  const stage = root.querySelector<HTMLElement>("[data-arcade-stage]")!;
  const canvas = stage.querySelector("canvas")!;
  const poster = stage.querySelector<SVGElement>(".arcade__poster");
  const overlay = root.querySelector<HTMLElement>("[data-arcade-overlay]")!;
  const message = root.querySelector<HTMLElement>("[data-arcade-message]")!;
  const startButton = root.querySelector<HTMLButtonElement>("[data-arcade-start]")!;
  const pauseButton = root.querySelector<HTMLButtonElement>("[data-arcade-pause]")!;
  const scoreOut = root.querySelector<HTMLElement>("[data-arcade-score]")!;
  const livesOut = root.querySelector<HTMLElement>("[data-arcade-lives]")!;
  const live = root.querySelector<HTMLElement>("[data-arcade-live]")!;
  const ctx = canvas.getContext("2d")!;
  const sound = new SoundEngine();

  let bricks: boolean[] = [];
  let remaining = 0;
  let score = 0;
  let lives = LIVES;
  let speed = START_SPEED;
  let state: State = "serve";
  let paddleX = (BOARD.width - PADDLE.width) / 2;
  let ball = { x: 0, y: 0, vx: 0, vy: 0 };
  let keys = 0; // -1 left, +1 right
  let frame = 0;
  let last = 0;

  const clampPaddle = (x: number) => Math.max(0, Math.min(BOARD.width - PADDLE.width, x));
  const seatBall = () => {
    ball = { x: paddleX + PADDLE.width / 2 - BALL / 2, y: PADDLE.y - BALL - 1, vx: 0, vy: 0 };
  };

  const hud = () => {
    scoreOut.textContent = String(score).padStart(4, "0");
    livesOut.textContent = "■".repeat(lives) + "□".repeat(LIVES - lives);
  };

  const showOverlay = (text: string, button: string | null) => {
    message.textContent = text;
    overlay.hidden = false;
    startButton.hidden = !button;
    if (button) {
      startButton.textContent = button;
      // keyboard players land on Resume / Play again
      if (root.contains(document.activeElement)) startButton.focus({ preventScroll: true });
    }
  };

  const setState = (next: State) => {
    state = next;
    stage.classList.toggle("is-playing", next === "playing" || next === "serve");
    pauseButton.hidden = !(next === "playing" || next === "serve" || next === "paused");
    // a toggle keeps its label; aria-pressed carries the state (the overlay offers Resume)
    pauseButton.setAttribute("aria-pressed", String(next === "paused"));
    if (next === "serve") showOverlay(copy.serve, null);
    else if (next === "paused") showOverlay("", copy.resume);
    else if (next === "won") showOverlay(copy.won, copy.again);
    else if (next === "lost") showOverlay(copy.lost, copy.again);
    else overlay.hidden = true;
    if (next === "won" || next === "lost") live.textContent = `${next === "won" ? copy.won : copy.lost} ${score}`;
    if (next === "playing" || next === "serve") run();
  };

  const reset = () => {
    bricks = Array<boolean>(BRICKS.cols * BRICKS.rows).fill(true);
    remaining = bricks.length;
    score = 0;
    lives = LIVES;
    speed = START_SPEED;
    paddleX = (BOARD.width - PADDLE.width) / 2;
    seatBall();
    hud();
  };

  const launch = () => {
    if (state !== "serve") return;
    const angle = (Math.random() * 0.8 - 0.4) * (Math.PI / 3);
    ball.vx = speed * Math.sin(angle);
    ball.vy = -speed * Math.cos(angle);
    sound.play("key");
    setState("playing");
  };

  const overlaps = (x: number, y: number, r: { x: number; y: number; w: number; h: number }) =>
    x < r.x + r.w && x + BALL > r.x && y < r.y + r.h && y + BALL > r.y;

  const hitBrick = (): boolean => {
    for (let index = 0; index < bricks.length; index += 1) {
      if (!bricks[index]) continue;
      const rect = brickRect(index % BRICKS.cols, Math.floor(index / BRICKS.cols));
      if (!overlaps(ball.x, ball.y, rect)) continue;
      bricks[index] = false;
      remaining -= 1;
      score += 10 * (BRICKS.rows - Math.floor(index / BRICKS.cols));
      speed = Math.min(MAX_SPEED, speed + 1.2);
      sound.play("tab", index % 6);
      hud();
      return true;
    }
    return false;
  };

  const step = (dt: number) => {
    paddleX = clampPaddle(paddleX + keys * KEY_SPEED * dt);
    if (state === "serve") {
      seatBall();
      return;
    }
    // Axis-separated sub-steps of at most 1px keep collisions exact at any speed.
    const steps = Math.max(1, Math.ceil(Math.max(Math.abs(ball.vx), Math.abs(ball.vy)) * dt));
    for (let i = 0; i < steps; i += 1) {
      ball.x += (ball.vx * dt) / steps;
      if (ball.x < 0 || ball.x > BOARD.width - BALL) {
        ball.x = Math.max(0, Math.min(BOARD.width - BALL, ball.x));
        ball.vx = -ball.vx;
      } else if (hitBrick()) {
        ball.x -= (ball.vx * dt) / steps;
        ball.vx = -ball.vx;
      }
      ball.y += (ball.vy * dt) / steps;
      if (ball.y < 0) {
        ball.y = 0;
        ball.vy = Math.abs(ball.vy);
      } else if (hitBrick()) {
        ball.y -= (ball.vy * dt) / steps;
        ball.vy = -ball.vy;
      } else if (
        ball.vy > 0 &&
        overlaps(ball.x, ball.y, { x: paddleX, y: PADDLE.y, w: PADDLE.width, h: PADDLE.height })
      ) {
        // Where the ball meets the paddle sets its angle, up to 60 degrees.
        const offset = (ball.x + BALL / 2 - (paddleX + PADDLE.width / 2)) / (PADDLE.width / 2);
        const angle = Math.max(-1, Math.min(1, offset)) * (Math.PI / 3);
        ball.vx = speed * Math.sin(angle);
        ball.vy = -speed * Math.cos(angle);
        ball.y = PADDLE.y - BALL;
        sound.play("detail");
      }
    }
    if (remaining === 0) {
      sound.play("acquire");
      setState("won");
    } else if (ball.y > BOARD.height) {
      lives -= 1;
      hud();
      sound.play("error");
      if (lives === 0) setState("lost");
      else {
        seatBall();
        setState("serve");
      }
    }
  };

  const draw = () => {
    ctx.fillStyle = COLORS.ground!;
    ctx.fillRect(0, 0, BOARD.width, BOARD.height);
    ctx.fillStyle = COLORS.grid!;
    for (let y = 2; y < BOARD.height; y += 4) for (let x = 2; x < BOARD.width; x += 4) ctx.fillRect(x, y, 1, 1);
    bricks.forEach((alive, index) => {
      if (!alive) return;
      const row = Math.floor(index / BRICKS.cols);
      const { x, y, w, h } = brickRect(index % BRICKS.cols, row);
      ctx.fillStyle = COLORS[ROW_KEYS[row]!]!;
      ctx.fillRect(x, y, w, h);
      ctx.fillStyle = COLORS.w!;
      ctx.fillRect(x, y, w, 1);
    });
    ctx.fillStyle = COLORS.w!;
    ctx.fillRect(Math.round(paddleX), PADDLE.y, PADDLE.width, PADDLE.height);
    ctx.fillStyle = COLORS.ball!;
    ctx.fillRect(Math.round(ball.x), Math.round(ball.y), BALL, BALL);
  };

  // Hidden tab, scrolled away, or another terminal panel on top: pause.
  const obscured = () => document.hidden || Boolean(root.closest("[inert]"));

  function tick(now: number) {
    frame = 0;
    if (obscured() && state === "playing") setState("paused");
    if (state !== "playing" && state !== "serve") {
      draw();
      return;
    }
    const dt = Math.min(1 / 30, (now - last) / 1000 || 0);
    last = now;
    step(dt);
    draw();
    if (state === "playing" || state === "serve") frame = requestAnimationFrame(tick);
  }

  function run() {
    if (frame) return;
    last = performance.now();
    frame = requestAnimationFrame(tick);
  }

  const togglePause = () => {
    if (state === "playing" || state === "serve") {
      cancelAnimationFrame(frame);
      frame = 0;
      setState("paused");
    } else if (state === "paused") {
      setState(ball.vx || ball.vy ? "playing" : "serve");
      stage.focus({ preventScroll: true });
    }
  };

  // ---- input ----

  const pointerToPaddle = (event: PointerEvent) => {
    const rect = canvas.getBoundingClientRect();
    paddleX = clampPaddle(((event.clientX - rect.left) / rect.width) * BOARD.width - PADDLE.width / 2);
  };
  stage.addEventListener("pointermove", (event) => {
    if (state === "playing" || state === "serve") pointerToPaddle(event);
  });
  stage.addEventListener("pointerdown", (event) => {
    if ((event.target as Element).closest("button")) return;
    if (state === "serve") {
      pointerToPaddle(event);
      launch();
    }
  });
  stage.addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      keys = event.key === "ArrowLeft" ? -1 : 1;
      event.preventDefault();
    } else if (event.key === " " || event.key === "Enter") {
      // Space would scroll the page or panel under the game; the board owns it.
      if (event.target === stage) event.preventDefault();
      if (state === "serve") launch();
    } else if (event.key === "p" || event.key === "P" || event.key === "Escape") {
      togglePause();
    }
  });
  stage.addEventListener("keyup", (event) => {
    if ((event.key === "ArrowLeft" && keys < 0) || (event.key === "ArrowRight" && keys > 0)) keys = 0;
  });
  stage.addEventListener("blur", () => (keys = 0));
  pauseButton.addEventListener("click", togglePause);
  startButton.addEventListener("click", () => {
    if (state === "paused") togglePause();
    else if (state === "won" || state === "lost") begin();
  });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden && state === "playing") togglePause();
  });

  const begin = () => {
    reset();
    setState("serve");
    stage.focus({ preventScroll: true });
  };

  // ---- boot: swap the poster for the live canvas ----
  if (poster) poster.style.display = "none";
  canvas.hidden = false;
  begin();
}
