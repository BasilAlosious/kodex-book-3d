'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame, useLoader, ThreeEvent } from '@react-three/fiber';
import * as THREE from 'three';
import { TextureLoader } from 'three';
import { generateSpineTexture } from './SpineTexture';
import { generatePageEdgeTexture } from './PageEdgeTexture';

// Book proportions (cover aspect 468:530 ≈ 0.88)
const W = 1.4;
const H = 1.585;
const D = 0.22;

// Hardcover construction
const BOARD_T  = 0.014; // cover board thickness
const OVERHANG = 0.020; // cover overhang on top, bottom, and fore-edge

const PAGE_W = W - BOARD_T - OVERHANG;
const PAGE_H = H - 2 * OVERHANG;
const PAGE_D = D - 2 * BOARD_T - 0.002;
const PAGE_OFFSET_X = (BOARD_T - OVERHANG) / 2; // sits flush against spine board, recessed at fore-edge

const COVER_EDGE  = '#dde4f0';
const INNER_LINER = '#f5f0e6';

const coverFinish = {
  roughness: 0.55,
  metalness: 0.0,
  clearcoat: 0.08,
  clearcoatRoughness: 0.45,
} as const;

export default function Book() {
  const groupRef = useRef<THREE.Group>(null!);
  const targetRot = useRef(-0.45); // start slanted to reveal the spine
  const dragging = useRef(false);
  const lastX = useRef(0);

  const [front, back] = useLoader(TextureLoader, [
    '/textures/cover_front.png',
    '/textures/cover_back.png',
  ]);

  useMemo(() => {
    front.colorSpace = THREE.SRGBColorSpace;
    back.colorSpace = THREE.SRGBColorSpace;
    front.anisotropy = 8;
    back.anisotropy = 8;
  }, [front, back]);

  const [spineTex, setSpineTex] = useState<THREE.Texture | null>(null);
  useEffect(() => {
    generateSpineTexture('/textures/cover_front.png').then(setSpineTex);
  }, []);

  const pageEdgeTex = useMemo(() => generatePageEdgeTexture(), []);

  // Material order on BoxGeometry: [+X, -X, +Y, -Y, +Z, -Z]
  const { frontBoardMats, backBoardMats, spineMats, pageMats } = useMemo(() => {
    const edgeMat = new THREE.MeshPhysicalMaterial({
      color: COVER_EDGE,
      roughness: 0.7,
    });
    const innerMat = new THREE.MeshPhysicalMaterial({
      color: INNER_LINER,
      roughness: 0.9,
    });
    // emissiveMap = the same cover image, lightly self-illuminated so the
    // print colors stay saturated regardless of how the env wraps the surface.
    const frontArt = new THREE.MeshPhysicalMaterial({
      map: front,
      emissiveMap: front,
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 0.28,
      ...coverFinish,
    });
    const backArt = new THREE.MeshPhysicalMaterial({
      map: back,
      emissiveMap: back,
      emissive: new THREE.Color('#ffffff'),
      emissiveIntensity: 0.28,
      ...coverFinish,
    });
    const spineArt = new THREE.MeshPhysicalMaterial({
      map: spineTex ?? undefined,
      color: spineTex ? '#ffffff' : COVER_EDGE,
      roughness: 0.55,
      metalness: 0,
      clearcoat: 0.15,
      clearcoatRoughness: 0.6,
    });
    const pageEdgeMat = new THREE.MeshPhysicalMaterial({
      map: pageEdgeTex,
      roughness: 0.85,
      metalness: 0,
    });
    const pageHidden = new THREE.MeshPhysicalMaterial({
      color: INNER_LINER,
      roughness: 0.95,
    });

    return {
      // Front board: outer (+Z) is cover art, inner (-Z) is liner, edges are board edge color
      frontBoardMats: [edgeMat, edgeMat, edgeMat, edgeMat, frontArt, innerMat],
      // Back board: outer (-Z) is back art, inner (+Z) is liner
      backBoardMats:  [edgeMat, edgeMat, edgeMat, edgeMat, innerMat, backArt],
      // Spine: outer face (-X) carries the spine artwork
      spineMats:      [edgeMat, spineArt, edgeMat, edgeMat, edgeMat, edgeMat],
      // Page block: visible faces are +X (fore-edge), +Y (top), -Y (bottom)
      pageMats: [pageEdgeMat, pageHidden, pageEdgeMat, pageEdgeMat, pageHidden, pageHidden],
    };
  }, [front, back, spineTex, pageEdgeTex]);

  // Slanted forward tilt, kept fixed while the book rotates around Y
  const REST_ROT_X = -0.13;

  useFrame((_, dt) => {
    if (!groupRef.current) return;
    if (!dragging.current) targetRot.current += dt * 0.12;
    const g = groupRef.current;
    g.rotation.y += (targetRot.current - g.rotation.y) * 0.08;
    g.rotation.x += (REST_ROT_X - g.rotation.x) * 0.08;
  });

  const onDown = (e: ThreeEvent<PointerEvent>) => {
    dragging.current = true;
    lastX.current = e.clientX;
    (e.target as Element).setPointerCapture?.(e.pointerId);
  };
  const onMove = (e: ThreeEvent<PointerEvent>) => {
    if (!dragging.current) return;
    targetRot.current += (e.clientX - lastX.current) * 0.01;
    lastX.current = e.clientX;
  };
  const onUp = () => { dragging.current = false; };

  return (
    <group
      ref={groupRef}
      position={[0, -0.1, 0]}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerOut={onUp}
    >
      {/* Front cover board */}
      <mesh position={[0, 0, D / 2 - BOARD_T / 2]} material={frontBoardMats}>
        <boxGeometry args={[W, H, BOARD_T]} />
      </mesh>

      {/* Back cover board */}
      <mesh position={[0, 0, -D / 2 + BOARD_T / 2]} material={backBoardMats}>
        <boxGeometry args={[W, H, BOARD_T]} />
      </mesh>

      {/* Spine cloth (sandwiched between the two boards) */}
      <mesh position={[-W / 2 + BOARD_T / 2, 0, 0]} material={spineMats}>
        <boxGeometry args={[BOARD_T, H, D - 2 * BOARD_T]} />
      </mesh>

      {/* Page block, recessed inside the cover */}
      <mesh position={[PAGE_OFFSET_X, 0, 0]} material={pageMats}>
        <boxGeometry args={[PAGE_W, PAGE_H, PAGE_D]} />
      </mesh>
    </group>
  );
}
