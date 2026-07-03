// Field-terminal controller: panel switching, boot sequence, decode effects,
// and the opt-in sound engine. Runs on the landing page only.

import { hasBooted, runBoot } from "./boot";
import { decodeText, typeText } from "./decode";
import { SoundEngine } from "./sound";

export function initTerminal(): void {
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  const terminal = document.querySelector<HTMLElement>("[data-terminal-console]");
  const content = terminal?.querySelector<HTMLElement>(".terminal-console__content") ?? null;
  const tabs = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-terminal-tab]"));
  const panels = Array.from(document.querySelectorAll<HTMLElement>("[data-terminal-panel]"));
  const soundButtons = Array.from(document.querySelectorAll<HTMLButtonElement>("[data-terminal-sound]"));
  const validIds = new Set(panels.map((panel) => panel.dataset.terminalPanel));
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const sound = new SoundEngine();
  let activeId = "overview";
  let transitionTimer = 0;

  const keepPageAtTerminal = (): void => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  };

  const syncSoundButton = (): void => {
    terminal?.classList.toggle("terminal-console--sound-on", sound.enabled);
    soundButtons.forEach((button) => {
      button.textContent = sound.enabled ? "snd on" : "snd off";
      button.setAttribute("aria-pressed", String(sound.enabled));
    });
  };

  const decodePanelHeading = (panel: HTMLElement): void => {
    if (reduceMotion) return;
    const heading = panel.querySelector<HTMLElement>(".section-heading h2, h1");
    if (!heading) return;
    sound.play("decode");
    decodeText(heading);
  };

  const finishTransition = (previousPanel: HTMLElement | undefined, nextPanel: HTMLElement): void => {
    if (previousPanel && previousPanel !== nextPanel) {
      previousPanel.classList.remove("is-leaving", "is-active");
      previousPanel.hidden = true;
    }
    nextPanel.classList.remove("is-entering");
  };

  const showPanel = (id: string, updateHash = true, initial = false): void => {
    const nextId = validIds.has(id) ? id : "overview";
    const nextPanel = panels.find((panel) => panel.dataset.terminalPanel === nextId);
    const previousPanel = panels.find(
      (panel) => panel.dataset.terminalPanel === activeId && !panel.hidden,
    );

    if (!nextPanel) return;
    if (nextId === activeId && !initial) {
      sound.play("error");
      keepPageAtTerminal();
      return;
    }

    window.clearTimeout(transitionTimer);
    activeId = nextId;

    panels.forEach((panel) => {
      const isActive = panel.dataset.terminalPanel === nextId;
      if (isActive) {
        panel.hidden = false;
        panel.classList.add("is-active");
        if (!initial && !reduceMotion) {
          panel.classList.add("is-entering");
        }
        panel.scrollTop = 0;
      } else if (panel === previousPanel && !initial && !reduceMotion) {
        panel.classList.add("is-leaving");
      } else {
        panel.hidden = true;
        panel.classList.remove("is-active", "is-entering", "is-leaving");
      }
    });

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
      decodePanelHeading(nextPanel);
      if (!reduceMotion) {
        terminal?.classList.remove("terminal-console--switching");
        void terminal?.offsetWidth;
        terminal?.classList.add("terminal-console--switching");
        window.setTimeout(() => terminal?.classList.remove("terminal-console--switching"), 560);
      }
    }

    if (previousPanel && previousPanel !== nextPanel && !reduceMotion) {
      transitionTimer = window.setTimeout(() => finishTransition(previousPanel, nextPanel), 280);
    } else {
      finishTransition(previousPanel, nextPanel);
    }

    keepPageAtTerminal();
    requestAnimationFrame(keepPageAtTerminal);
    setTimeout(keepPageAtTerminal, 80);
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

  window.addEventListener("hashchange", () => showPanel(window.location.hash.replace("#", ""), false));

  const heroTitle = document.querySelector<HTMLElement>(".hero-panel h1");
  const typeHeroTitle = (): void => {
    if (reduceMotion || !heroTitle || activeId !== "overview") return;
    const text = heroTitle.textContent ?? "";
    typeText(heroTitle, text, 16);
  };

  const wake = (): void => {
    syncSoundButton();
    showPanel(window.location.hash.replace("#", ""), false, true);
    requestAnimationFrame(() => terminal?.classList.add("terminal-console--ready"));
  };

  const langLabel = terminal?.dataset.terminalLang ?? "EN";
  if (!reduceMotion && !hasBooted() && content) {
    terminal?.classList.add("terminal-console--booting");
    wake();
    void runBoot(content, langLabel, sound).then(() => {
      terminal?.classList.remove("terminal-console--booting");
      typeHeroTitle();
    });
  } else {
    wake();
  }
}

initTerminal();
