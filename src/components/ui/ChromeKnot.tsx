"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import * as THREE from "three";

// Studio reflections + filmic tone-mapping so the metal reads as polished chrome.
function setupEnv({ gl, scene }: { gl: THREE.WebGLRenderer; scene: THREE.Scene }) {
  const pmrem = new THREE.PMREMGenerator(gl);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.02).texture;
  pmrem.dispose();
  gl.toneMapping = THREE.ACESFilmicToneMapping;
  gl.toneMappingExposure = 1.1;
}

function Knot() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.4;
      ref.current.rotation.x += dt * 0.14;
    }
  });
  return (
    <mesh ref={ref}>
      <torusKnotGeometry args={[1.05, 0.44, 340, 48, 2, 3]} />
      <meshPhysicalMaterial
        color="#e9ecf1"
        metalness={1}
        roughness={0.07}
        clearcoat={1}
        clearcoatRoughness={0.06}
        envMapIntensity={1.9}
      />
    </mesh>
  );
}

export function ChromeKnot() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4.2], fov: 42 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
      onCreated={setupEnv}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 5, 4]} intensity={2.2} color="#ffffff" />
      <directionalLight position={[-4, -2, -3]} intensity={0.7} color="#dfe6ff" />
      <Knot />
    </Canvas>
  );
}
