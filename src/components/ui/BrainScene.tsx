"use client";

// Real WebGL 3D brain for the hero. Model: "Brain" by Poly by Google (CC-BY 3.0),
// via poly.pizza — attribution in /public/CREDITS.txt. Low-poly (~3k tris, 200 KB).
// Rendered as a natural, organic brain (pink-grey tissue, soft realistic lighting),
// surrounded by an orbiting neuron point-field + great-circle rings (in-scene, so they
// interleave with the brain at the correct depth). Client-only (ssr:false from wrapper).

import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { mergeVertices } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";

const DIM_COLORS = ["#14b8a6", "#3b82f6", "#ef4444", "#f59e0b", "#8b5cf6"];

// Soft studio reflections at runtime (no external HDR) — gives the moist clearcoat
// something subtle to reflect. Runs once when the canvas is created (the generated
// env texture lives for the lifetime of the WebGL context).
function setupStudioEnv({ gl, scene }: { gl: THREE.WebGLRenderer; scene: THREE.Scene }) {
  const pmrem = new THREE.PMREMGenerator(gl);
  // Sharper env (low blur sigma) so the chrome band shows crisp studio reflections.
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.01).texture;
  pmrem.dispose();
  // Filmic tone-mapping + full-quality output for a photographic, high-res finish.
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.05;
}

// Subtle blurred-noise bump → organic, skin-like surface micro-detail on the low-poly mesh.
function useBumpTexture() {
  return useMemo(() => {
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const img = ctx.createImageData(s, s);
    // Deterministic xorshift32 PRNG — keeps render pure and the texture stable
    // across re-renders (Math.random is impure during render).
    let seed = 0x2f6e2b1;
    const rand = () => {
      seed ^= seed << 13;
      seed ^= seed >>> 17;
      seed ^= seed << 5;
      return (seed >>> 0) / 4294967296;
    };
    for (let i = 0; i < s * s; i++) {
      const v = 128 + (rand() * 2 - 1) * 64;
      img.data[i * 4] = img.data[i * 4 + 1] = img.data[i * 4 + 2] = v;
      img.data[i * 4 + 3] = 255;
    }
    ctx.putImageData(img, 0, 0);
    ctx.filter = "blur(1.5px)";
    ctx.drawImage(c, 0, 0);
    ctx.filter = "none";
    const tex = new THREE.CanvasTexture(c);
    tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
    tex.repeat.set(5, 5);
    return tex;
  }, []);
}

function Brain() {
  const gltf = useLoader(GLTFLoader, "/brain-model.glb");
  const ref = useRef<THREE.Group>(null);
  const bump = useBumpTexture();

  const model = useMemo(() => {
    const s = gltf.scene.clone(true);
    const box = new THREE.Box3().setFromObject(s);
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);
    const scale = 2.9 / Math.max(size.x, size.y, size.z);
    s.scale.setScalar(scale);
    s.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    // Calm, mindful green — soft, gently glossy tissue with a faint inner glow.
    const mat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#37b06a"),
      roughness: 0.42,
      metalness: 0.1,
      clearcoat: 0.55,
      clearcoatRoughness: 0.3,
      sheen: 0.4,
      sheenColor: new THREE.Color("#a7f0c4"),
      envMapIntensity: 0.9,
      emissive: new THREE.Color("#0f7a44"),
      emissiveIntensity: 0.16,
      bumpMap: bump,
      bumpScale: 0.4,
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
        m.material = mat;
      }
    });
    return s;
  }, [gltf, bump]);

  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.3;
  });

  return (
    <group ref={ref}>
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
  // Render frames only while the hero is actually on screen. Without this the
  // scene burns GPU/CPU on every frame for the whole session, long after the
  // user has scrolled past it — the single biggest scroll-perf cost on the page.
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(true);
  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => setVisible(entries.some((e) => e.isIntersecting)),
      { rootMargin: "80px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={wrapRef} className="h-full w-full">
    <Canvas
      camera={{ position: [0, 0, 5], fov: 42 }}
      dpr={[1, 2]}
      frameloop={visible ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={setupStudioEnv}
    >
      {/* realistic, mostly-neutral lighting so the brain's own colour reads */}
      <ambientLight intensity={0.45} />
      <hemisphereLight args={["#ffffff", "#e9d8d0", 0.5]} />
      <directionalLight position={[3, 5, 4]} intensity={1.6} color="#fff4ea" />
      <directionalLight position={[-4, -1, -2]} intensity={0.5} color="#cfe0ff" />
      {/* two restrained brand accents for depth (not a rainbow wash) */}
      <pointLight color="#14b8a6" intensity={5} distance={10} position={[-3.2, 1.6, 2.4]} />
      <pointLight color="#f59e0b" intensity={4} distance={10} position={[3.2, -1.4, 1.8]} />
      <group rotation={[-0.16, 0, 0]}>
        <NeuronField />
        <Suspense fallback={null}>
          <Brain />
        </Suspense>
      </group>
    </Canvas>
    </div>
  );
}
