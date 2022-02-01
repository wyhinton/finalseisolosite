import React, { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
// import { useGLTF } from "drei";
import {
  CubeTextureLoader,
  CubeCamera,
  WebGLCubeRenderTarget,
  RGBFormat,
  LinearMipmapLinearFilter,
  Mesh,
  Material,
  Group,
  Color,
  TextureLoader,
  ShaderMaterial,
  AudioLoader,
  PositionalAudio,
  AudioListener,
  Vector2,
} from "three";
import {
  Effects,
  OrbitControls,
  OrthographicCamera,
  // PositionalAudio,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { usePlaylist, useTrackCategory, useWindowSize } from "@hooks";
import { Track } from "@interfaces/Track";
import { useSpring } from "framer-motion";
import ViolinWidgetEffects from "./ViolinWidget/ViolinWidgetEffects";
import Particles from "./ViolinWidget/Particles";
import { EffectComposer, Glitch } from "@react-three/postprocessing";
import bravias from "./ViolinWidget/bravias";
import s1 from "./ViolinWidget/s1.wav";
import { getRandomIntInclusive } from "@utils";

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

function playAudio() {
  // function playAudio(audio, volume = 1, loop = false) {
  // if (useStore.getState().sound) {
  // audio.currentTime = 0;
  // audio.volume = volume;
  // audio.loop = loop;
  // audio.play();
  // console.log(s1);
  s1.play();
  // } else audio.pause()
}

const Violin = ({ track, isPlaying }: { track: Track; isPlaying: boolean }) => {
  const { nodes } = useGLTF(
    `${process.env.PUBLIC_URL}/Models/realistic-violin.glb`
  );
  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matpurple.png`
    // `${process.env.PUBLIC_URL}/Textures/matcapdarkpurple.png`
    // `${process.env.PUBLIC_URL}/Textures/matcapred.jpg`
  );

  const group = useRef<Group>();
  const target = nodes.V as unknown as Group;
  const children = target.children as Mesh[];

  const xPos = useSpring(0, { damping: 10, stiffness: 10 });

  useEffect(() => {
    if (group.current) {
      if (track.category === "remix") {
        xPos.set(0);
      } else {
        xPos.set(0);
      }
    }
  }, [track.category]);

  xPos.onChange((last) => {
    group.current.position.x = last;
  });

  // useTrackCategory(
  //   () => {
  //     if (group.current) {
  //       // group.current.position.x = 0;
  //     }
  //   },
  //   () => {
  //     if (group.current) {
  //       group.current.position.x = 100;
  //     }
  //   }
  // );
  const shaderRef = useRef<ShaderMaterial>();
  useFrame((state) => {
    group.current.rotation.y += 0.01;
    if (shaderRef.current) {
      shaderRef.current.uniforms.iTime.value = state.clock.elapsedTime;
    }
  });

  useEffect(() => {
    if (shaderRef.current) {
      shaderRef.current.defines.USE_UV = "";
    }
  }, []);

  const [isRemix, setisRemix] = useState(false);
  useEffect(() => {
    // console.log(track);
    if (isPlaying && track.category === "remix") {
      setisRemix(true);
    } else {
      setisRemix(false);
    }
  }, [track]);

  const [listener] = useState(() => new AudioListener());
  const [audioInd, setAudioInd] = useState(1);
  const surl = `${process.env.PUBLIC_URL}/Clips/s (1).mp3`;
  const [url, seturl] = useState(surl);

  const sound = useRef<PositionalAudio>();

  useEffect(() => {
    // setAudioInd(0);
    seturl(`${process.env.PUBLIC_URL}/Clips/s (${audioInd}).mp3`);
  }, [audioInd]);
  const buffer = useLoader(AudioLoader, url);
  const { camera } = useThree();
  // useEffect(() => {
  //   sound.current.setBuffer(buffer);
  //   sound.current.setRefDistance(1);
  //   sound.current.setLoop(true);
  //   sound.current.play();
  //   if (camera) {
  //     camera.add(listener);
  //   }

  //   return () => camera.remove(listener);
  // }, []);
  //@ts-ignore
  useEffect(() => {
    sound.current.setBuffer(buffer);
    // sound.current.setVolume(1);
    // sound.current.setRefDistance(0);
    // sound.current.setLoop(true);
    // sound.current.play();

    camera.add(listener);
    return () => camera.remove(listener);
  }, []);

  return (
    <group ref={group}>
      {/* <PositionalAudio
        url={}
        // url="/sound.mp3"
        distance={1}
        loop
        volume={1}
        // {...props} // All THREE.PositionalAudio props are valid
      /> */}
      <positionalAudio ref={sound} args={[listener]} />
      {children.map((c, i) => {
        return (
          <mesh
            onPointerDown={(e) => {
              // console.log(e);
              // if (sound.current) {
              //   sound.current.play();
              // }
              // const i = getRandomIntInclusive(0, 60);
              // setAudioInd(i);
              // playAudio();
            }}
            key={i}
            geometry={c.geometry}
            material={c.material}
          >
            <meshMatcapMaterial
              attach="material"
              // opacity={1.0}
              opacity={0.5}
              // color="yellow"
              matcap={matcapTexture}
            />
            {isRemix && <shaderMaterial ref={shaderRef} args={[bravias]} />}
          </mesh>
        );
      })}
    </group>
  );
};

// Loads the skybox texture and applies it to the scene.

// Lights
const ViolinWidget = ({ track }: { track: Track }): JSX.Element => {
  const { width, height } = useWindowSize();

  const zoom = Math.min(width, height) * 0.02;
  const { isPlaying } = usePlaylist();

  return (
    <Suspense fallback={<Loader />}>
      <Canvas className="canvas">
        <OrthographicCamera makeDefault zoom={zoom} position={[0, 0, 20]} />
        {/* <OrthographicCamera makeDefault zoom={15.1} position={[0, 0, 20]} /> */}
        <OrbitControls />
        {/* <Sphere /> */}
        <Violin track={track} isPlaying={isPlaying} />
        <Particles count={200} />
        {/* <SkyBox /> */}
        <ViolinWidgetEffects />
        <EffectComposer>
          <Glitch strength={new Vector2(0.1, 0.1)} />
        </EffectComposer>
        {/* <Glitch /> */}
      </Canvas>
    </Suspense>
  );
};

export default React.memo(ViolinWidget);

function Loader() {
  const { active, progress, errors, item, loaded, total } = useProgress();
  return <section></section>;
  // return <section>{progress} % loaded</section>;
}
