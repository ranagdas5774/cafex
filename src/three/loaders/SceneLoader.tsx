'use client';

import React from 'react';
import { Coffee } from 'lucide-react';
import { useProgress } from '@react-three/drei';

export const SceneLoader: React.FC = () => {
  const { progress } = useProgress();

  return (
    <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-cafe-dark text-cafe-cream">
      <div className="relative mb-6">
        <div className="w-16 h-16 rounded-full border-2 border-cafe-gold/30 border-t-cafe-gold animate-spin flex items-center justify-center" />
        <Coffee className="w-6 h-6 text-cafe-gold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
      </div>

      <h3 className="font-serif font-bold text-lg tracking-wider text-white">
        ENTERING MAISON CAFÉ
      </h3>
      <p className="text-xs text-cafe-sand/70 tracking-widest uppercase mt-1">
        Generating 3D Spatial Sanctuary · {Math.round(progress || 100)}%
      </p>

      <div className="w-48 h-1 bg-cafe-walnut rounded-full mt-4 overflow-hidden">
        <div
          className="h-full bg-cafe-gold transition-all duration-300"
          style={{ width: `${Math.round(progress || 100)}%` }}
        />
      </div>
    </div>
  );
};
