'use client';

import React from 'react';
import * as THREE from 'three';

export const Zone1Entrance: React.FC = () => {
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
      <group position={[0, 2.9, 1.2]}>
        <mesh>
          <cylinderGeometry args={[0.15, 0.25, 0.35, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
        <pointLight color="#FFE4B5" intensity={1.5} distance={3} />
      </group>
    </group>
  );
};
