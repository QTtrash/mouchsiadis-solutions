import * as THREE from "three";
import { SoundEngine } from "./sound";

const host = document.querySelector<HTMLElement>("[data-instrument-vault]");
const canvas = host?.querySelector<HTMLCanvasElement>("canvas");
const entries = Array.from(host?.querySelectorAll<HTMLElement>("[data-vault-entry]") ?? []);
const selectors = Array.from(host?.querySelectorAll<HTMLButtonElement>("[data-vault-select]") ?? []);
const numberReadout = host?.querySelector<HTMLElement>("[data-vault-number]");
const nameReadout = host?.querySelector<HTMLElement>("[data-vault-name]");
const soundButton = host?.querySelector<HTMLButtonElement>("[data-vault-sound]");
const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const compact = window.matchMedia("(max-width: 720px)").matches;
const sound = new SoundEngine();

const landmarks = [
  new THREE.Vector3(-3.8, 0, 2.2),
  new THREE.Vector3(-1.6, 0, -.8),
  new THREE.Vector3(.7, 0, 1.6),
  new THREE.Vector3(2.4, 0, -1.5),
  new THREE.Vector3(4.1, 0, .8),
];

const terrainHeight = (x: number, z: number) => {
  const ridge = Math.sin(x * .73) * .28 + Math.cos(z * .88) * .22 + Math.sin((x + z) * 1.27) * .11;
  const authored = landmarks.reduce((total, point, index) => {
    const distance = Math.hypot(x - point.x, z - point.z);
    const influence = Math.exp(-distance * distance * (index === 3 ? .42 : .29));
    return total + influence * ([.48, .72, .36, -.24, .58][index] ?? .4);
  }, 0);
  return ridge + authored;
};

const syncSound = () => {
  if (!soundButton) return;
  const prefix = soundButton.textContent?.split(" ")[0] || "SND";
  soundButton.textContent = `${prefix} ${sound.enabled ? "ON" : "OFF"}`;
  soundButton.setAttribute("aria-pressed", String(sound.enabled));
};
soundButton?.addEventListener("click", () => { sound.setEnabled(!sound.enabled); syncSound(); });
syncSound();

let selectVisual: ((index: number) => void) | null = null;
const select = (index: number, audible = false) => {
  if (!entries[index] || !selectors[index]) return;
  entries.forEach((entry, entryIndex) => entry.classList.toggle("is-active", entryIndex === index));
  selectors.forEach((selector, selectorIndex) => {
    const active = selectorIndex === index;
    selector.classList.toggle("is-active", active);
    selector.setAttribute("aria-pressed", String(active));
  });
  if (numberReadout) numberReadout.textContent = String(index + 1).padStart(2, "0");
  if (nameReadout) nameReadout.textContent = entries[index].querySelector("h2")?.textContent?.toUpperCase() ?? "INSTRUMENT";
  selectVisual?.(index);
  if (audible) sound.play("acquire", index);
};

host?.classList.add("is-enhanced");
selectors.forEach((selector, index) => {
  selector.addEventListener("click", () => select(index, true));
  selector.addEventListener("pointerenter", () => select(index));
  selector.addEventListener("focus", () => select(index));
  selector.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowDown" && event.key !== "ArrowRight" && event.key !== "ArrowUp" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const direction = event.key === "ArrowDown" || event.key === "ArrowRight" ? 1 : -1;
    const next = (index + direction + selectors.length) % selectors.length;
    selectors[next]?.focus();
  });
});

function makeLine(points: THREE.Vector3[], color: number, opacity = .75) {
  return new THREE.Line(
    new THREE.BufferGeometry().setFromPoints(points),
    new THREE.LineBasicMaterial({ color, transparent: true, opacity }),
  );
}

function traced(points: Array<[number, number]>, lift = .035) {
  return points.map(([x, z]) => new THREE.Vector3(x, terrainHeight(x, z) + lift, z));
}

function landmarkMotif(index: number) {
  const center = landmarks[index];
  const group = new THREE.Group();
  group.userData.materials = [] as THREE.LineBasicMaterial[];
  const add = (points: Array<[number, number]>, opacity = .55) => {
    const line = makeLine(traced(points), 0xd77a3f, opacity);
    (group.userData.materials as THREE.LineBasicMaterial[]).push(line.material as THREE.LineBasicMaterial);
    group.add(line);
  };

  if (index === 0) {
    for (let arm = 0; arm < 3; arm += 1) {
      add(Array.from({ length: 54 }, (_, step) => {
        const angle = step * .17 + arm * 2.08;
        const radius = .06 + step * .018;
        return [center.x + Math.cos(angle) * radius, center.z + Math.sin(angle) * radius];
      }));
    }
  } else if (index === 1) {
    add([[center.x - 1.05, center.z + .48], [center.x - .55, center.z + .15], [center.x, center.z], [center.x + .65, center.z - .36], [center.x + 1.15, center.z - .15]]);
    add([[center.x, center.z], [center.x + .45, center.z + .56], [center.x + .95, center.z + .68]], .4);
  } else if (index === 2) {
    for (let level = 0; level < 5; level += 1) {
      const width = .34 + level * .17;
      add(Array.from({ length: 25 }, (_, step) => {
        const t = step / 24 * Math.PI;
        return [center.x + Math.cos(t) * width, center.z + Math.sin(t) * width * .48 - level * .07];
      }), .34 + level * .05);
    }
  } else if (index === 3) {
    add(Array.from({ length: 70 }, (_, step) => {
      const t = step / 69 * Math.PI * 2;
      return [center.x + Math.sin(t) * .86, center.z + Math.sin(t * 2) * .38];
    }));
  } else {
    for (let gate = -2; gate <= 2; gate += 1) {
      add([[center.x + gate * .25, center.z - .7], [center.x + gate * .25, center.z + .7]], .28 + (gate === 0 ? .35 : 0));
    }
    add([[center.x - .8, center.z], [center.x + .8, center.z]], .7);
  }
  return group;
}

if (host && canvas && entries.length && !reduced && !compact) {
  try {
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    renderer.setClearColor(0x090908, 1);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x090908, .042);
    const camera = new THREE.PerspectiveCamera(36, 1, .1, 100);
    camera.position.set(7.8, 7.3, 10.8);

    const terrainGeometry = new THREE.PlaneGeometry(12, 8.6, 96, 72);
    const positions = terrainGeometry.attributes.position as THREE.BufferAttribute;
    for (let index = 0; index < positions.count; index += 1) positions.setZ(index, terrainHeight(positions.getX(index), positions.getY(index)));
    terrainGeometry.computeVertexNormals();
    const terrainMaterial = new THREE.ShaderMaterial({
      uniforms: { uCopper: { value: new THREE.Color(0xd77a3f) } },
      vertexShader: `varying float vHeight; varying vec3 vNormalView; varying vec3 vLocal; void main(){ vHeight=position.z; vLocal=position; vNormalView=normalize(normalMatrix*normal); gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
      fragmentShader: `varying float vHeight; varying vec3 vNormalView; varying vec3 vLocal; uniform vec3 uCopper; void main(){ float light=clamp(dot(vNormalView,normalize(vec3(-.35,.78,.5)))*.5+.48,0.,1.); vec3 base=mix(vec3(.025,.024,.020),vec3(.105,.098,.078),light); float phase=abs(fract((vHeight+.08)*6.8)-.5); float contour=1.-smoothstep(.0,.045,phase); float grid=(1.-smoothstep(.0,.025,abs(fract((vLocal.x+6.)*.5)-.5)))*.055; vec3 color=mix(base,uCopper,contour*.22)+grid; gl_FragColor=vec4(color,1.); }`,
    });
    const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
    terrain.rotation.x = -Math.PI / 2;
    terrain.position.set(1.65, -1.25, 0);
    scene.add(terrain);

    const routeCurve = new THREE.CatmullRomCurve3(landmarks.map((point) => new THREE.Vector3(point.x, terrainHeight(point.x, point.z) + .08, point.z)), false, "catmullrom", .22);
    const route = makeLine(routeCurve.getPoints(180), 0x7b4a2e, .68);
    route.position.copy(terrain.position);
    scene.add(route);

    const motifs = landmarks.map((_, index) => {
      const motif = landmarkMotif(index);
      motif.position.copy(terrain.position);
      scene.add(motif);
      return motif;
    });

    const beaconGeometry = new THREE.BufferGeometry();
    const beaconPositions = new Float32Array(landmarks.length * 3);
    landmarks.forEach((point, index) => {
      beaconPositions[index * 3] = point.x + terrain.position.x;
      beaconPositions[index * 3 + 1] = terrainHeight(point.x, point.z) + terrain.position.y + .12;
      beaconPositions[index * 3 + 2] = point.z;
    });
    beaconGeometry.setAttribute("position", new THREE.BufferAttribute(beaconPositions, 3));
    const beacons = new THREE.Points(beaconGeometry, new THREE.PointsMaterial({ color: 0xe8e1d2, size: .12, sizeAttenuation: true, transparent: true, opacity: .88 }));
    scene.add(beacons);

    const packet = new THREE.Mesh(new THREE.OctahedronGeometry(.085, 0), new THREE.MeshBasicMaterial({ color: 0xd77a3f }));
    packet.position.copy(routeCurve.getPointAt(0)).add(terrain.position);
    scene.add(packet);

    let active = 0;
    let targetLook = landmarks[0].clone().add(terrain.position);
    let currentLook = targetLook.clone();
    let pointerX = 0;
    let pointerY = 0;
    let visible = true;
    let frameId = 0;
    selectVisual = (index) => {
      active = index;
      targetLook = landmarks[index].clone().add(terrain.position);
      motifs.forEach((motif, motifIndex) => {
        (motif.userData.materials as THREE.LineBasicMaterial[]).forEach((material) => { material.opacity = motifIndex === index ? .92 : .18; });
      });
    };
    selectVisual(0);

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
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    addEventListener("pointermove", onPointer, { passive: true });
    const visibilityObserver = new IntersectionObserver(([record]) => {
      visible = record.isIntersecting;
      if (visible && !frameId) frameId = requestAnimationFrame(render);
    }, { threshold: .01 });
    visibilityObserver.observe(host);

    const clock = new THREE.Clock();
    const desiredCamera = new THREE.Vector3();
    function render() {
      if (!visible || document.hidden) { frameId = 0; return; }
      const elapsed = clock.getElapsedTime();
      currentLook.lerp(targetLook, .045);
      desiredCamera.set(currentLook.x + 5.6 + pointerX * .35, 5.8 - pointerY * .22, currentLook.z + 7.8);
      camera.position.lerp(desiredCamera, .04);
      camera.lookAt(currentLook.x, currentLook.y - .18, currentLook.z);
      const travel = (elapsed * .055 + active * .2) % 1;
      packet.position.copy(routeCurve.getPointAt(travel)).add(terrain.position);
      packet.rotation.y += .035;
      motifs[active].position.y = terrain.position.y + Math.sin(elapsed * 1.4) * .012;
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(render);
    }

    resize();
    canvas.classList.add("is-ready");
    frameId = requestAnimationFrame(render);

    document.addEventListener("astro:before-swap", () => {
      cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
      removeEventListener("pointermove", onPointer);
      scene.traverse((child) => {
        if (!(child instanceof THREE.Mesh || child instanceof THREE.Line || child instanceof THREE.Points)) return;
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
