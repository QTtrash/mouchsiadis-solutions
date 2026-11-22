// The fitted console enhances native section links. Continuous layouts retain
// document scrolling and expose the complete archive, including after resize.
import { SoundEngine } from "./sound";

const PANEL_ALIASES: Record<string, string> = { cv: "contact" };
const POWER_KEY = "terminalPowered";

// One decorative power-on beam per session. It overlays the already rendered
// glass, so content and actions are never delayed or hidden.
// Pulling the header switch always boots the glass (force), even if this session
// already saw the power-on. The Simple view never powers on.
function powerOn(terminal: HTMLElement, force = false): void {
  const root = document.documentElement;
  const reduced =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches || root.dataset.effects === "reduced";
  if (reduced || root.dataset.view !== "terminal") return;
  try {
    if (!force && sessionStorage.getItem(POWER_KEY)) return;
    sessionStorage.setItem(POWER_KEY, "1");
  } catch {
    if (!force) return;
  }
  terminal.classList.remove("terminal-console--power-on");
  void terminal.offsetWidth;
  terminal.classList.add("terminal-console--power-on", "terminal-console--booting");
  window.setTimeout(() => terminal.classList.remove("terminal-console--power-on"), 900);
  // The status line shows a short POST before the window list returns.
  window.setTimeout(() => terminal.classList.remove("terminal-console--booting"), 1400);
}

// tmux-style status line: the active window follows the panel; a clock in
// Munich time updates each minute. Decorative and hidden from assistive tech.
function initStatusLine(terminal: HTMLElement): void {
  const status = terminal.querySelector<HTMLElement>("[data-tmux]");
  if (!status) return;
  const windows = Array.from(status.querySelectorAll<HTMLElement>("[data-tmux-window]"));
  const clock = status.querySelector<HTMLElement>("[data-tmux-clock]");
  const sync = () => {
    const active = terminal.querySelector<HTMLAnchorElement>("[data-terminal-tab].is-active");
    const id = active?.hash.slice(1) ?? "overview";
    windows.forEach((item) => item.classList.toggle("is-active", item.dataset.tmuxWindow === id));
  };
  const format = new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Berlin" });
  const tick = () => {
    if (clock) clock.textContent = format.format(new Date());
  };
  terminal.addEventListener("terminal-panel-change", sync);
  tick();
  window.setInterval(tick, 30_000);
  sync();
}

export function initTerminal(): void {
  const terminal = document.querySelector<HTMLElement>("[data-terminal-console]");
  if (!terminal) return;
  const tabs = Array.from(terminal.querySelectorAll<HTMLAnchorElement>("[data-terminal-tab]"));
  const panels = Array.from(terminal.querySelectorAll<HTMLElement>("[data-terminal-panel]"));
  const validIds = new Set(panels.map((panel) => panel.id));
  // The fitted console is a terminal-view enhancement; the Simple view always flows.
  const fittedQuery = window.matchMedia("(min-width: 1120px) and (min-height: 720px)");
  const fitted = {
    get matches(): boolean {
      return fittedQuery.matches && document.documentElement.dataset.view === "terminal";
    },
  };
  const sound = new SoundEngine();
  const resolve = (id: string): string => {
    const target = PANEL_ALIASES[id] ?? id;
    return validIds.has(target) ? target : "overview";
  };
  let activeId = resolve(location.hash.slice(1));

  const showPanel = (id: string, resetScroll = true): void => {
    activeId = resolve(id);
    const nextPanel = panels.find((panel) => panel.id === activeId)!;
    const origin = document.activeElement?.closest<HTMLElement>("[data-terminal-panel]");
    const moveFocus = fitted.matches && origin && origin !== nextPanel;
    panels.forEach((panel) => {
      const visible = !fitted.matches || panel === nextPanel;
      panel.hidden = false;
      panel.classList.toggle("is-active", visible);
      panel.inert = !visible;
      if (visible) panel.removeAttribute("aria-hidden");
      else panel.setAttribute("aria-hidden", "true");
    });
    tabs.forEach((tab) => {
      const active = tab.hash === `#${activeId}`;
      tab.classList.toggle("is-active", active);
      if (active) tab.setAttribute("aria-current", "location");
      else tab.removeAttribute("aria-current");
    });
    terminal.dispatchEvent(new CustomEvent("terminal-panel-change", { bubbles: true }));
    if (fitted.matches && resetScroll) nextPanel.scrollTop = 0;
    if (moveFocus) {
      const heading = nextPanel.querySelector<HTMLElement>("h1, h2");
      heading?.setAttribute("tabindex", "-1");
      heading?.focus({ preventScroll: true });
    }
  };

  const syncLayout = (changed = false): void => {
    terminal.classList.toggle("terminal-console--continuous", !fitted.matches);
    terminal.classList.add("terminal-console--ready");
    showPanel(location.hash.slice(1) || activeId, changed);
    if (!changed) return;
    requestAnimationFrame(() => {
      if (fitted.matches) window.scrollTo({ top: 0, behavior: "instant" });
      else if (activeId !== "overview") {
        document.getElementById(activeId)?.scrollIntoView({ block: "start", behavior: "instant" });
      }
    });
  };

  document.addEventListener("click", (event) => {
    if (!fitted.matches || event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = (event.target as Element).closest<HTMLAnchorElement>("a[href]");
    if (!link || link.target || link.hasAttribute("download")) return;
    const destination = new URL(link.href, location.href);
    if (destination.origin !== location.origin || destination.pathname !== location.pathname || destination.search !== location.search || !destination.hash) return;
    const id = destination.hash.slice(1);
    if (!validIds.has(PANEL_ALIASES[id] ?? id)) return;
    event.preventDefault();
    showPanel(id);
    if (location.hash !== `#${activeId}`) history.pushState(null, "", `#${activeId}`);
    sound.play("tab", tabs.findIndex((tab) => tab.hash === `#${activeId}`));
  });

  window.addEventListener("hashchange", () => {
    showPanel(location.hash.slice(1), fitted.matches);
    if (fitted.matches) window.scrollTo({ top: 0, behavior: "instant" });
  });
  fittedQuery.addEventListener("change", () => syncLayout(true));
  window.addEventListener("interface-view-change", (event) => {
    syncLayout(true);
    if ((event as CustomEvent<string>).detail === "terminal") {
      powerOn(terminal, true);
      sound.play("boot");
    }
  });
  tabs.forEach((tab) => {
    tab.addEventListener("mouseenter", () => sound.play("key"));
    tab.addEventListener("focus", () => sound.play("key"));
  });
  terminal.querySelectorAll(".archive-entry summary").forEach((summary) => {
    summary.addEventListener("click", () => sound.play("detail"));
  });
  syncLayout();
  initStatusLine(terminal);
  powerOn(terminal);
  // A direct fragment URL selects a panel; it must not scroll the outer frame
  // to the absolute-positioned panel after the document finishes loading.
  window.addEventListener("load", () => {
    if (fitted.matches && location.hash) window.scrollTo({ top: 0, behavior: "instant" });
  }, { once: true });
}

initTerminal();
