"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import CakeModel from "./CakeModel";

// -------------------------------
// MAIN COMPONENT
// -------------------------------
export default function Cake3D() {
  const [candlesOn, setCandlesOn] = useState(true);

  const modelRef = useRef(null);
  const flameRefs = useRef([]);

  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const rafRef = useRef(null);

  console.log("Initial candlesOn:", candlesOn);

  // -------------------------------
  // Microphone Blow Detection
  // -------------------------------
  useEffect(() => {
    const threshold = 0.04; // sensitivity for a strong blow
    const framesNeeded = 3; // consecutive frames to detect sustained blow
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

        // Delay detection 1 sec to avoid first-load noises
        setTimeout(() => {
          const tick = () => {
            analyser.getFloatTimeDomainData(data);
            let sum = 0;
            for (let i = 0; i < data.length; i++) sum += data[i] * data[i];
            const rms = Math.sqrt(sum / data.length);
            const now = Date.now();

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

  // -------------------------------
  // Render
  // -------------------------------
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
        </React.Suspense>

        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}
