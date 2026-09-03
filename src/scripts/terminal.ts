// Field-terminal controller: desktop panel switching, fast opacity transitions,
// and the opt-in sound engine. Runs on the landing page only.

import { typeText } from "./decode";
import { SoundEngine } from "./sound";

export function initTerminal(): void {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const terminal = document.querySelector<HTMLElement>("[data-terminal-console]");
  const tabs = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-terminal-tab]"));
  const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-terminal-panel]"));
  const soundButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-terminal-sound]"));
  const validIds = new Set(panels.map((panel) => panel.dataset.terminalPanel));
  const reduceMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    document.documentElement.dataset.effects === "reduced";
  const enhanced = window.matchMedia(
    "(min-width: 1120px) and (min-height: 720px)",
  ).matches;
  const sound = new SoundEngine();
  let activeId = "overview";

  const syncSoundButton = (): void => {
    terminal?.classList.toggle("terminal-console--sound-on", sound.enabled);
    soundButtons.forEach((button) => {
      button.textContent = sound.enabled ? "snd on" : "snd off";
      button.setAttribute("aria-pressed", String(sound.enabled));
    });
  };

  const showPanel = (id: string, updateHash = true, initial = false): void => {
    const nextId = validIds.has(id) ? id : "overview";
    const nextPanel = panels.find((panel) => panel.dataset.terminalPanel === nextId);

    if (!nextPanel) return;
    if (nextId === activeId && !initial) {
      sound.play("error");
      return;
    }

    activeId = nextId;

    panels.forEach((panel) => {
      const isActive = panel.dataset.terminalPanel === nextId;
      panel.hidden = false;
      panel.classList.toggle("is-active", isActive);
      panel.inert = !isActive;
      if (isActive) {
        panel.removeAttribute("aria-hidden");
      } else {
        panel.setAttribute("aria-hidden", "true");
      }
    });

    nextPanel.scrollTop = 0;

    tabs.forEach((tab) => {
      const isActive = tab.hash === `#${nextId}`;
      tab.classList.toggle("is-active", isActive);
      if (isActive) {
        tab.setAttribute("aria-current", "page");
      } else {
        tab.removeAttribute("aria-current");
      }
    });

    if (updateHash && window.location.hash !== `#${nextId}`) {
      history.replaceState(null, "", `#${nextId}`);
    }

    if (!initial) {
      sound.play("tab", tabs.findIndex((tab) => tab.hash === `#${nextId}`));
    }
  };

  const handleLink = (event: Event): void => {
    const target = event.currentTarget as HTMLAnchorElement;
    const href = target.getAttribute("href") ?? "#overview";
    const id = href.replace("#", "");
    if (!validIds.has(id)) return;
    event.preventDefault();
    showPanel(id);
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", handleLink);
    tab.addEventListener("mouseenter", () => sound.play("key"));
    tab.addEventListener("focus", () => sound.play("key"));
  });
  document
    .querySelectorAll<HTMLAnchorElement>("[data-terminal-jump]")
    .forEach((link) => link.addEventListener("click", handleLink));
  soundButtons.forEach((button) =>
    button.addEventListener("click", () => {
      sound.setEnabled(!sound.enabled);
      syncSoundButton();
    }),
  );
  document.querySelectorAll<HTMLElement>(".archive-entry summary").forEach((summary) => {
    summary.addEventListener("click", () => sound.play("detail"));
  });

  if (!enhanced) {
    terminal?.classList.add("terminal-console--continuous", "terminal-console--ready");
    panels.forEach((panel) => {
      panel.hidden = false;
      panel.classList.add("is-active");
      panel.inert = false;
      panel.removeAttribute("aria-hidden");
    });
    syncSoundButton();
    return;
  }

  window.addEventListener("hashchange", () => showPanel(window.location.hash.replace("#", ""), false));

  const heroTitle = document.querySelector<HTMLElement>(".hero-panel h1");
  const typeHeroTitle = (): void => {
    if (reduceMotion || !heroTitle || activeId !== "overview") return;
    const text = heroTitle.textContent ?? "";
    typeText(heroTitle, text, 16);
  };

  syncSoundButton();
  showPanel(window.location.hash.replace("#", ""), false, true);
  requestAnimationFrame(() => {
    terminal?.classList.add("terminal-console--ready");
    typeHeroTitle();
  });
}

initTerminal();
