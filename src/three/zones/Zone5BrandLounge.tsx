'use client';

import React from 'react';
import * as THREE from 'three';
import { HotspotMarker } from '../hotspots/HotspotMarker';
import { HOTSPOTS } from '@/lib/data/seedData';

export const Zone5BrandLounge: React.FC = () => {
  const storyHotspot = HOTSPOTS.find((h) => h.id === 'hotspot-brand-story')!;

  return (
    <group position={[2.2, 0, -2.6]}>
      {/* Back Feature Wall (Vertical Oak Slats) */}
      <mesh position={[0, 1.8, -0.6]} receiveShadow>
        <boxGeometry args={[3.2, 3.6, 0.1]} />
        <meshStandardMaterial color="#2B1D15" roughness={0.7} />
      </mesh>

      {/* Museum Framed Photograph 1: Chikmagalur Shade-Grown Estate */}
      <group position={[-0.6, 2.0, -0.52]}>
        {/* Frame */}
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.9, 0.04]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.4} />
        </mesh>
        {/* White Mat Border */}
        <mesh position={[0, 0, 0.022]}>
          <boxGeometry args={[0.62, 0.82, 0.005]} />
          <meshStandardMaterial color="#F9F6F0" roughness={0.9} />
        </mesh>
        {/* Photo Print */}
        <mesh position={[0, 0, 0.026]}>
          <boxGeometry args={[0.48, 0.68, 0.002]} />
          <meshStandardMaterial color="#3E342B" roughness={0.5} />
        </mesh>
      </group>

      {/* Museum Framed Photograph 2: Roaster & Hand Harvesting */}
      <group position={[0.6, 2.0, -0.52]}>
        <mesh castShadow>
          <boxGeometry args={[0.7, 0.9, 0.04]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0, 0.022]}>
          <boxGeometry args={[0.62, 0.82, 0.005]} />
          <meshStandardMaterial color="#F9F6F0" roughness={0.9} />
        </mesh>
        <mesh position={[0, 0, 0.026]}>
          <boxGeometry args={[0.48, 0.68, 0.002]} />
          <meshStandardMaterial color="#2D2721" roughness={0.5} />
        </mesh>
      </group>

      {/* Mid-Century Modern Leather Lounge Chair */}
      <group position={[0, 0, 0.3]} rotation={[0, -Math.PI / 6, 0]}>
        {/* Seat Cushion */}
        <mesh position={[0, 0.35, 0]} castShadow>
          <boxGeometry args={[0.65, 0.16, 0.65]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        {/* Backrest Cushion */}
        <mesh position={[0, 0.68, -0.28]} rotation={[0.2, 0, 0]} castShadow>
          <boxGeometry args={[0.65, 0.55, 0.14]} />
          <meshStandardMaterial color="#8B4513" roughness={0.6} />
        </mesh>
        {/* Brass Legs (4x) */}
        <mesh position={[-0.28, 0.14, -0.26]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.28, 0.14, -0.26]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[-0.28, 0.14, 0.26]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
        <mesh position={[0.28, 0.14, 0.26]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.28, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Interactive Story Hotspot */}
      {storyHotspot && <HotspotMarker hotspot={storyHotspot} />}
    </group>
  );
};
