import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Sparkles, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// 3D Stylized Coin with metallic gold / emerald sheen
function Coin({ position, rotationSpeed = 1, scale = 1, delay = 0 }) {
  const meshRef = useRef();

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.8 * rotationSpeed;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime + delay) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.2}>
      <group position={position} scale={scale}>
        {/* Main cylinder coin body */}
        <mesh ref={meshRef}>
          <cylinderGeometry args={[1.2, 1.2, 0.2, 32]} />
          <meshStandardMaterial
            color="#10b981"
            metalness={0.85}
            roughness={0.2}
            emissive="#047857"
            emissiveIntensity={0.2}
          />
          {/* Inner ring rim */}
          <mesh position={[0, 0.11, 0]}>
            <torusGeometry args={[0.9, 0.08, 16, 32]} />
            <meshStandardMaterial color="#34d399" metalness={0.9} roughness={0.15} />
          </mesh>
          <mesh position={[0, -0.11, 0]}>
            <torusGeometry args={[0.9, 0.08, 16, 32]} />
            <meshStandardMaterial color="#34d399" metalness={0.9} roughness={0.15} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
}

// 3D Stylized Digital Vault / Savings Orb
function SavingsOrb() {
  const orbRef = useRef();
  const ringRef = useRef();

  useFrame((state, delta) => {
    if (orbRef.current) {
      orbRef.current.rotation.y += delta * 0.3;
      orbRef.current.rotation.z += delta * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.5;
      ringRef.current.rotation.y += delta * 0.2;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <group position={[0, 0, 0]}>
        {/* Glowing emerald core */}
        <mesh ref={orbRef}>
          <sphereGeometry args={[1.4, 32, 32]} />
          <meshPhysicalMaterial
            color="#064e3b"
            emissive="#10b981"
            emissiveIntensity={0.5}
            roughness={0.1}
            metalness={0.2}
            transmission={0.6}
            thickness={1.2}
            transparent
            opacity={0.85}
          />
        </mesh>

        {/* Orbiting Tech Ring representing budget limits & growth */}
        <mesh ref={ringRef}>
          <torusGeometry args={[2.1, 0.06, 16, 64]} />
          <meshStandardMaterial
            color="#22d3ee"
            emissive="#06b6d4"
            emissiveIntensity={0.7}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </group>
    </Float>
  );
}

// Camera Mouse Parallax Handler
function SceneController() {
  useFrame((state) => {
    const { x, y } = state.pointer;
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, x * 1.2, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, y * 0.8, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function ThreeHeroScene() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 0.5, 6], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[10, 10, 5]} intensity={1.8} color="#6ee7b7" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#38bdf8" />
        <pointLight position={[0, 0, 2]} intensity={2.5} color="#10b981" distance={8} />

        <Suspense fallback={null}>
          <SavingsOrb />
          <Coin position={[-2.3, 1.2, 0.5]} scale={0.7} rotationSpeed={1.2} delay={0} />
          <Coin position={[2.4, -0.8, 0.8]} scale={0.65} rotationSpeed={0.9} delay={1.5} />
          <Coin position={[-1.8, -1.5, -0.5]} scale={0.5} rotationSpeed={1.5} delay={2.5} />
          <Coin position={[2.1, 1.4, -0.8]} scale={0.6} rotationSpeed={1.1} delay={3.2} />

          {/* Soft glowing ambient particles */}
          <Sparkles
            count={isMobile ? 35 : 85}
            scale={7}
            size={isMobile ? 2.5 : 3.5}
            speed={0.4}
            color="#34d399"
            opacity={0.7}
          />
          <Sparkles
            count={isMobile ? 25 : 55}
            scale={8}
            size={isMobile ? 2 : 3}
            speed={0.3}
            color="#38bdf8"
            opacity={0.6}
          />

          <SceneController />
        </Suspense>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 2.3}
          maxAzimuthAngle={Math.PI / 4}
          minAzimuthAngle={-Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}
