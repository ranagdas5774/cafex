'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { HotspotMarker } from '../hotspots/HotspotMarker';
import { HOTSPOTS } from '@/lib/data/seedData';

export const Zone2CoffeeCounter: React.FC = () => {
  const steamRef = useRef<THREE.Points>(null);
  const cortadoHotspot = HOTSPOTS.find((h) => h.id === 'hotspot-counter-cortado')!;
  const v60Hotspot = HOTSPOTS.find((h) => h.id === 'hotspot-counter-v60')!;

  // Coffee steam particle animation
  const particleCount = 25;
  const particles = React.useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 0.08;
      pos[i * 3 + 1] = Math.random() * 0.25;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    return pos;
  }, []);

  useFrame((_, delta) => {
    if (steamRef.current) {
      const positions = steamRef.current.geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < particleCount; i++) {
        positions[i * 3 + 1] += delta * 0.12; // float upwards
        if (positions[i * 3 + 1] > 0.3) {
          positions[i * 3 + 1] = 0;
          positions[i * 3] = (Math.random() - 0.5) * 0.06;
          positions[i * 3 + 2] = (Math.random() - 0.5) * 0.06;
        }
      }
      steamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group position={[-1.8, 0, -0.6]}>
      {/* Lower Counter Base (Dark Walnut Wood) */}
      <mesh position={[0, 0.5, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.8, 1.0, 1.0]} />
        <meshStandardMaterial color="#2B1D15" roughness={0.7} />
      </mesh>

      {/* Marble Countertop (Polished White Italian Marble) */}
      <mesh position={[0, 1.03, 0]} castShadow receiveShadow>
        <boxGeometry args={[3.0, 0.06, 1.1]} />
        <meshStandardMaterial color="#F4F3EF" roughness={0.2} metalness={0.05} />
      </mesh>

      {/* Commercial Espresso Machine (Stainless Steel & Brass) */}
      <group position={[-0.4, 1.06, 0]}>
        {/* Main Body */}
        <mesh position={[0, 0.22, 0]} castShadow>
          <boxGeometry args={[0.9, 0.38, 0.5]} />
          <meshStandardMaterial color="#E0E0E0" metalness={0.9} roughness={0.15} />
        </mesh>
        {/* Top Cup Warmer Rail */}
        <mesh position={[0, 0.42, 0]}>
          <boxGeometry args={[0.85, 0.02, 0.45]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Group Heads (2x) */}
        <mesh position={[-0.2, 0.1, 0.27]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0.2, 0.1, 0.27]}>
          <cylinderGeometry args={[0.04, 0.04, 0.1, 16]} />
          <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.2} />
        </mesh>
        {/* Dual Steam Wands */}
        <mesh position={[-0.42, 0.12, 0.22]} rotation={[0, 0, 0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 16]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.9} roughness={0.1} />
        </mesh>
        <mesh position={[0.42, 0.12, 0.22]} rotation={[0, 0, -0.3]}>
          <cylinderGeometry args={[0.015, 0.015, 0.25, 16]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.9} roughness={0.1} />
        </mesh>
      </group>

      {/* Commercial Coffee Grinder */}
      <group position={[0.65, 1.06, -0.1]}>
        <mesh position={[0, 0.2, 0]} castShadow>
          <boxGeometry args={[0.25, 0.35, 0.28]} />
          <meshStandardMaterial color="#1E1E1E" roughness={0.4} metalness={0.7} />
        </mesh>
        {/* Bean Hopper (Tinted Amber Glass) */}
        <mesh position={[0, 0.48, 0]}>
          <cylinderGeometry args={[0.1, 0.06, 0.22, 24]} />
          <meshPhysicalMaterial
            color="#5C3B1E"
            transmission={0.8}
            opacity={0.7}
            transparent
            roughness={0.1}
          />
        </mesh>
      </group>

      {/* Signature Cortado Cup on Counter */}
      <group position={[-0.2, 1.06, 0.2]}>
        {/* Ceramic Cup */}
        <mesh position={[0, 0.045, 0]} castShadow>
          <cylinderGeometry args={[0.045, 0.035, 0.07, 24]} />
          <meshStandardMaterial color="#FAF7F2" roughness={0.2} />
        </mesh>
        {/* Rich Espresso Liquid with Microfoam Latte Art */}
        <mesh position={[0, 0.075, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.04, 24]} />
          <meshStandardMaterial color="#4A2F1B" roughness={0.3} />
        </mesh>
        {/* Rising Steam Effect */}
        <points ref={steamRef} position={[0, 0.08, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[particles, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color="#FFF4E6"
            transparent
            opacity={0.35}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>

      {/* Ceramic Pour Over Dripper (V60 Station) */}
      <group position={[0.3, 1.06, 0.15]}>
        {/* Brass Stand */}
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.04, 0.06, 0.12, 16]} />
          <meshStandardMaterial color="#C18B4B" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* White Ceramic Cone */}
        <mesh position={[0, 0.16, 0]}>
          <coneGeometry args={[0.06, 0.08, 24]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
      </group>

      {/* Interactive Hotspots */}
      {cortadoHotspot && <HotspotMarker hotspot={cortadoHotspot} />}
      {v60Hotspot && <HotspotMarker hotspot={v60Hotspot} />}
    </group>
  );
};
