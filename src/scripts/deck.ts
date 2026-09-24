// Card deck controller: Cards/List view switch, card flipping, and
// drag-to-reader on fine pointers. Every interaction here has a plain
// equivalent in the markup: the List view and each card's "Open case file" link.

import { SoundEngine } from "./sound";

type View = "cards" | "list";

const VIEW_KEY = "deckView";
const DRAG_THRESHOLD = 6;

const decks = Array.from(document.querySelectorAll<HTMLElement>("[data-deck]"));
const sound = new SoundEngine();
const reduced = (): boolean =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
  document.documentElement.dataset.effects === "reduced";
const canDrag = window.matchMedia("(pointer: fine) and (min-width: 1120px) and (min-height: 720px)").matches;

function readView(): View {
  try {
    return localStorage.getItem(VIEW_KEY) === "list" ? "list" : "cards";
  } catch {
    return "cards";
  }
}

function writeView(view: View): void {
  try {
    localStorage.setItem(VIEW_KEY, view);
  } catch {
    // The choice then lasts for this page only.
  }
}

function applyView(view: View): void {
  decks.forEach((deck) => {
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

function resetReader(deck: HTMLElement): void {
  const reader = deck.querySelector<HTMLElement>("[data-card-reader]");
  const status = reader?.querySelector<HTMLElement>("[data-reader-status]");
  reader?.classList.remove("is-armed", "is-reading");
  if (status) status.textContent = status.dataset.idle ?? "";
}

function resetCard(card: HTMLElement): void {
  card.getAnimations().forEach((animation) => animation.cancel());
  card.style.translate = "";
  card.classList.remove("is-dragging", "is-played");
}

function enableDrag(deck: HTMLElement): void {
  const hand = deck.querySelector<HTMLElement>("[data-card-hand]");
  const reader = deck.querySelector<HTMLElement>("[data-card-reader]");
  const status = reader?.querySelector<HTMLElement>("[data-reader-status]");
  const announcer = deck.querySelector<HTMLElement>("[data-deck-announcer]");
  if (!hand || !reader || !status) return;

  deck.classList.add("is-draggable");
  if (!reduced()) deck.classList.add("is-fanned");

  let drag: { card: HTMLElement; x: number; y: number; active: boolean; over: boolean } | null = null;
  let tilted: HTMLElement | null = null;

  // Hovered cards lean up to 6 degrees toward the pointer.
  const tilt = (event: PointerEvent): void => {
    if (reduced()) return;
    const body = (event.target as Element).closest<HTMLElement>(".deck-card__body");
    if (tilted && tilted !== body) {
      tilted.style.removeProperty("--tilt-x");
      tilted.style.removeProperty("--tilt-y");
    }
    tilted = body;
    if (!body) return;
    const rect = body.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    body.style.setProperty("--tilt-x", `${(x * 12).toFixed(1)}deg`);
    body.style.setProperty("--tilt-y", `${(-y * 12).toFixed(1)}deg`);
  };
  hand.addEventListener("pointerleave", () => {
    tilted?.style.removeProperty("--tilt-x");
    tilted?.style.removeProperty("--tilt-y");
    tilted = null;
  });

  const overReader = (event: PointerEvent): boolean => {
    const rect = reader.getBoundingClientRect();
    return (
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom
    );
  };

  const play = (card: HTMLElement): void => {
    const href = card.dataset.href;
    const title = card.dataset.title ?? "";
    if (!href) return;
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
    // Seat the card in the reader, then navigate; the art morphs into the case file.
    const cardRect = card.getBoundingClientRect();
    const readerRect = reader.getBoundingClientRect();
    const dx = readerRect.left + readerRect.width / 2 - (cardRect.left + cardRect.width / 2);
    const dy = readerRect.top + readerRect.height / 2 - (cardRect.top + cardRect.height / 2);
    const [x, y] = (card.style.translate || "0px 0px").split(" ").map((value) => Number.parseFloat(value) || 0);
    card
      .animate(
        [
          { translate: `${x}px ${y}px`, scale: "1" },
          { translate: `${x + dx}px ${y + dy}px`, scale: "0.62" },
        ],
        { duration: 180, easing: "cubic-bezier(.3,.7,.2,1)", fill: "forwards" },
      )
      .finished.then(() => window.location.assign(href))
      .catch(() => window.location.assign(href));
  };

  const release = (card: HTMLElement): void => {
    const from = card.style.translate;
    card.style.translate = "";
    card.classList.remove("is-dragging");
    reader.classList.remove("is-armed");
    if (from && !reduced()) {
      card.animate([{ translate: from }, { translate: "0px 0px" }], {
        duration: 200,
        easing: "cubic-bezier(.2,.8,.2,1)",
      });
    }
  };

  hand.addEventListener("pointerdown", (event) => {
    if (event.button !== 0 || !event.isPrimary) return;
    const target = event.target as Element;
    if (target.closest("a, button")) return;
    const card = target.closest<HTMLElement>("[data-card]");
    if (!card || card.classList.contains("is-played")) return;
    drag = { card, x: event.clientX, y: event.clientY, active: false, over: false };
    card.setPointerCapture(event.pointerId);
  });

  hand.addEventListener("pointermove", (event) => {
    if (!drag) {
      tilt(event);
      return;
    }
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (!drag.active) {
      if (Math.hypot(dx, dy) < DRAG_THRESHOLD) return;
      drag.active = true;
      drag.card.classList.add("is-dragging");
      sound.play("key");
    }
    drag.card.style.translate = `${dx}px ${dy}px`;
    const over = overReader(event);
    if (over !== drag.over) {
      drag.over = over;
      reader.classList.toggle("is-armed", over);
      if (over) sound.play("detail");
    }
  });

  const finish = (event: PointerEvent): void => {
    if (!drag) return;
    const { card, active } = drag;
    const dropped = active && event.type === "pointerup" && overReader(event);
    drag = null;
    // A drag must not also count as a click-to-flip.
    if (active) {
      deck.dataset.suppressClick = "true";
      window.setTimeout(() => delete deck.dataset.suppressClick, 0);
    }
    if (dropped) play(card);
    else if (active) release(card);
  };
  hand.addEventListener("pointerup", finish);
  hand.addEventListener("pointercancel", finish);
}

decks.forEach((deck) => {
  deck.classList.add("is-enhanced");
  deck.querySelectorAll<HTMLButtonElement>("[data-deck-view]").forEach((button) => {
    button.addEventListener("click", () => {
      const view = button.dataset.deckView === "list" ? "list" : "cards";
      writeView(view);
      applyView(view);
      sound.play("tab");
    });
  });
  const flip = (card: HTMLElement): void => {
    setFlipped(card, !card.classList.contains("is-flipped"));
    sound.play("detail");
  };
  deck.querySelectorAll<HTMLButtonElement>("[data-card-flip]").forEach((button) => {
    button.addEventListener("click", () => {
      const card = button.closest<HTMLElement>("[data-card]");
      if (card) flip(card);
    });
  });
  // Clicking or tapping the card itself flips it too; the Flip button is the keyboard route.
  deck.addEventListener("click", (event) => {
    if (deck.dataset.suppressClick) return;
    // With pointer capture the click lands on the card itself rather than its body.
    const target = event.target as Element;
    if (target.closest("a, button, .deck-card__actions")) return;
    const card = target.closest<HTMLElement>("[data-card]");
    if (card && !card.classList.contains("is-played")) flip(card);
  });
  if (canDrag) enableDrag(deck);
});

applyView(readView());

// The hero avatar is a card too: flip between the pixel sprite and the photo.
document.querySelectorAll<HTMLButtonElement>("[data-avatar-flip]").forEach((button) => {
  button.addEventListener("click", () => {
    button.setAttribute("aria-pressed", String(button.getAttribute("aria-pressed") !== "true"));
    sound.play("detail");
  });
});

// Coming back from a case file restores this page from the back/forward cache
// with the played card still seated in the reader.
window.addEventListener("pageshow", (event) => {
  if (!event.persisted) return;
  decks.forEach((deck) => {
    resetReader(deck);
    deck.querySelectorAll<HTMLElement>("[data-card]").forEach(resetCard);
  });
});
