'use client';

import React, { Suspense, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Lighting } from './Lighting';
import { CameraManager } from './CameraManager';
import { CafeEnvironment } from './CafeEnvironment';
import { SceneLoader } from './loaders/SceneLoader';

interface CafeCanvasProps {
  className?: string;
}

export const CafeCanvas: React.FC<CafeCanvasProps> = ({ className }) => {
  const [mounted, setMounted] = useState(false);
  const [webGLError, setWebGLError] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Detect basic WebGL support
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) {
        setWebGLError(true);
      }
    } catch {
      setWebGLError(true);
    }
  }, []);

  if (!mounted) {
    return (
      <div className={`relative bg-cafe-dark flex items-center justify-center ${className || 'h-[75vh]'}`}>
        <SceneLoader />
      </div>
    );
  }

  if (webGLError) {
    return (
      <div className={`relative bg-cafe-dark flex flex-col items-center justify-center text-center p-8 text-cafe-cream ${className || 'h-[75vh]'}`}>
        <h3 className="font-serif font-bold text-xl text-cafe-gold mb-2">3D Acceleration Offline</h3>
        <p className="text-xs text-cafe-sand/80 max-w-md mb-6 leading-relaxed">
          Your browser or device does not currently have WebGL hardware acceleration enabled. You can still explore our full menu, reserve tables, and order below.
        </p>
        <a
          href="/menu"
          className="px-6 py-3 rounded-full bg-cafe-gold text-cafe-dark font-semibold text-xs uppercase tracking-wider shadow"
        >
          View Standard 2D Menu
        </a>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden bg-cafe-dark ${className || 'h-[75vh]'}`}>
      <Suspense fallback={<SceneLoader />}>
        <Canvas
          shadows
          gl={{
            antialias: true,
            powerPreference: 'high-performance',
            alpha: false,
          }}
          camera={{
            fov: 48,
            near: 0.1,
            far: 35,
            position: [0, 2.2, 7.5],
          }}
        >
          <color attach="background" args={['#160F0A']} />
          <fog attach="fog" args={['#160F0A', 10, 30]} />
          <Lighting />
          <CameraManager />
          <CafeEnvironment />
        </Canvas>
      </Suspense>
    </div>
  );
};
