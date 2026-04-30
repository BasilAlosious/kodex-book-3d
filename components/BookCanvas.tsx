'use client';

import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { Suspense } from 'react';
import * as THREE from 'three';
import Book from './Book';

export default function BookCanvas() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 3.4], fov: 35 }}
      gl={{
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
        toneMappingExposure: 1.15,
        alpha: true,
      }}
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Environment preset="apartment" environmentIntensity={0.6} />
        <Book />
      </Suspense>

      <directionalLight position={[3, 4, 5]} intensity={0.7} />
      <directionalLight position={[-4, 2, -3]} intensity={0.25} />
      <hemisphereLight args={['#ffffff', '#dcdce5', 0.35]} />
    </Canvas>
  );
}
