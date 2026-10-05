// Copy-address buttons beside every visible email address. mailto: links can do
// nothing without a mail client, so the address itself stays selectable text and
// the button only appears when scripting is available.
document.querySelectorAll<HTMLButtonElement>("[data-copy-email]").forEach((button) => {
  const address = button.parentElement?.querySelector<HTMLElement>("[data-email-address]");
  if (!address) return;
  const label = button.textContent ?? "";
  let reset = 0;
  button.hidden = false;
  button.addEventListener("click", async () => {
    const text = address.textContent?.trim() ?? "";
    try {
      await navigator.clipboard.writeText(text);
      button.textContent = button.dataset.copied ?? label;
      window.clearTimeout(reset);
      reset = window.setTimeout(() => (button.textContent = label), 1600);
    } catch {
      // Clipboard access can be refused; select the address so it can be copied by hand.
      const range = document.createRange();
      range.selectNodeContents(address);
      const selection = window.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range);
    }
  });
});
