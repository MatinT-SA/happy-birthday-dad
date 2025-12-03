"use client";

import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { useEffect } from "react";

export default function CakeModel({ candlesOn, modelRef, flameRefs }) {
  const { scene } = useGLTF("/models/cake.glb");

  // Rotate the cake
  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0035;
    }
  });

  useEffect(() => {
    // Adjust scale for mobile
    const isMobile = window.innerWidth <= 768; // typical mobile breakpoint
    const scaleValue = isMobile ? 50 : 60; // smaller on mobile
    scene.scale.set(scaleValue, scaleValue, scaleValue);

    scene.position.set(0, -1, 0);
    scene.rotation.x = 0.3;
  }, [scene]);

  useEffect(() => {
    const flames = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        const name = (child.name || "").toLowerCase();
        if (name.includes("fire") || name.includes("flame")) {
          flames.push(child);
        }
      }
    });

    flameRefs.current = flames;

    flames.forEach((m) => {
      m.visible = true;
      if (m.material) {
        m.material.opacity = 1;
        m.material.transparent = false;
      }
    });
  }, [scene]);

  useEffect(() => {
    const flames = flameRefs.current || [];
    flames.forEach((m) => {
      m.visible = candlesOn;
    });
  }, [candlesOn]);

  return <primitive ref={modelRef} object={scene} />;
}
