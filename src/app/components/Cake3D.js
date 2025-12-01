"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import { useRef, useState, useEffect, Suspense } from "react";
import * as THREE from "three";

function CakeModel({ candlesOn }) {
  const gltf = useGLTF("/models/cake.glb");
  const scene = gltf.scene;
  const fireMeshes = [];

  // Resize and position cake
  scene.scale.set(2.5, 2.5, 2.5);
  scene.position.set(0, -1, 0);

  // Detect flames
  scene.traverse((child) => {
    if (child.isMesh) {
      console.log("Mesh:", child.name);
      if (child.name.includes("fire")) {
        fireMeshes.push(child);
      }
    }
  });

  // Toggle flames based on candlesOn state
  fireMeshes.forEach((mesh) => {
    mesh.visible = candlesOn;
  });

  return <primitive object={scene} />;
}

export default function Cake3D() {
  const [candlesOn, setCandlesOn] = useState(true);
  const [smokeActive, setSmokeActive] = useState(false);

  // Microphone blow detection
  useEffect(() => {
    let audioContext;
    let analyser;
    let rafId;
    let source;

    async function initMic() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioContext = new (window.AudioContext || window.webkitAudioContext)();
        analyser = audioContext.createAnalyser();
        analyser.fftSize = 2048;
        source = audioContext.createMediaStreamSource(stream);
        source.connect(analyser);
        const data = new Float32Array(analyser.fftSize);

        let lastTrigger = 0;

        const check = () => {
          analyser.getFloatTimeDomainData(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
          const rms = Math.sqrt(sum / data.length);
          const threshold = 0.06;
          const now = Date.now();

          if (rms > threshold && now - lastTrigger > 800 && candlesOn) {
            lastTrigger = now;
            console.log("Blow detected!");
            setCandlesOn(false);
            setSmokeActive(true);
            setTimeout(() => setSmokeActive(false), 2500);

            // Stop microphone after blow detected
            stream.getTracks().forEach((t) => t.stop());
            return;
          }

          rafId = requestAnimationFrame(check);
        };

        rafId = requestAnimationFrame(check);
      } catch (err) {
        console.warn("Microphone error:", err);
      }
    }

    initMic();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      if (audioContext) audioContext.close();
      if (source && source.mediaStream)
        source.mediaStream.getTracks().forEach((t) => t.stop());
    };
  }, [candlesOn]);

  // Simple smoke effect above cake
  function Smoke() {
    const ref = useRef();
    useFrame((state, delta) => {
      if (!ref.current) return;
      if (smokeActive) {
        ref.current.material.opacity = Math.max(
          0,
          ref.current.material.opacity - delta * 0.3
        );
        ref.current.scale.x += delta * 0.8;
        ref.current.scale.y += delta * 0.8;
      } else {
        ref.current.material.opacity = 0;
        ref.current.scale.set(0.5, 0.5, 0.5);
      }
    });
    return (
      <mesh ref={ref} position={[0, 1.2, 0]}>
        <planeGeometry args={[0.6, 0.6]} />
        <meshBasicMaterial
          transparent
          opacity={0}
          depthWrite={false}
          side={THREE.DoubleSide}
        />
      </mesh>
    );
  }

  return (
    <div className="w-full h-[500px]">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={1.3} />
        <directionalLight intensity={2} position={[3, 5, 3]} />
        <Suspense
          fallback={
            <Html center>
              <div className="text-white">در حال بارگذاری مدل...</div>
            </Html>
          }
        >
          <CakeModel candlesOn={candlesOn} />
          <Smoke />
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
  );
}
