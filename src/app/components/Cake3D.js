"use client";

import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

// -------------------------------
// Cake Model Component
// -------------------------------
function CakeModel({ candlesOn, modelRef, flameRefs }) {
  const { scene } = useGLTF("/models/cake.glb");

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y += 0.0035;
    }
  });

  useEffect(() => {
    scene.scale.set(25, 25, 25);
    scene.position.set(0, -0.5, 0);
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

// -------------------------------
// Smoke Component
// -------------------------------
function Smoke({ active }) {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!ref.current) return;

    if (active) {
      ref.current.material.opacity = Math.min(
        1,
        ref.current.material.opacity + delta * 1.3
      );
      ref.current.position.y += delta * 0.18;
      ref.current.scale.x += delta * 0.3;
      ref.current.scale.y += delta * 0.3;
    } else {
      ref.current.material.opacity = Math.max(
        0,
        ref.current.material.opacity - delta * 1.5
      );
      ref.current.position.y = THREE.MathUtils.lerp(
        ref.current.position.y,
        1.2,
        0.12
      );
      ref.current.scale.lerp(new THREE.Vector3(0.6, 0.6, 0.6), 0.15);
    }
  });

  return (
    <mesh ref={ref} position={[0, 1.2, 0]} rotation={[-Math.PI / 4.8, 0, 0]}>
      <planeGeometry args={[0.8, 0.8]} />
      <meshBasicMaterial
        transparent
        opacity={0}
        depthWrite={false}
        side={THREE.DoubleSide}
        color="black"
      />
    </mesh>
  );
}

// -------------------------------
// MAIN COMPONENT
// -------------------------------
export default function Cake3D() {
  const [candlesOn, setCandlesOn] = useState(true);
  const [smokeActive, setSmokeActive] = useState(false);

  const modelRef = useRef(null);
  const flameRefs = useRef([]);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);

  console.log("Initial candlesOn:", candlesOn);

  useEffect(() => {
    const threshold = 0.04; // sensitivity
    const framesNeeded = 3; // consecutive frames required to detect blow
    let blowFrames = 0;
    let lastTrigger = 0;

    const enableMic = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        streamRef.current = stream;

        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        audioCtxRef.current = audioCtx;

        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        analyserRef.current = analyser;

        const src = audioCtx.createMediaStreamSource(stream);
        src.connect(analyser);

        const data = new Float32Array(analyser.fftSize);

        // delay detection 1 sec to avoid first-load noises
        setTimeout(() => {
          const tick = () => {
            analyser.getFloatTimeDomainData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
            const rms = Math.sqrt(sum / data.length);
            const now = Date.now();

            // Only count sustained sound as blow
            if (rms > threshold) {
              blowFrames++;
            } else {
              blowFrames = 0;
            }

            if (
              blowFrames >= framesNeeded &&
              now - lastTrigger > 700 &&
              candlesOn
            ) {
              lastTrigger = now;
              console.log("Blow detected! Turning off candles");
              setCandlesOn(false);
              setSmokeActive(true);
              setTimeout(() => setSmokeActive(false), 2500);
              blowFrames = 0;
            }

            rafRef.current = requestAnimationFrame(tick);
          };

          rafRef.current = requestAnimationFrame(tick);
        }, 1000);
      } catch (e) {
        console.warn("Microphone error:", e);
      }
    };

    enableMic();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((t) => t.stop());
        streamRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
        audioCtxRef.current = null;
      }
    };
  }, []);

  return (
    <div className="w-full h-[520px]">
      <Canvas camera={{ position: [0, 2, 6], fov: 45 }}>
        <ambientLight intensity={1.2} />
        <directionalLight intensity={1.8} position={[3, 6, 3]} />

        <React.Suspense
          fallback={
            <Html center>
              <div className="text-white">در حال بارگذاری مدل...</div>
            </Html>
          }
        >
          <CakeModel
            candlesOn={candlesOn}
            modelRef={modelRef}
            flameRefs={flameRefs}
          />
          <Smoke active={smokeActive} />
        </React.Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
