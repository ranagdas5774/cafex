'use client';

import React from 'react';

export const Lighting: React.FC = () => {
  return (
    <>
      {/* Soft warm ambient lighting for intimate café mood */}
      <ambientLight color="#fceddc" intensity={0.9} />

      {/* Main sun light streaming through the front architectural windows */}
      <directionalLight
        color="#fff4e6"
        intensity={1.8}
        position={[6, 8, 7]}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={25}
        shadow-camera-left={-6}
        shadow-camera-right={6}
        shadow-camera-top={6}
        shadow-camera-bottom={-6}
        shadow-bias={-0.0001}
      />

      {/* Warm accent light over Espresso Counter (Zone 2) */}
      <pointLight
        color="#ffc68a"
        intensity={2.2}
        distance={6}
        position={[-1.8, 2.5, -0.2]}
      />

      {/* Warm accent light over Bakery Display (Zone 4) */}
      <pointLight
        color="#ffd8a8"
        intensity={2.0}
        distance={5}
        position={[-0.4, 2.4, -1.0]}
      />

      {/* Ambient warm lamp over Dining Area (Zone 3) */}
      <pointLight
        color="#ffe3ba"
        intensity={1.6}
        distance={6}
        position={[2.0, 2.4, -0.8]}
      />
    </>
  );
};
