'use client';

import React, { useRef, useEffect } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useSceneStore } from '@/lib/store/useSceneStore';

export const CameraManager: React.FC = () => {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const { targetCameraPos, targetCameraLookAt } = useSceneStore();

  const targetVec = useRef(new THREE.Vector3(...targetCameraPos));
  const lookAtVec = useRef(new THREE.Vector3(...targetCameraLookAt));

  useEffect(() => {
    targetVec.current.set(...targetCameraPos);
    lookAtVec.current.set(...targetCameraLookAt);
  }, [targetCameraPos, targetCameraLookAt]);

  useFrame((_, delta) => {
    // Smooth lerp camera position towards target zone position
    camera.position.lerp(targetVec.current, delta * 3.0);

    if (controlsRef.current) {
      // Smooth lerp orbit target towards target lookAt position
      controlsRef.current.target.lerp(lookAtVec.current, delta * 3.0);
      controlsRef.current.update();
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2 - 0.05} // Prevent camera from dropping below floor
      minPolarAngle={Math.PI / 6}
      minDistance={1.2}
      maxDistance={11.0}
      rotateSpeed={0.6}
    />
  );
};
