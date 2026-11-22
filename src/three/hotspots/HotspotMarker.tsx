'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { SceneHotspot } from '@/types';
import { useSceneStore } from '@/lib/store/useSceneStore';

interface HotspotMarkerProps {
  hotspot: SceneHotspot;
}

export const HotspotMarker: React.FC<HotspotMarkerProps> = ({ hotspot }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const openHotspot = useSceneStore((state) => state.openHotspot);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (ringRef.current) {
      const scale = 1 + Math.sin(t * 3) * 0.25;
      ringRef.current.scale.set(scale, scale, scale);
    }
    if (meshRef.current) {
      meshRef.current.position.y = Math.sin(t * 2) * 0.03;
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    openHotspot(hotspot.id, hotspot.actionType, hotspot.productId);
  };

  return (
    <group position={hotspot.position}>
      {/* Outer pulsing ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.07, 0.09, 32]} />
        <meshBasicMaterial
          color="#C18B4B"
          transparent
          opacity={hovered ? 0.9 : 0.6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Central clickable glowing pin */}
      <mesh
        ref={meshRef}
        onClick={handleClick}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <sphereGeometry args={[0.065, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#FFF8EE' : '#C18B4B'}
          emissive="#C18B4B"
          emissiveIntensity={hovered ? 1.0 : 0.5}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* HTML Tooltip on hover / desktop visibility */}
      <Html
        position={[0, 0.18, 0]}
        center
        distanceFactor={6}
      >
        <div
          onClick={handleClick}
          onPointerDown={(e) => e.stopPropagation()}
          className={`px-3 py-1.5 rounded-lg bg-cafe-dark/95 backdrop-blur-md border border-cafe-gold/40 text-cafe-cream text-center shadow-lg transition-all duration-200 whitespace-nowrap cursor-pointer hover:border-cafe-gold hover:scale-105 pointer-events-auto ${
            hovered ? 'scale-105 opacity-100 border-cafe-gold' : 'scale-95 opacity-85'
          }`}
        >
          <p className="text-[11px] font-serif font-bold text-cafe-cream flex items-center justify-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-cafe-gold animate-pulse inline-block" />
            {hotspot.title}
          </p>
          <p className="text-[9px] text-cafe-gold/90 font-medium">
            {hotspot.subtitle}
          </p>
        </div>
      </Html>
    </group>
  );
};
