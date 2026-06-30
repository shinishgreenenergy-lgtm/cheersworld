"use client";

// Real WebGL 3D brain for the hero. Model: "Brain" by Poly by Google (CC-BY 3.0),
// via poly.pizza — attribution in /public/CREDITS.txt. Low-poly (~3k tris, 200 KB),
// lit with the five wellness-dimension colours so it stays on-brand. Loaded only on
// the client (ssr:false from the wrapper) and only when WebGL is available.
// Surrounded by an orbiting neuron point-field + great-circle rings (in-scene, so they
// interleave with the brain at the correct depth).

import { Suspense, useMemo, useRef } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeVertices, mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";

const DIM_COLORS = ["#14b8a6", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

// Small seeded RNG so the nerve tangle is identical every render/reload.
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// Pull a point back inside the brain-interior ellipsoid if it strays out.
function clampEllipsoid(p: THREE.Vector3, a: number, b: number, c: number) {
  const v = (p.x * p.x) / (a * a) + (p.y * p.y) / (b * b) + (p.z * p.z) / (c * c);
  if (v > 1) p.multiplyScalar(1 / Math.sqrt(v));
}

// Red nerve filaments meandering through the brain's interior (visible through the glass).
function Nerves() {
  const geometry = useMemo(() => {
    const rng = mulberry32(20260701);
    const A = 1.02, B = 0.72, C = 0.92; // interior ellipsoid (fits inside the 2.5-unit brain)
    const tubes: THREE.TubeGeometry[] = [];
    for (let i = 0; i < 18; i++) {
      const pts: THREE.Vector3[] = [];
      const p = new THREE.Vector3((rng() - 0.5) * 0.7, (rng() - 0.5) * 0.6, (rng() - 0.5) * 0.7);
      const dir = new THREE.Vector3(rng() - 0.5, rng() - 0.5, rng() - 0.5).normalize().multiplyScalar(0.34);
      const steps = 5 + Math.floor(rng() * 4);
      for (let k = 0; k < steps; k++) {
        pts.push(p.clone());
        dir.add(new THREE.Vector3((rng() - 0.5) * 0.34, (rng() - 0.5) * 0.34, (rng() - 0.5) * 0.34));
        p.add(dir);
        clampEllipsoid(p, A, B, C);
      }
      const curve = new THREE.CatmullRomCurve3(pts, false, "catmullrom", 0.5);
      tubes.push(new THREE.TubeGeometry(curve, 50, 0.012 + rng() * 0.016, 6, false));
    }
    return mergeGeometries(tubes, false);
  }, []);

  const material = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: new THREE.Color("#e10f1f"),
        emissive: new THREE.Color("#ff1126"),
        emissiveIntensity: 1.5,
        roughness: 0.5,
        metalness: 0,
      }),
    [],
  );

  return <mesh geometry={geometry} material={material} />;
}

// Generate a neutral studio environment at runtime (no external HDR file) so the
// glass material has something to reflect/refract. Keeps the bundle lean.
function StudioEnv() {
  const { gl, scene } = useThree();
  useMemo(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    return () => pmrem.dispose();
  }, [gl, scene]);
  return null;
}

function Brain() {
  const gltf = useLoader(GLTFLoader, "/brain-model.glb");
  const ref = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const s = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scale = 2.5 / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    // Frosted-glass material — translucent with soft refraction + a subtle brand tint.
    // The frosting (roughness) blurs the refraction, which also hides the low-poly
    // facets so the brain reads as smooth glass. A glossy clearcoat keeps highlights crisp.
    const glass = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ffffff"),
      transmission: 0.96,
      thickness: 0.9,
      ior: 1.3,
      roughness: 0.28,
      metalness: 0,
      clearcoat: 1,
      clearcoatRoughness: 0.12,
      attenuationColor: new THREE.Color("#cfd6ff"),
      attenuationDistance: 2.6,
      iridescence: 0.28,
      iridescenceIOR: 1.3,
      transparent: true,
      envMapIntensity: 1.2,
    });

    s.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        // Weld coincident vertices then recompute normals → smooth (non-faceted) shading.
        let g = m.geometry;
        g.deleteAttribute("normal");
        g = mergeVertices(g, 1e-4);
        g.computeVertexNormals();
        m.geometry = g;
        m.material = glass;
      }
    });
    return s;
  }, [gltf]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });

  return (
    <group ref={ref}>
      {/* nerves first so the frosted glass shell renders over them */}
      <Nerves />
      <primitive object={model} />
    </group>
  );
}

// Soft round sprite for the neuron dots (opaque centre → transparent edge).
function useDotTexture() {
  return useMemo(() => {
    const s = 64;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(255,255,255,1)");
    g.addColorStop(0.4, "rgba(255,255,255,0.85)");
    g.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const tex = new THREE.CanvasTexture(c);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

const COUNT = 64;
const RADIUS = 2.65;

function NeuronField() {
  const ref = useRef<THREE.Group>(null);
  const tex = useDotTexture();

  // Fibonacci-sphere positions + per-dimension colours.
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);
    const golden = Math.PI * (3 - Math.sqrt(5));
    const col = new THREE.Color();
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const rad = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const r = RADIUS * (0.9 + ((i * 13) % 7) / 40);
      positions[i * 3] = Math.cos(theta) * rad * r;
      positions[i * 3 + 1] = y * r;
      positions[i * 3 + 2] = Math.sin(theta) * rad * r;
      col.set(DIM_COLORS[i % DIM_COLORS.length]);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }
    return { positions, colors };
  }, []);

  // Three faint great-circle rings on different axes.
  const ring = useMemo(() => {
    const seg = 128;
    const arr = new Float32Array((seg + 1) * 3);
    for (let i = 0; i <= seg; i++) {
      const a = (i / seg) * Math.PI * 2;
      arr[i * 3] = Math.cos(a) * RADIUS;
      arr[i * 3 + 1] = 0;
      arr[i * 3 + 2] = Math.sin(a) * RADIUS;
    }
    return arr;
  }, []);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.16;
  });

  return (
    <group ref={ref}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          sizeAttenuation
          vertexColors
          map={tex}
          transparent
          depthWrite={false}
          alphaTest={0.01}
        />
      </points>

      {[
        [Math.PI / 2, 0, 0],
        [Math.PI / 2, 0, Math.PI / 3],
        [Math.PI / 2, 0, (2 * Math.PI) / 3],
      ].map((rot, i) => (
        <lineLoop key={i} rotation={rot as [number, number, number]}>
          <bufferGeometry>
            <bufferAttribute attach="attributes-position" args={[ring, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color="#1b2a44" transparent opacity={0.12} />
        </lineLoop>
      ))}
    </group>
  );
}

export function BrainScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <StudioEnv />
      <ambientLight intensity={0.55} />
      <hemisphereLight args={["#ffffff", "#cfd6e6", 0.4]} />
      <directionalLight position={[3, 4, 5]} intensity={1.15} />
      {/* five coloured rim lights — one per wellness dimension */}
      {DIM_COLORS.map((c, i) => {
        const a = (i / DIM_COLORS.length) * Math.PI * 2;
        return (
          <pointLight
            key={c}
            color={c}
            intensity={14}
            distance={11}
            position={[Math.cos(a) * 3.2, Math.sin(a) * 2.4, Math.sin(a * 1.3) * 3.2]}
          />
        );
      })}
      <group rotation={[-0.16, 0, 0]}>
        <NeuronField />
        <Suspense fallback={null}>
          <Brain />
        </Suspense>
      </group>
    </Canvas>
  );
}
