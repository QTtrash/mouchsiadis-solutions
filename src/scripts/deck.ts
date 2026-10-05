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

type ReaderState = "idle" | "carrying" | "armed" | "reading" | "cancelled";
type Gesture = {
  card: HTMLElement;
  pointerId: number;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  angle: string;
  moved: boolean;
  draggable: boolean;
};
type DragVisual = {
  card: HTMLElement;
  preview: HTMLElement;
  feedback: HTMLElement;
  x: number;
  y: number;
  offsetX: number;
  offsetY: number;
  width: number;
  height: number;
  angle: string;
};

// A fanned card may rest at a slight angle. The preview keeps the card's layout
// size and angle, so it covers exactly what the visitor picked up.
function restingFrame(card: HTMLElement): { left: number; top: number; width: number; height: number; angle: string } {
  const bounds = card.getBoundingClientRect();
  const width = card.offsetWidth;
  const height = card.offsetHeight;
  const rotate = getComputedStyle(card).rotate;
  return {
    left: bounds.x + (bounds.width - width) / 2,
    top: bounds.y + (bounds.height - height) / 2,
    width,
    height,
    angle: rotate && rotate !== "none" ? rotate : "0deg",
  };
}

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
  const hint = reader.querySelector<HTMLElement>("[data-reader-hint]")!;
  const announcer = deck.querySelector<HTMLElement>("[data-deck-announcer]");
  let gesture: Gesture | null = null;
  let visual: DragVisual | null = null;
  let suppressPointerClick = false;
  let navigation = 0;
  let dragFrame = 0;
  let idleTimer = 0;
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

  const setState = (state: ReaderState, title = ""): void => {
    const message = (status.dataset[state] ?? "").replace("{title}", title);
    const changed = reader.dataset.state !== state || status.textContent !== message;
    if (!changed) return;
    reader.dataset.state = state;
    reader.classList.toggle("is-armed", state === "armed");
    reader.classList.toggle("is-reading", state === "reading");
    status.textContent = message;
    hint.textContent = state === "carrying" || state === "armed"
      ? hint.dataset.cancel ?? "" : hint.dataset.idle ?? "";
    if (visual) {
      visual.feedback.textContent = message;
      visual.feedback.dataset.state = state;
      visual.preview.dataset.state = state;
    }
    if (changed && announcer && state !== "idle") {
      announcer.textContent = state === "reading"
        ? (announcer.dataset.template ?? "").replace("{title}", title) : message;
    }
  };

  const removeVisual = (): void => {
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    if (!visual) return;
    visual.preview.getAnimations().forEach((animation) => animation.cancel());
    visual.preview.remove();
    visual.feedback.remove();
    visual.card.classList.remove("is-dragging", "is-played");
    visual = null;
  };

  const cancel = (animate = false, report = true): void => {
    navigation += 1;
    window.clearTimeout(idleTimer);
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    clearTilt();
    const previous = gesture;
    const returning = visual;
    const hadDrag = !!returning;
    if (previous?.moved || hadDrag) suppressPointerClick = true;
    gesture = null;
    if (previous?.card.hasPointerCapture(previous.pointerId)) previous.card.releasePointerCapture(previous.pointerId);
    setState(hadDrag && report ? "cancelled" : "idle", returning?.card.dataset.title);
    if (returning && animate && !reduced()) {
      const to = restingFrame(returning.card);
      returning.feedback.remove();
      returning.preview.animate([
        { transform: `translate(${returning.x - returning.offsetX}px, ${returning.y - returning.offsetY}px) rotate(${returning.angle})` },
        { transform: `translate(${to.left}px, ${to.top}px) rotate(${to.angle})` },
      ], { duration: 160, easing: "ease-out", fill: "forwards" }).finished
        .then(() => { if (visual === returning) removeVisual(); })
        .catch(() => { /* Another gesture or layout change removed the preview. */ });
    } else removeVisual();
    if (hadDrag && report) idleTimer = window.setTimeout(() => setState("idle"), 900);
  };
  controllers.set(deck, () => cancel());

  const overReader = (x: number, y: number): boolean => {
    const rect = reader.getBoundingClientRect();
    return rect.width > 0 && x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;
  };

  const renderDrag = (): void => {
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    if (!visual || !gesture) return;
    const { preview, feedback, x, y, offsetX, offsetY, angle, card } = visual;
    preview.style.transform = `translate(${x - offsetX}px, ${y - offsetY}px) rotate(${angle})`;
    setState(overReader(x, y) ? "armed" : "carrying", card.dataset.title);
    // The full-size card can cover the dock. Keep its instruction beside the
    // pointer and inside the viewport, including for tall translated cards.
    const badge = feedback.getBoundingClientRect();
    const left = Math.max(8, Math.min(x + 18, window.innerWidth - badge.width - 8));
    const top = Math.max(8, Math.min(y + 22, window.innerHeight - badge.height - 8));
    feedback.style.transform = `translate(${left}px, ${top}px)`;
  };
  const queueDrag = (): void => {
    if (gesture && visual && !dragFrame) dragFrame = requestAnimationFrame(renderDrag);
  };

  const lift = (current: Gesture, event: PointerEvent): void => {
    const clone = current.card.cloneNode(true) as HTMLElement;
    const preview = document.createElement("div");
    preview.className = `deck-card card-drag-preview${current.card.classList.contains("is-flipped") ? " is-flipped" : ""}`;
    preview.dataset.suit = current.card.dataset.suit;
    preview.append(...Array.from(clone.childNodes));
    for (const element of preview.querySelectorAll<HTMLElement>("*")) {
      for (const attribute of Array.from(element.attributes)) {
        if (attribute.name === "id" || attribute.name === "href" || attribute.name.startsWith("data-") || attribute.name.startsWith("aria-")) {
          element.removeAttribute(attribute.name);
        }
      }
      element.style.viewTransitionName = "none";
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
      element.classList.remove("is-tracking");
    }
    preview.dataset.dragPreview = "";
    preview.inert = true;
    preview.setAttribute("aria-hidden", "true");
    preview.style.width = `${current.width}px`;
    preview.style.height = `${current.height}px`;
    const feedback = document.createElement("div");
    feedback.className = "card-drag-feedback";
    feedback.dataset.dragFeedback = "";
    feedback.setAttribute("aria-hidden", "true");
    feedback.inert = true;
    document.body.append(preview, feedback);
    visual = { card: current.card, preview, feedback, x: event.clientX, y: event.clientY, offsetX: current.offsetX, offsetY: current.offsetY, width: current.width, height: current.height, angle: current.angle };
    current.card.setPointerCapture(event.pointerId);
    current.card.classList.add("is-dragging");
    renderDrag();
    sound.play("key");
  };

  const play = (card: HTMLElement): void => {
    const href = card.dataset.href;
    const seating = visual;
    if (!href || !seating) { cancel(); return; }
    const title = card.dataset.title ?? "";
    const attempt = ++navigation;
    card.classList.add("is-played");
    setState("reading", title);
    sound.play("acquire");
    if (reduced()) {
      removeVisual();
      window.location.assign(href);
      return;
    }
    const to = reader.getBoundingClientRect();
    seating.preview.animate([
      { transform: `translate(${seating.x - seating.offsetX}px, ${seating.y - seating.offsetY}px) rotate(${seating.angle}) scale(1)`, opacity: 1 },
      { transform: `translate(${to.x + to.width / 2 - seating.width / 2}px, ${to.y + to.height / 2 - seating.height / 2}px) rotate(0deg) scale(0.62)`, opacity: 0.35 },
    ], { duration: 180, easing: "cubic-bezier(.3,.7,.2,1)", fill: "forwards" }).finished
      .then(() => { if (attempt === navigation) window.location.assign(href); })
      .catch(() => { /* A resize, preference change, or cancelled gesture must not navigate. */ });
  };

  deck.addEventListener("pointerdown", () => {
    // A completed/cancelled gesture suppresses its click, however long the
    // pointer stays down. The next intentional press starts a fresh action.
    if (visual && !gesture) cancel(false, false);
    suppressPointerClick = false;
  }, true);
  hand.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || !event.isPrimary) return;
    const target = event.target as Element;
    if (target.closest("a, button")) return;
    const card = target.closest<HTMLElement>("[data-card]");
    if (!card || card.classList.contains("is-played")) return;
    cancel(false, false);
    const frame = restingFrame(card);
    gesture = { card, pointerId: event.pointerId, x: event.clientX, y: event.clientY, offsetX: event.clientX - frame.left, offsetY: event.clientY - frame.top, width: frame.width, height: frame.height, angle: frame.angle, moved: false, draggable: dragMedia.matches && event.pointerType !== "touch" };
  });
  hand.addEventListener("pointerleave", clearTilt);
  hand.addEventListener("pointermove", (event) => {
    if (!gesture && !visual) {
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
    }
  });
  window.addEventListener("pointermove", (event) => {
    if (!gesture) return;
    if (gesture.pointerId !== event.pointerId) return;
    const dx = event.clientX - gesture.x;
    const dy = event.clientY - gesture.y;
    if (!gesture.moved && Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
    if (!gesture.moved) {
      gesture.moved = true;
      if (gesture.draggable) lift(gesture, event);
    }
    if (!visual) return;
    visual.x = event.clientX;
    visual.y = event.clientY;
    queueDrag();
  });
  const finish = (event: PointerEvent): void => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const previous = gesture;
    if (previous.moved || event.type !== "pointerup") suppressPointerClick = true;
    if (event.type !== "pointerup" || !previous.moved || !previous.draggable || !overReader(event.clientX, event.clientY)) {
      cancel(event.type === "pointerup");
      return;
    }
    if (visual) {
      visual.x = event.clientX;
      visual.y = event.clientY;
      renderDrag();
    }
    gesture = null;
    cancelAnimationFrame(dragFrame);
    dragFrame = 0;
    if (previous.card.hasPointerCapture(event.pointerId)) previous.card.releasePointerCapture(event.pointerId);
    play(previous.card);
  };
  window.addEventListener("pointerup", finish);
  window.addEventListener("pointercancel", finish);
  hand.addEventListener("lostpointercapture", finish);
  document.addEventListener("scroll", queueDrag, true);
  deck.addEventListener("click", (event) => {
    if (suppressPointerClick && event.detail !== 0) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }, true);
  deck.addEventListener("click", (event) => {
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
window.addEventListener("resize", () => controllers.forEach((reset) => reset()));
window.addEventListener("blur", () => controllers.forEach((reset) => reset()));
window.addEventListener("pagehide", () => controllers.forEach((reset) => reset()));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" || event.key === "Tab") controllers.forEach((reset) => reset());
});
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
