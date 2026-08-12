import * as THREE from "three";

const host = document.querySelector<HTMLElement>("[data-tooling-field]");
const canvas = host?.querySelector<HTMLCanvasElement>("canvas");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (host && canvas && !reduced) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, .1, 100);
    camera.position.set(0, 5.7, 8.5);
    camera.lookAt(0, 0, 0);
    const points: THREE.Vector3[] = [];
    const size = 8;
    const divisions = 22;
    for (let i = 0; i <= divisions; i += 1) {
      const offset = -size / 2 + size * i / divisions;
      for (let j = 0; j < divisions; j += 1) {
        const a = -size / 2 + size * j / divisions;
        const b = -size / 2 + size * (j + 1) / divisions;
        points.push(new THREE.Vector3(a, Math.sin(a * .8 + offset) * .16, offset), new THREE.Vector3(b, Math.sin(b * .8 + offset) * .16, offset));
        points.push(new THREE.Vector3(offset, Math.cos(a * .7 + offset) * .16, a), new THREE.Vector3(offset, Math.cos(b * .7 + offset) * .16, b));
      }
    }
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color: 0xbd7b4b, transparent: true, opacity: .48 });
    const field = new THREE.LineSegments(geometry, material);
    field.rotation.x = -.25;
    scene.add(field);
    let pointerX = 0;
    let pointerY = 0;
    let visible = true;
    const resize = () => { const { width, height } = host.getBoundingClientRect(); renderer.setSize(width, height, false); camera.aspect = width / Math.max(height, 1); camera.updateProjectionMatrix(); };
    const onPointer = (event: PointerEvent) => { const bounds = host.getBoundingClientRect(); pointerX = (event.clientX - bounds.left) / bounds.width - .5; pointerY = (event.clientY - bounds.top) / bounds.height - .5; };
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) requestAnimationFrame(render); }, { threshold: .05 });
    let framePending = false;
    const render = (time: number) => { framePending = false; if (!visible) return; field.rotation.z = Math.sin(time * .00008) * .04 + pointerX * .08; field.rotation.x = -.25 + pointerY * .05; renderer.render(scene, camera); framePending = true; requestAnimationFrame(render); };
    resize();
    observer.observe(host);
    host.addEventListener("pointermove", onPointer, { passive: true });
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(host);
    requestAnimationFrame(render);
    document.addEventListener("astro:before-swap", () => { observer.disconnect(); resizeObserver.disconnect(); host.removeEventListener("pointermove", onPointer); geometry.dispose(); material.dispose(); renderer.dispose(); framePending = false; }, { once: true });
  } catch { canvas.hidden = true; }
}
