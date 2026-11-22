'use client';

import React from 'react';
import * as THREE from 'three';
import { HotspotMarker } from '../hotspots/HotspotMarker';
import { HOTSPOTS } from '@/lib/data/seedData';

export const Zone4BakeryDisplay: React.FC = () => {
  const bakeryHotspot = HOTSPOTS.find((h) => h.id === 'hotspot-bakery-croissant')!;

  return (
    <group position={[-0.2, 0, -1.2]}>
      {/* Lower Walnut Storage Credenza */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 0.9, 0.7]} />
        <meshStandardMaterial color="#2B1D15" roughness={0.7} />
      </mesh>

      {/* Glass Pastry Vitrine (Temperature & Humidity Controlled) */}
      <group position={[0, 0.9, 0]}>
        {/* Brass Frame Rim */}
        <mesh position={[0, 0.25, 0]}>
          <boxGeometry args={[1.4, 0.5, 0.65]} />
          <meshPhysicalMaterial
            color="#FFFFFF"
            transmission={0.92}
            opacity={0.3}
            transparent
            roughness={0.05}
          />
        </mesh>
        {/* Brass Corner Posts */}
        <mesh position={[-0.68, 0.25, -0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.68, 0.25, -0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[-0.68, 0.25, 0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.2} />
        </mesh>
        <mesh position={[0.68, 0.25, 0.3]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.2} />
        </mesh>

        {/* Interior Tiered Marble Shelf */}
        <mesh position={[0, 0.18, 0]} receiveShadow>
          <boxGeometry args={[1.3, 0.02, 0.55]} />
          <meshStandardMaterial color="#F5F5F0" roughness={0.2} />
        </mesh>

        {/* Artisanal Pastry 1: Golden French Butter Croissant */}
        <group position={[-0.35, 0.22, 0]}>
          {/* Crescent Shaped Flaky Pastry */}
          <mesh castShadow rotation={[0, 0.2, 0]}>
            <torusGeometry args={[0.065, 0.035, 12, 24, Math.PI * 0.9]} />
            <meshStandardMaterial color="#D49339" roughness={0.6} />
          </mesh>
        </group>

        {/* Artisanal Pastry 2: Cruffin (Muffin Shaped Swirled Croissant) */}
        <group position={[0.25, 0.21, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.045, 0.035, 0.07, 16]} />
            <meshStandardMaterial color="#B87326" roughness={0.7} />
          </mesh>
          {/* Caramel Glaze Top */}
          <mesh position={[0, 0.038, 0]}>
            <sphereGeometry args={[0.04, 16, 16]} />
            <meshStandardMaterial color="#8B4513" roughness={0.3} />
          </mesh>
        </group>
      </group>

      {/* Interactive Bakery Hotspot */}
      {bakeryHotspot && <HotspotMarker hotspot={bakeryHotspot} />}
    </group>
  );
};
