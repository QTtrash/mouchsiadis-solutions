// Flat, readable project cards with optional mouse/pen drag to the reader.
// Native links, the Flip button, and List provide equivalent access.
import { SoundEngine } from "./sound";

type View = "cards" | "list";
const VIEW_KEY = "deckView";
const DRAG_THRESHOLD = 8;
const decks = Array.from(document.querySelectorAll<HTMLElement>("[data-deck]"));
const sound = new SoundEngine();
const dragMedia = window.matchMedia("(pointer: fine) and (min-width: 1120px) and (min-height: 720px)");
const motionMedia = window.matchMedia("(prefers-reduced-motion: reduce)");
const reduced = (): boolean => motionMedia.matches || document.documentElement.dataset.effects === "reduced";
const controllers = new Map<HTMLElement, () => void>();

function readView(): View {
  try { return localStorage.getItem(VIEW_KEY) === "list" ? "list" : "cards"; }
  catch { return "cards"; }
}

function applyView(view: View): void {
  decks.forEach((deck) => {
    controllers.get(deck)?.();
    deck.dataset.view = view;
    deck.querySelector<HTMLElement>("[data-deck-cards]")!.hidden = view === "list";
    deck.querySelector<HTMLElement>("[data-deck-list]")!.hidden = view !== "list";
    deck.querySelectorAll<HTMLButtonElement>("[data-deck-view]").forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.deckView === view));
    });
  });
}

function setFlipped(card: HTMLElement, flipped: boolean): void {
  card.classList.toggle("is-flipped", flipped);
  card.querySelector("[data-card-flip]")?.setAttribute("aria-pressed", String(flipped));
  const front = card.querySelector<HTMLElement>('[data-card-face="front"]');
  const back = card.querySelector<HTMLElement>('[data-card-face="back"]');
  if (front) front.inert = flipped;
  if (back) back.inert = !flipped;
}

function enhanceDeck(deck: HTMLElement): void {
  const hand = deck.querySelector<HTMLElement>("[data-card-hand]")!;
  const reader = deck.querySelector<HTMLElement>("[data-card-reader]")!;
  const status = reader.querySelector<HTMLElement>("[data-reader-status]")!;
  const announcer = deck.querySelector<HTMLElement>("[data-deck-announcer]");
  let gesture: { card: HTMLElement; pointerId: number; x: number; y: number; moved: boolean; draggable: boolean } | null = null;
  let suppressUntil = 0;
  let navigation = 0;
  let tiltFrame = 0;
  let tilted: HTMLElement | null = null;
  const clearTilt = (): void => {
    cancelAnimationFrame(tiltFrame);
    tiltFrame = 0;
    tilted?.classList.remove("is-tracking");
    tilted?.style.removeProperty("--tilt-x");
    tilted?.style.removeProperty("--tilt-y");
    tilted = null;
  };

  const reset = (): void => {
    navigation += 1;
    clearTilt();
    if (gesture?.moved) suppressUntil = performance.now() + 400;
    const previous = gesture;
    gesture = null;
    if (previous?.card.hasPointerCapture(previous.pointerId)) previous.card.releasePointerCapture(previous.pointerId);
    reader.classList.remove("is-armed", "is-reading");
    status.textContent = status.dataset.idle ?? "";
    deck.querySelectorAll<HTMLElement>("[data-card]").forEach((card) => {
      card.getAnimations().forEach((animation) => animation.cancel());
      card.style.translate = "";
      card.classList.remove("is-dragging", "is-played");
    });
  };
  controllers.set(deck, reset);

  const overReader = (event: PointerEvent): boolean => {
    const rect = reader.getBoundingClientRect();
    return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
  };

  const play = (card: HTMLElement): void => {
    const href = card.dataset.href;
    if (!href) return;
    const title = card.dataset.title ?? "";
    const attempt = ++navigation;
    card.classList.remove("is-dragging");
    card.classList.add("is-played");
    reader.classList.remove("is-armed");
    reader.classList.add("is-reading");
    status.textContent = (status.dataset.reading ?? "").replace("{title}", title);
    if (announcer) announcer.textContent = (announcer.dataset.template ?? "").replace("{title}", title);
    sound.play("acquire");
    if (reduced()) {
      window.location.assign(href);
      return;
    }
    const from = card.getBoundingClientRect();
    const to = reader.getBoundingClientRect();
    const [x, y] = (card.style.translate || "0px 0px").split(" ").map((value) => Number.parseFloat(value) || 0);
    card.animate([
      { translate: `${x}px ${y}px`, scale: "1" },
      { translate: `${x + to.left + to.width / 2 - from.left - from.width / 2}px ${y + to.top + to.height / 2 - from.top - from.height / 2}px`, scale: "0.62" },
    ], { duration: 180, easing: "cubic-bezier(.3,.7,.2,1)", fill: "forwards" }).finished
      .then(() => { if (attempt === navigation) window.location.assign(href); })
      .catch(() => { /* A resize, preference change, or cancelled gesture must not navigate. */ });
  };

  hand.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || !event.isPrimary) return;
    const target = event.target as Element;
    if (target.closest("a, button")) return;
    const card = target.closest<HTMLElement>("[data-card]");
    if (!card || card.classList.contains("is-played")) return;
    suppressUntil = 0;
    clearTilt();
    gesture = { card, pointerId: event.pointerId, x: event.clientX, y: event.clientY, moved: false, draggable: dragMedia.matches && event.pointerType !== "touch" };
  });
  hand.addEventListener("pointerleave", clearTilt);
  hand.addEventListener("pointermove", (event) => {
    if (!gesture) {
      if (!dragMedia.matches || reduced() || event.pointerType === "touch") return;
      const body = (event.target as Element).closest<HTMLElement>(".deck-card__body");
      if (tilted !== body) clearTilt();
      tilted = body;
      if (!body || tiltFrame) return;
      tiltFrame = requestAnimationFrame(() => {
        tiltFrame = 0;
        const bounds = body.getBoundingClientRect();
        body.classList.add("is-tracking");
        body.style.setProperty("--tilt-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 6}deg`);
        body.style.setProperty("--tilt-y", `${-((event.clientY - bounds.top) / bounds.height - 0.5) * 6}deg`);
      });
      return;
    }
    if (gesture.pointerId !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    if (!gesture.moved) {
      gesture.moved = true;
      if (gesture.draggable) {
        gesture.card.setPointerCapture(event.pointerId);
        gesture.card.classList.add("is-dragging");
        sound.play("key");
      }
    }
    if (!gesture.draggable) return;
    gesture.card.style.translate = `${dx}px ${dy}px`;
    reader.classList.toggle("is-armed", overReader(event));
  });
  const finish = (event: PointerEvent): void => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const previous = gesture;
    gesture = null;
    if (previous.card.hasPointerCapture(event.pointerId)) previous.card.releasePointerCapture(event.pointerId);
    if (previous.moved || event.type === "pointercancel") suppressUntil = performance.now() + 400;
    if (previous.moved && previous.draggable && event.type === "pointerup" && overReader(event)) play(previous.card);
    else {
      const from = previous.card.style.translate;
      previous.card.style.translate = "";
      previous.card.classList.remove("is-dragging");
      reader.classList.remove("is-armed");
      if (from && !reduced()) previous.card.animate([{ translate: from }, { translate: "0px 0px" }], { duration: 160, easing: "ease-out" });
    }
  };
  hand.addEventListener("pointerup", finish);
  hand.addEventListener("pointercancel", finish);
  hand.addEventListener("lostpointercapture", finish);
  deck.addEventListener("click", (event) => {
    if (performance.now() < suppressUntil) return;
    const target = event.target as Element;
    if (target.closest("a, button, .deck-card__actions")) return;
    const card = target.closest<HTMLElement>("[data-card]");
    if (card && !card.classList.contains("is-played")) {
      setFlipped(card, !card.classList.contains("is-flipped"));
      sound.play("detail");
    }
  });
  deck.querySelectorAll<HTMLButtonElement>("[data-card-flip]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest<HTMLElement>("[data-card]")!;
      setFlipped(card, !card.classList.contains("is-flipped"));
      sound.play("detail");
    });
  });
  deck.querySelectorAll<HTMLButtonElement>("[data-deck-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.deckView === "list" ? "list" : "cards";
      try { localStorage.setItem(VIEW_KEY, view); } catch { /* Page-local preference remains usable. */ }
      applyView(view);
      sound.play("tab");
    });
  });
  deck.classList.add("is-enhanced");
}

decks.forEach(enhanceDeck);
function syncInput(): void {
  decks.forEach((deck) => {
    controllers.get(deck)?.();
    deck.classList.toggle("is-draggable", dragMedia.matches);
    deck.dataset.motion = reduced() ? "reduced" : "system";
  });
}
document.addEventListener("terminal-panel-change", () => controllers.forEach((reset) => reset()));
dragMedia.addEventListener("change", syncInput);
motionMedia.addEventListener("change", syncInput);
new MutationObserver(syncInput).observe(document.documentElement, { attributes: true, attributeFilter: ["data-effects"] });
syncInput();
applyView(readView());

document.querySelectorAll<HTMLButtonElement>("[data-avatar-flip]").forEach((button) => {
  button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    sound.play("detail");
  });
});
window.addEventListener("pageshow", (event) => {
  if (event.persisted) syncInput();
});
