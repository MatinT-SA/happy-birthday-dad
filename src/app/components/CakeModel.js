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
    scene.scale.set(60, 60, 60);
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
    console.log(
      "Detected flames:",
      flames.map((f) => f.name)
    );

    flames.forEach((m) => {
      console.log("Setting flame visible:", m.name);
      m.visible = true;
      if (m.material) {
        m.material.opacity = 1;
        m.material.transparent = false;
      }
    });
  }, [scene]);

  useEffect(() => {
    const flames = flameRefs.current || [];
    console.log("candlesOn changed:", candlesOn, "Setting flames visibility");
    flames.forEach((m) => {
      m.visible = candlesOn;
    });
  }, [candlesOn]);

  return <primitive ref={modelRef} object={scene} />;
}
