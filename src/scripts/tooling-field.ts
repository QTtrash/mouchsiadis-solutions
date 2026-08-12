import * as THREE from "three";
import { SoundEngine } from "./sound";

const host = document.querySelector<HTMLElement>("[data-instrument-vault]");
const canvas = host?.querySelector<HTMLCanvasElement>("canvas");
const entries = Array.from(host?.querySelectorAll<HTMLElement>("[data-vault-entry]") ?? []);
const numberReadout = host?.querySelector<HTMLElement>("[data-vault-number]");
const nameReadout = host?.querySelector<HTMLElement>("[data-vault-name]");
const soundButton = host?.querySelector<HTMLButtonElement>("[data-vault-sound]");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compact = window.matchMedia("(max-width: 680px)").matches;
const sound = new SoundEngine();

const syncSound = () => {
  if (!soundButton) return;
  const prefix = soundButton.textContent?.split(" ")[0] || "SND";
  soundButton.textContent = `${prefix} ${sound.enabled ? "ON" : "OFF"}`;
  soundButton.setAttribute("aria-pressed", String(sound.enabled));
};
soundButton?.addEventListener("click", () => { sound.setEnabled(!sound.enabled); syncSound(); });
syncSound();

function frame(width: number, height: number, depth: number, material: THREE.Material) {
  return new THREE.LineSegments(
    new THREE.EdgesGeometry(new THREE.BoxGeometry(width, height, depth)),
    material,
  );
}

function replayLattice(copper: THREE.Material, ivory: THREE.Material) {
  const group = new THREE.Group();
  for (let ringIndex = 0; ringIndex < 5; ringIndex += 1) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(1.1 + ringIndex * .38, .012, 5, 90), ringIndex === 2 ? copper : ivory);
    ring.rotation.x = Math.PI / 2 + ringIndex * .04;
    group.add(ring);
  }
  const ticks: THREE.Vector3[] = [];
  for (let index = 0; index < 48; index += 1) {
    const angle = index / 48 * Math.PI * 2;
    const inner = index % 4 === 0 ? 2.4 : 2.55;
    ticks.push(new THREE.Vector3(Math.cos(angle) * inner, 0, Math.sin(angle) * inner), new THREE.Vector3(Math.cos(angle) * 2.78, 0, Math.sin(angle) * 2.78));
  }
  group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ticks), copper));
  const playhead = new THREE.Mesh(new THREE.BoxGeometry(.06, .85, .06), copper);
  playhead.position.set(0, .46, -1.45);
  group.add(playhead);
  return group;
}

function sealedRelay(copper: THREE.Material, ivory: THREE.Material, dark: THREE.Material) {
  const group = new THREE.Group();
  const desktop = frame(2.1, 1.25, .16, ivory);
  desktop.position.set(-2.4, .2, 0);
  desktop.rotation.y = .3;
  const relay = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.4, 1.1), dark);
  relay.add(frame(1.12, 2.42, 1.12, copper));
  const phone = frame(.9, 1.8, .14, ivory);
  phone.position.set(2.25, .25, 0);
  phone.rotation.y = -.3;
  group.add(desktop, relay, phone);
  const path = new THREE.Line(
    new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.35, .2, 0), new THREE.Vector3(-.55, .2, 0), new THREE.Vector3(.55, .2, 0), new THREE.Vector3(1.78, .2, 0)]),
    copper,
  );
  group.add(path);
  return group;
}

function ledgerGauge(copper: THREE.Material, ivory: THREE.Material, dark: THREE.Material) {
  const group = new THREE.Group();
  const dial = new THREE.Mesh(new THREE.TorusGeometry(2.15, .035, 8, 96, Math.PI * 1.55), ivory);
  dial.rotation.z = Math.PI * .72;
  const hub = new THREE.Mesh(new THREE.CylinderGeometry(.17, .17, .22, 16), dark);
  hub.rotation.x = Math.PI / 2;
  const needle = new THREE.Mesh(new THREE.BoxGeometry(.045, 1.8, .04), copper);
  needle.position.y = .85;
  needle.rotation.z = -.64;
  const bars = new THREE.Group();
  [1.1, 1.65, 2.25, 1.82, 2.7].forEach((height, index) => {
    const bar = frame(.28, height, .28, index === 4 ? copper : ivory);
    bar.position.set(-1.65 + index * .82, height / 2 - 2.1, -.5);
    bars.add(bar);
  });
  group.add(dial, hub, needle, bars);
  return group;
}

function balanceJournal(copper: THREE.Material, ivory: THREE.Material, dark: THREE.Material) {
  const group = new THREE.Group();
  const pages = new THREE.Group();
  for (let index = 0; index < 7; index += 1) {
    const page = new THREE.Mesh(new THREE.BoxGeometry(3.4, .035, 2.15), index === 6 ? dark : ivory);
    page.position.y = index * .075 - .65;
    page.rotation.y = (index - 3) * .025;
    pages.add(page);
  }
  const stem = new THREE.Mesh(new THREE.BoxGeometry(.07, 2.3, .07), copper);
  stem.position.y = .55;
  const beam = new THREE.Mesh(new THREE.BoxGeometry(3.5, .06, .06), copper);
  beam.position.y = 1.65;
  beam.rotation.z = -.08;
  const left = new THREE.Mesh(new THREE.CylinderGeometry(.72, .72, .04, 36), dark);
  left.rotation.x = Math.PI / 2;
  left.position.set(-1.35, .65, 0);
  const right = left.clone();
  right.position.set(1.35, .92, 0);
  group.add(pages, stem, beam, left, right);
  return group;
}

function scanGate(copper: THREE.Material, ivory: THREE.Material) {
  const group = new THREE.Group();
  const gate = frame(2.8, 3.4, .55, copper);
  gate.position.y = .3;
  group.add(gate);
  for (let index = 0; index < 7; index += 1) {
    const document = frame(1.45, 1.9, .025, index === 3 ? copper : ivory);
    document.position.set(0, .25, -3 + index);
    document.rotation.x = -.08;
    group.add(document);
  }
  const railPoints = [new THREE.Vector3(-1.1, -1.2, -3.8), new THREE.Vector3(-1.1, -1.2, 3.8), new THREE.Vector3(1.1, -1.2, -3.8), new THREE.Vector3(1.1, -1.2, 3.8)];
  group.add(new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(railPoints), ivory));
  return group;
}

if (host && canvas && !reduced && !compact && entries.length) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: false, antialias: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x090908, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, .1, 100);
    camera.position.set(6.8, 4.4, 13.5);
    camera.lookAt(1.6, 0, 0);
    scene.add(new THREE.HemisphereLight(0xe8e1d2, 0x080807, 1.7));
    const light = new THREE.DirectionalLight(0xd77a3f, 3.4);
    light.position.set(-4, 7, 6);
    scene.add(light);

    const copper = new THREE.MeshBasicMaterial({ color: 0xd77a3f, transparent: true, opacity: .9 });
    const copperLine = new THREE.LineBasicMaterial({ color: 0xd77a3f, transparent: true, opacity: .8 });
    const ivoryLine = new THREE.LineBasicMaterial({ color: 0x8d877c, transparent: true, opacity: .62 });
    const dark = new THREE.MeshStandardMaterial({ color: 0x11100d, roughness: .42, metalness: .68 });
    const groups = [
      replayLattice(copperLine, ivoryLine),
      sealedRelay(copperLine, ivoryLine, dark),
      ledgerGauge(copperLine, ivoryLine, dark),
      balanceJournal(copper, ivoryLine, dark),
      scanGate(copperLine, ivoryLine),
    ];
    groups.forEach((group, index) => {
      group.position.set(1.7, 0, 0);
      group.userData.targetScale = index === 0 ? 1 : 0;
      group.scale.setScalar(index === 0 ? 1 : .001);
      scene.add(group);
    });

    let active = 0;
    let pointerX = 0;
    let pointerY = 0;
    let visible = true;
    let frameId = 0;
    const startedAt = performance.now();

    const select = (index: number, audible = true) => {
      if (index === active || !entries[index]) return;
      active = index;
      groups.forEach((group, groupIndex) => { group.userData.targetScale = groupIndex === index ? 1 : 0; });
      entries.forEach((entry, entryIndex) => entry.classList.toggle("is-active", entryIndex === index));
      if (numberReadout) numberReadout.textContent = String(index + 1).padStart(2, "0");
      if (nameReadout) nameReadout.textContent = entries[index].querySelector("h2")?.textContent?.toUpperCase() ?? "INSTRUMENT";
      if (audible) sound.play("acquire", index);
    };

    const resize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
    };
    const onPointer = (event: PointerEvent) => {
      pointerX = event.clientX / innerWidth - .5;
      pointerY = event.clientY / innerHeight - .5;
    };

    const entryObserver = new IntersectionObserver((records) => {
      const nearest = records.filter((record) => record.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (nearest) select(Number((nearest.target as HTMLElement).dataset.toolIndex));
    }, { rootMargin: "-34% 0px -34% 0px", threshold: [0, .2, .5, .8] });
    entries.forEach((entry, index) => {
      entryObserver.observe(entry);
      entry.addEventListener("pointerenter", () => select(index));
      entry.addEventListener("focusin", () => select(index));
    });
    const vaultObserver = new IntersectionObserver(([record]) => {
      visible = record.isIntersecting;
      if (visible && !frameId) frameId = requestAnimationFrame(render);
    }, { threshold: .01 });
    vaultObserver.observe(host);

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    addEventListener("pointermove", onPointer, { passive: true });

    const clock = new THREE.Clock();
    function render() {
      if (!visible || document.hidden) { frameId = 0; return; }
      const elapsed = clock.getElapsedTime();
      const arrival = Math.min(1, (performance.now() - startedAt) / 1350);
      const ease = 1 - Math.pow(1 - arrival, 4);
      groups.forEach((group, index) => {
        const target = group.userData.targetScale as number;
        const scale = THREE.MathUtils.lerp(group.scale.x, target || .001, .1);
        group.scale.setScalar(scale);
        group.rotation.y += index === active ? .003 : .001;
        group.rotation.x = Math.sin(elapsed * .23 + index) * .035;
      });
      camera.position.x = 6.8 + pointerX * .42;
      camera.position.y = 4.4 - pointerY * .3;
      camera.position.z = THREE.MathUtils.lerp(18, 9.4, ease);
      camera.lookAt(1.7, 0, 0);
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    }

    resize();
    canvas.classList.add("is-ready");
    sound.play("vault");
    frameId = requestAnimationFrame(render);

    document.addEventListener("astro:before-swap", () => {
      cancelAnimationFrame(frameId);
      entryObserver.disconnect();
      vaultObserver.disconnect();
      resizeObserver.disconnect();
      removeEventListener("pointermove", onPointer);
      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.LineLoop || child instanceof THREE.LineSegments)) return;
        child.geometry.dispose();
        const materials = Array.isArray(child.material) ? child.material : [child.material];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
    }, { once: true });
  } catch {
    canvas.hidden = true;
  }
}
