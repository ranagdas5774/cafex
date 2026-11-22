'use client';

import React from 'react';
import { Zone1Entrance } from './zones/Zone1Entrance';
import { Zone2CoffeeCounter } from './zones/Zone2CoffeeCounter';
import { Zone3SeatingArea } from './zones/Zone3SeatingArea';
import { Zone4BakeryDisplay } from './zones/Zone4BakeryDisplay';
import { Zone5BrandLounge } from './zones/Zone5BrandLounge';

export const CafeEnvironment: React.FC = () => {
  return (
    <group>
      {/* Café Main Herringbone Floor (Walnut / Smoked Teak) */}
      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[14, 16]} />
        <meshStandardMaterial
          color="#3A261A"
          roughness={0.45}
          metalness={0.05}
        />
      </mesh>

      {/* Main Structural Ceiling (Warm Charcoal Concrete with Wood Beams) */}
      <mesh
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 3.8, 0]}
      >
        <planeGeometry args={[14, 16]} />
        <meshStandardMaterial
          color="#221A15"
          roughness={0.9}
        />
      </mesh>

      {/* Main Back Wall */}
      <mesh position={[0, 1.9, -4.5]} receiveShadow>
        <boxGeometry args={[14, 3.8, 0.2]} />
        <meshStandardMaterial color="#2B1F17" roughness={0.8} />
      </mesh>

      {/* Main Left Wall */}
      <mesh position={[-5.0, 1.9, 0]} rotation={[0, Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 3.8, 0.2]} />
        <meshStandardMaterial color="#271C15" roughness={0.8} />
      </mesh>

      {/* Main Right Wall (with Windows) */}
      <mesh position={[5.0, 1.9, 0]} rotation={[0, -Math.PI / 2, 0]} receiveShadow>
        <boxGeometry args={[16, 3.8, 0.2]} />
        <meshStandardMaterial color="#271C15" roughness={0.8} />
      </mesh>

      {/* 5 Modular Zones */}
      <Zone1Entrance />
      <Zone2CoffeeCounter />
      <Zone3SeatingArea />
      <Zone4BakeryDisplay />
      <Zone5BrandLounge />
    </group>
  );
};
