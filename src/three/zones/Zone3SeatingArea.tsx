'use client';

import React from 'react';
import * as THREE from 'three';
import { HotspotMarker } from '../hotspots/HotspotMarker';
import { HOTSPOTS } from '@/lib/data/seedData';

export const Zone3SeatingArea: React.FC = () => {
  const reserveHotspot = HOTSPOTS.find((h) => h.id === 'hotspot-seating-reserve')!;

  return (
    <group position={[1.8, 0, -0.6]}>
      {/* Table 4 (Window Dining Table) */}
      <group position={[0, 0, 0]}>
        {/* Steel Pedestal Base */}
        <mesh position={[0, 0.02, 0]} receiveShadow>
          <cylinderGeometry args={[0.3, 0.35, 0.04, 32]} />
          <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.36, 0]} castShadow>
          <cylinderGeometry args={[0.04, 0.04, 0.7, 16]} />
          <meshStandardMaterial color="#1E1E1E" metalness={0.8} roughness={0.4} />
        </mesh>
        {/* Solid Walnut Tabletop */}
        <mesh position={[0, 0.74, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[0.55, 0.55, 0.04, 32]} />
          <meshStandardMaterial color="#4A2F1B" roughness={0.5} />
        </mesh>
        {/* Small Glass Bud Vase with Olive Branch on Table */}
        <mesh position={[0, 0.82, 0]}>
          <cylinderGeometry args={[0.025, 0.035, 0.12, 16]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.9}
            opacity={0.4}
            transparent
            roughness={0.1}
          />
        </mesh>
        <mesh position={[0, 0.9, 0]}>
          <coneGeometry args={[0.04, 0.1, 8]} />
          <meshStandardMaterial color="#5E7158" roughness={0.8} />
        </mesh>
      </group>

      {/* Bistro Chair 1 */}
      <group position={[-0.55, 0, 0]} rotation={[0, Math.PI / 4, 0]}>
        {/* Legs */}
        <mesh position={[-0.15, 0.22, -0.15]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.5} />
        </mesh>
        <mesh position={[0.15, 0.22, -0.15]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.5} />
        </mesh>
        <mesh position={[-0.15, 0.22, 0.15]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.5} />
        </mesh>
        <mesh position={[0.15, 0.22, 0.15]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.5} />
        </mesh>
        {/* Leather Seat Pad */}
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
          <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
        </mesh>
        {/* Curved Backrest */}
        <mesh position={[-0.18, 0.65, 0]}>
          <boxGeometry args={[0.03, 0.35, 0.38]} />
          <meshStandardMaterial color="#3B281B" roughness={0.6} />
        </mesh>
      </group>

      {/* Bistro Chair 2 */}
      <group position={[0.55, 0, 0]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh position={[0, 0.45, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.22, 0.04, 24]} />
          <meshStandardMaterial color="#8B5A2B" roughness={0.7} />
        </mesh>
        <mesh position={[0.18, 0.65, 0]}>
          <boxGeometry args={[0.03, 0.35, 0.38]} />
          <meshStandardMaterial color="#3B281B" roughness={0.6} />
        </mesh>
        <mesh position={[-0.15, 0.22, -0.15]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.5} />
        </mesh>
        <mesh position={[0.15, 0.22, 0.15]} castShadow>
          <cylinderGeometry args={[0.015, 0.015, 0.44, 8]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.5} />
        </mesh>
      </group>

      {/* Architectural Side Window Frame */}
      <group position={[1.4, 1.8, 0]}>
        <mesh receiveShadow>
          <boxGeometry args={[0.1, 2.4, 2.0]} />
          <meshStandardMaterial color="#2B1D15" roughness={0.7} />
        </mesh>
        {/* Glass with warm exterior sunlight */}
        <mesh position={[-0.02, 0, 0]}>
          <boxGeometry args={[0.02, 2.2, 1.8]} />
          <meshPhysicalMaterial
            color="#FFFDF7"
            transmission={0.92}
            opacity={0.2}
            transparent
            roughness={0.05}
          />
        </mesh>
      </group>

      {/* Terracotta Floor Planter with Indoor Greenery */}
      <group position={[1.1, 0, 0.9]}>
        <mesh position={[0, 0.25, 0]} castShadow>
          <cylinderGeometry args={[0.22, 0.16, 0.5, 24]} />
          <meshStandardMaterial color="#C86A4B" roughness={0.8} />
        </mesh>
        {/* Fiddle Leaf / Palm Foliage */}
        <mesh position={[0, 0.65, 0]}>
          <coneGeometry args={[0.28, 0.5, 8]} />
          <meshStandardMaterial color="#4A6B45" roughness={0.7} />
        </mesh>
        <mesh position={[0.05, 0.8, 0.05]}>
          <coneGeometry args={[0.22, 0.4, 8]} />
          <meshStandardMaterial color="#5E8358" roughness={0.7} />
        </mesh>
      </group>

      {/* Interactive Hotspot */}
      {reserveHotspot && <HotspotMarker hotspot={reserveHotspot} />}
    </group>
  );
};
