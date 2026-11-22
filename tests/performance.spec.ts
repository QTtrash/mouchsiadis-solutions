import { expect, test } from "@playwright/test";

// The terminal view must not repaint the screen while idle. A moving refresh
// band over the CRT glass (November 2026) re-rasterized it every frame and
// dropped the view to about 14 fps; decorative motion may animate only
// transform or opacity on small elements (docs/visual-design.md).
test.beforeEach(async ({}, testInfo) => {
  test.skip(
    testInfo.project.name !== "desktop",
    "one trace at desktop size is enough",
  );
});

for (const path of ["/en/", "/en/#software-work"]) {
  test(`${path}: the idle terminal does not repaint the glass`, async ({
    page,
    context,
  }) => {
    await page.addInitScript(() => {
      try {
        sessionStorage.setItem("terminalPowered", "1");
      } catch {
        /* the power-on beam is skipped either way */
      }
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(path, { waitUntil: "networkidle" });
    await expect(page.locator("html")).toHaveAttribute("data-view", "terminal");
    await expect(page.locator(".terminal-glass")).toHaveCSS(
      "animation-name",
      "none",
    );
    expect(
      await page
        .locator(".terminal-glass")
        .evaluate(
          (element) => getComputedStyle(element, "::before").animationName,
        ),
    ).toBe("none");
    await page.waitForTimeout(600);

    const cdp = await context.newCDPSession(page);
    const events: Array<{ name: string; dur?: number }> = [];
    cdp.on("Tracing.dataCollected", (event) =>
      events.push(
        ...(event.value as unknown as Array<{ name: string; dur?: number }>),
      ),
    );
    const complete = new Promise((resolve) =>
      cdp.once("Tracing.tracingComplete", resolve),
    );
    await cdp.send("Tracing.start", {
      categories: "devtools.timeline,disabled-by-default-devtools.timeline",
      transferMode: "ReportEvents",
    });
    await page.waitForTimeout(1500);
    await cdp.send("Tracing.end");
    await complete;

    const paints = events.filter((event) => event.name === "Paint").length;
    const rasterMs =
      events
        .filter((event) => event.name === "RasterTask")
        .reduce((sum, event) => sum + (event.dur ?? 0), 0) / 1000;
    expect(paints, "paints during 1.5 s of idle").toBeLessThanOrEqual(5);
    expect(rasterMs, "raster milliseconds during 1.5 s of idle").toBeLessThan(
      150,
    );
  });
}
