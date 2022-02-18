import React, { Suspense, useContext, useEffect, useRef } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { DepthOfFieldEffect } from "postprocessing";
import { Mesh, Material, Vector2 } from "three";
import {
  OrbitControls,
  OrthographicCamera,
  useContextBridge,
  useProgress,
} from "@react-three/drei";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { usePlaylist, useQuery, useWindowSize } from "@hooks";
import { Track } from "@interfaces/Track";
import ViolinModel from "./ViolinWidget/ViolinModel";
import { EffectComposer } from "@react-three/postprocessing";
import HomeContext from "@components/Home/HomeContext";

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const ViolinWidget = ({ track }: { track: Track }): JSX.Element => {
  const { width, height } = useWindowSize();

  const zoom = Math.min(width, height) * 0.02;
  const { isPlaying } = usePlaylist();
  const depthOfFieldRef = useRef<DepthOfFieldEffect>();
  const { isSm } = useQuery();
  const ContextBridge = useContextBridge(HomeContext);
  return (
    <Suspense fallback={<Loader />}>
      <Canvas className="canvas">
        <ContextBridge>
          <OrthographicCamera makeDefault zoom={zoom} position={[0, 0, 20]} />
          {/* <OrthographicCamera makeDefault zoom={15.1} position={[0, 0, 20]} /> */}
          <OrbitControls />
          {/* <Sphere /> */}
          <ViolinModel track={track} isPlaying={isPlaying ?? false} />
          {/* <Violin track={track} isPlaying={isPlaying ?? false} /> */}
          {/* <BubbleParticles /> */}
          {/* <ViolinWidgetEffects /> */}
          {!isSm && <Composer />}
          {/* <EffectComposer> */}
          {/* <HorizontalBlurShader /> */}
          {/* <DepthOfField
            ref={depthOfFieldRef}
            focusDistance={100} // it doesn't change no matter what is passed here
            focalLength={0.5}
            bokehScale={0}
          /> */}
          {/* <Glitch strength={new Vector2(0.1, 0.1)} /> */}
          {/* </EffectComposer> */}

          {/* <Glitch /> */}
        </ContextBridge>
      </Canvas>
    </Suspense>
  );
};

const Composer = (): JSX.Element => {
  const depthOfFieldRef = useRef<DepthOfFieldEffect>();
  const targ = new Vector2(0);
  const end = new Vector2(4);
  const start = new Vector2(0);

  const { scene } = useThree();
  console.log(scene);
  const meshesRef = useRef<Mesh>();

  const { active, progress, errors, item, loaded, total } = useProgress();

  useEffect(() => {
    if (loaded === 2) {
      meshesRef.current = scene.children[1].children[0] as Mesh;
      console.log(scene.getObjectByName("violin_group"));
    }
    console.log(meshesRef.current);
    console.log(scene.children[1]);
  }, [loaded]);

  // useFrame((s) => {
  //   // console.log(s.mouse);
  //   let t = depthOfFieldRef.current.uniforms.get("scale").value;
  //   if (s.mouse.x > -0.9) {
  //     // depthOfFieldRef.current.
  //     // console.log(depthOfFieldRef.current);
  //     // console.log();

  //     // depthOfFieldRef.current.uniforms.get("scale").value = 0;

  //     // let val = depthOfFieldRef.current.uniforms.get("scale").value;
  //     // t = lerp(t, 3, 0.1);
  //     targ.lerp(start, 0.1);
  //     // t = t = lerp(t, 1, 0.1);
  //   } else {
  //     targ.lerp(end, 0.1);

  //     // t = lerp(t, 0, 0.1);
  //     // t = t = lerp(t, 0, 0.1);
  //   }
  //   depthOfFieldRef.current.uniforms.get("scale").value = targ.x;
  //   // console.log(targ);
  //   // console.log(s);
  //   // if (s.mouse)
  // });

  return (
    <EffectComposer>
      {/* <HorizontalBlurShader /> */}
      {/* <DepthOfField
        ref={depthOfFieldRef}
        focusDistance={100} // it doesn't change no matter what is passed here
        focalLength={0.5}
        bokehScale={2}
      /> */}
      {/* <Outline
        // selection={[meshesRef]}
        blendFunction
        edgeStrength={50}
        visibleEdgeColor={0xffffff}
        // xRay={true}
        // width={Resizer.AUTO_SIZE} // render width
        // height={Resizer.AUTO_SIZE} // render height
        // width={3}
        // height={3}
        // edgeStrength={1}
      /> */}

      {/* <Glitch strength={new Vector2(0.1, 0.1)} /> */}
    </EffectComposer>
  );
};

export default React.memo(ViolinWidget);

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();

  const greeting = useContext(HomeContext);
  greeting.setProgress(progress);
  return <section></section>;
  // return <section>{progress} % loaded</section>;
}
