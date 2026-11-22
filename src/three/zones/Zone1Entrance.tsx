'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HotspotMarker } from '../hotspots/HotspotMarker';
import { HOTSPOTS } from '@/lib/data/seedData';

export const Zone1Entrance: React.FC = () => {
  const logoRef = useRef<THREE.Group>(null);
  const enterHotspot = HOTSPOTS.find((h) => h.id === 'hotspot-entrance-enter')!;

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (logoRef.current) {
      logoRef.current.rotation.y = Math.sin(t * 0.8) * 0.25;
      logoRef.current.position.y = 3.2 + Math.sin(t * 1.5) * 0.04;
    }
  });

  return (
    <group position={[0, 0, 4.0]}>
      {/* Entrance Wall / Archway */}
      <mesh position={[0, 2.0, 1.5]} receiveShadow>
        <boxGeometry args={[7.0, 4.0, 0.2]} />
        <meshStandardMaterial color="#2B1D15" roughness={0.8} />
      </mesh>

      {/* Door Cutout Framing (Dark Teak Wood) */}
      <mesh position={[0, 1.4, 1.45]}>
        <boxGeometry args={[2.2, 2.8, 0.25]} />
        <meshStandardMaterial color="#3B281B" roughness={0.6} />
      </mesh>

      {/* Glass Door Insets */}
      <mesh position={[-0.5, 1.4, 1.48]}>
        <boxGeometry args={[0.9, 2.5, 0.05]} />
        <meshPhysicalMaterial
          color="#E8F4F8"
          transmission={0.85}
          opacity={0.3}
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>
      <mesh position={[0.5, 1.4, 1.48]}>
        <boxGeometry args={[0.9, 2.5, 0.05]} />
        <meshPhysicalMaterial
          color="#E8F4F8"
          transmission={0.85}
          opacity={0.3}
          transparent
          roughness={0.1}
          metalness={0.1}
        />
      </mesh>

      {/* Brass Door Handles */}
      <mesh position={[-0.1, 1.3, 1.55]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <meshStandardMaterial color="#C18B4B" metalness={0.9} roughness={0.2} />
      </mesh>
      <mesh position={[0.1, 1.3, 1.55]}>
        <cylinderGeometry args={[0.02, 0.02, 0.4, 16]} />
        <meshStandardMaterial color="#C18B4B" metalness={0.9} roughness={0.2} />
      </mesh>

      {/* Entrance Welcome Mat */}
      <mesh position={[0, 0.015, 0.5]} receiveShadow>
        <boxGeometry args={[1.8, 0.02, 1.0]} />
        <meshStandardMaterial color="#4A3B32" roughness={0.9} />
      </mesh>

      {/* Overhead Brass Lantern */}
      <group position={[0, 2.7, 1.2]}>
        <mesh>
          <cylinderGeometry args={[0.12, 0.2, 0.3, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
        <pointLight color="#FFE4B5" intensity={1.8} distance={3.5} />
      </group>

      {/* ANIMATED 3D BRAND LOGO INSIGNIA EMBLEM */}
      <group ref={logoRef} position={[0, 3.2, 1.48]}>
        {/* Golden Medallion Ring */}
        <mesh>
          <torusGeometry args={[0.35, 0.035, 16, 32]} />
          <meshStandardMaterial
            color="#D4A366"
            metalness={0.9}
            roughness={0.15}
            emissive="#C18B4B"
            emissiveIntensity={0.25}
          />
        </mesh>
        {/* Geometric Stylized 'M' Insignia */}
        <mesh position={[-0.14, 0, 0]}>
          <boxGeometry args={[0.035, 0.35, 0.03]} />
          <meshStandardMaterial color="#F9E2AF" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.14, 0, 0]}>
          <boxGeometry args={[0.035, 0.35, 0.03]} />
          <meshStandardMaterial color="#F9E2AF" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[-0.07, 0.06, 0]} rotation={[0, 0, -0.6]}>
          <boxGeometry args={[0.035, 0.22, 0.03]} />
          <meshStandardMaterial color="#F9E2AF" metalness={0.85} roughness={0.2} />
        </mesh>
        <mesh position={[0.07, 0.06, 0]} rotation={[0, 0, 0.6]}>
          <boxGeometry args={[0.035, 0.22, 0.03]} />
          <meshStandardMaterial color="#F9E2AF" metalness={0.85} roughness={0.2} />
        </mesh>
      </group>

      {/* Enter Café Hotspot Interaction */}
      {enterHotspot && <HotspotMarker hotspot={enterHotspot} />}
    </group>
  );
};
