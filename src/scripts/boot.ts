// POST-style boot sequence, shown once per session inside the console screen.
// Always skippable (any click/key/touch); callers skip it entirely under
// prefers-reduced-motion or when the session has already booted.

import type { SoundEngine } from "./sound";

const BOOT_KEY = "terminalBooted";

export function hasBooted(): boolean {
  try {
    return sessionStorage.getItem(BOOT_KEY) === "1";
  } catch {
    return true;
  }
}

function markBooted(): void {
  try {
    sessionStorage.setItem(BOOT_KEY, "1");
  } catch {
    /* private mode — boot every time, fine */
  }
}

function bootLines(langLabel: string): string[] {
  return [
    "MOUCHSIADIS SOLUTIONS — FIELD TERMINAL",
    "MODEL MS-86 / STATION MUC-01",
    "MEM CHECK ......... 64K OK",
    "PHOSPHOR .......... DUAL [GRN/AMB]",
    `LANG PACK ......... ${langLabel}`,
    "WORK LOGS ......... MOUNTED",
    "GAME LAB .......... MOUNTED",
    "SIGNAL CHANNEL .... OPEN",
    "READY",
  ];
}

export function runBoot(host: HTMLElement, langLabel: string, sound: SoundEngine): Promise<void> {
  markBooted();
  return new Promise((resolve) => {
    const overlay = document.createElement("div");
    overlay.className = "terminal-boot";
    overlay.setAttribute("aria-hidden", "true");
    const pre = document.createElement("pre");
    pre.className = "terminal-boot__log";
    const cursor = document.createElement("span");
    cursor.className = "terminal-boot__cursor";
    cursor.textContent = "▮";
    overlay.append(pre, cursor);
    host.appendChild(overlay);
    sound.play("boot");

    const lines = bootLines(langLabel);
    let line = 0;
    let timer = 0;
    let finished = false;

    const finish = (): void => {
      if (finished) return;
      finished = true;
      window.clearTimeout(timer);
      document.removeEventListener("keydown", finish);
      overlay.removeEventListener("click", finish);
      overlay.classList.add("terminal-boot--done");
      window.setTimeout(() => {
        overlay.remove();
        resolve();
      }, 240);
    };

    const next = (): void => {
      if (line >= lines.length) {
        timer = window.setTimeout(finish, 420);
        return;
      }
      pre.textContent = (pre.textContent ?? "") + lines[line] + "\n";
      if (line % 2 === 0) sound.play("key");
      line += 1;
      timer = window.setTimeout(next, line === 1 ? 260 : 110 + Math.random() * 90);
    };

    document.addEventListener("keydown", finish);
    overlay.addEventListener("click", finish);
    timer = window.setTimeout(next, 180);
  });
}
