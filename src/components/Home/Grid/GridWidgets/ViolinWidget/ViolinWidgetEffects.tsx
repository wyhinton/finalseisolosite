import { Vector2 } from "three";
import React, { useRef, useMemo, useEffect, useState } from "react";
import { extend, useThree, useFrame } from "@react-three/fiber";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass";
import { FilmPass } from "three/examples/jsm/postprocessing/FilmPass";
import { CrtShader } from "./TransitionShader";
import { a, useSpring, animated } from "@react-spring/three";
import { useProgress } from "@react-three/drei";
import lerp from "lerp";
import { Glitch } from "@react-three/postprocessing";
// import { GlitchMode } from "@react-three/postprocessing";

// https://codesandbox.io/s/react-three-fiber-crt-effect-forked-i3znm?file=/src/App.tsx:1947-1966
extend({ EffectComposer, ShaderPass, RenderPass });
// applySpring({ EffectComposer, RenderPass, ShaderPass });

const ViolinWidgetEffects = (): JSX.Element => {
  const composer = useRef<EffectComposer>();
  const { scene, gl, size, camera } = useThree();
  const shaderRef = useRef<ShaderPass>();
  const { active, progress, errors, item, loaded, total } = useProgress();

  const [progressS, setSProgress] = useState(false);

  const { spring } = useSpring({
    spring: progressS,
    config: { mass: 5, tension: 400, friction: 50, precision: 0.0001 },
  });
  const prog = spring.to([0, 1], [0, 1]);

  useEffect(() => {
    // console.log(loaded);
    if (loaded == 2) {
      setSProgress(true);
    }
    //   loaded.current = item
  }, [loaded]);

  useEffect(
    () => void composer.current.setSize(size.width, size.height),
    [size]
  );
  useFrame(
    () =>
      (shaderRef.current.material.uniforms.progress.value = lerp(
        shaderRef.current.material.uniforms.progress.value,
        progressS ? 1 : 0,
        0.05
      ))
  );
  // useFrame(() => (shaderRef.current.material.uniforms.progress.value = lerp(shaderRef.current.material.uniforms.progress.value, progressS ? 0 : 1, 0.05)))
  useFrame((state) => {
    composer.current.render();

    const t = state.clock.elapsedTime;
    // composer.current.passes[0].
    // shaderRef.current.uniforms.progress.value = Math.abs(Math.sin(t)) as any
    // console.log(shaderRef.current.uniforms);
  }, 1);

  return (
    <effectComposer ref={composer} args={[gl]}>
      <renderPass attachArray="passes" scene={scene} camera={camera} />
      <shaderPass attachArray="passes" ref={shaderRef} args={[CrtShader]} />
      <Glitch
        delay={new Vector2(1.5, 3.5)} // min and max glitch delay
        // delay={[1.5, 3.5]} // min and max glitch delay
        duration={new Vector2(0.6, 1)} // min and max glitch duration
        // duration={[0.6, 1.0]} // min and max glitch duration
        strength={new Vector2(0.3, 1)} // min and max glitch strength
        // strength={[0.3, 1.0]} // min and max glitch strength
        // mode={GlitchMode.SPORADIC} // glitch mode
        // mode={GlitchMode.SPORADIC} // glitch mode
        active // turn on/off the effect (switches between "mode" prop and GlitchMode.DISABLED)
        ratio={0.85} // Threshold for strong glitches, 0 - no weak glitches, 1 - no strong glitches.
      />
      {/* <shaderPass attachArray="passes" args={[CrtShader]} scene={scene} camera={camera} /> */}
      {/* <shaderPass attachArray="passes" args={[CrtShader]} scene={scene} camera={camera} /> */}
    </effectComposer>
  );
};

export default ViolinWidgetEffects;
