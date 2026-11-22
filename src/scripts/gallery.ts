// Upgrades case-file galleries to a native <dialog> lightbox. The dialog owns
// focus while open; Escape and Close return focus to the opening tile.
for (const gallery of document.querySelectorAll<HTMLElement>("[data-gallery]")) {
  const dialog = gallery.querySelector<HTMLDialogElement>("[data-lightbox]");
  const image = gallery.querySelector<HTMLImageElement>("[data-lightbox-image]");
  const count = gallery.querySelector<HTMLElement>("[data-lightbox-count]");
  const tiles = Array.from(gallery.querySelectorAll<HTMLAnchorElement>("[data-gallery-open]"));
  if (!dialog || !image || typeof dialog.showModal !== "function") continue;
  let current = 0;
  let opener: HTMLElement | null = null;
  const show = (index: number) => {
    current = (index + tiles.length) % tiles.length;
    const tile = tiles[current]!;
    image.src = tile.dataset.full ?? tile.href;
    image.alt = tile.dataset.alt ?? "";
    if (count) {
      count.textContent = (count.dataset.template ?? "{n} / {total}")
        .replace("{n}", String(current + 1))
        .replace("{total}", String(tiles.length));
    }
  };
  tiles.forEach((tile, index) =>
    tile.addEventListener("click", (event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
      event.preventDefault();
      opener = tile;
      show(index);
      dialog.showModal();
    }),
  );
  const single = tiles.length < 2;
  gallery.querySelectorAll<HTMLButtonElement>("[data-lightbox-prev], [data-lightbox-next]").forEach((button) => {
    button.hidden = single;
  });
  gallery.querySelector("[data-lightbox-prev]")?.addEventListener("click", () => show(current - 1));
  gallery.querySelector("[data-lightbox-next]")?.addEventListener("click", () => show(current + 1));
  gallery.querySelector("[data-lightbox-close]")?.addEventListener("click", () => dialog.close());
  dialog.addEventListener("keydown", (event) => {
    if (single) return;
    if (event.key === "ArrowLeft") show(current - 1);
    if (event.key === "ArrowRight") show(current + 1);
  });
  // A click on the backdrop (the dialog element itself) closes it.
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });
  dialog.addEventListener("close", () => {
    image.removeAttribute("src");
    opener?.focus();
  });
}
