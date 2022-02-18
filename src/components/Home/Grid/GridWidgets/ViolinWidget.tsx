import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
// import { useGLTF } from "drei";
import { DepthOfFieldEffect } from "postprocessing";
import {
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
  InstancedMesh,
  Vector3,
  Matrix4,
  Object3D,
} from "three";
import {
  Effects,
  OrbitControls,
  OrthographicCamera,
  useContextBridge,
  // PositionalAudio,
  useGLTF,
  useProgress,
} from "@react-three/drei";
import { GLTF as GLTFThree } from "three/examples/jsm/loaders/GLTFLoader";
import { usePlaylist, useQuery, useTrackCategory, useWindowSize } from "@hooks";
import { Track } from "@interfaces/Track";
import ViolinWidgetEffects from "./ViolinWidget/ViolinWidgetEffects";
import ViolinModel from "./ViolinWidget/ViolinModel";
import Particles from "./ViolinWidget/Particles";
import {
  EffectComposer,
  Glitch,
  DepthOfField,
  Outline,
  // Resizer,
} from "@react-three/postprocessing";
import { a, useSpring, config } from "@react-spring/three";
import bravias from "./ViolinWidget/bravias";
import s1 from "./ViolinWidget/s1.wav";
import { getRandomIntInclusive } from "@utils";
import { MeshSurfaceSampler } from "three-stdlib";
import { lerp } from "three/src/math/MathUtils";
import BubbleParticles from "./ViolinWidget/BubbleParticles";
import { HomeContext } from "../../../../pages/Home";

// import { EffectComposer, DepthOfField, Bloom, Noise, Vignette } from '@react-three/postprocessing'

declare module "three-stdlib" {
  export interface GLTF extends GLTFThree {
    nodes: Record<string, Mesh>;
    materials: Record<string, Material>;
  }
}

const Bubbles = ({ children }: { children: Group }): JSX.Element => {
  return;
};

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
  const { active, progress, errors, item, loaded, total } = useProgress();
  const { isLoaded } = React.useContext(HomeContext);

  const { nodes } = useGLTF(
    `${process.env.PUBLIC_URL}/Models/realistic-violin.glb`
  );
  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matpurple.png`
  );

  const group = useRef<Group>();
  const target = nodes.V as unknown as Group;
  const children = target.children as Mesh[];

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
  const samplerRef = useRef<MeshSurfaceSampler>();

  const sound = useRef<PositionalAudio>();
  useMemo(() => {
    samplerRef.current = new MeshSurfaceSampler(children[0]).build();
    console.log(samplerRef.current);
  }, [children.length]);

  // useEffect(() => {
  //   // setAudioInd(0);
  //   seturl(`${process.env.PUBLIC_URL}/Clips/s (${audioInd}).mp3`);
  // }, [audioInd]);
  // const buffer = useLoader(AudioLoader, url);
  // const { camera } = useThree();
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
  const instancedMeshRef = useRef<InstancedMesh>();

  const _position = new Vector3();
  const _matrix = new Matrix4();
  const _scale = new Vector3();
  const tempObject = new Object3D();
  const pointsRef = useRef<Vector3[]>();

  useEffect(() => {
    const r = Array.from(Array(101).keys());
    const points = r.map((r) => {
      return new Vector3(0, 0, 0);
    });
    console.log(points);
    if (samplerRef.current) {
      points.forEach((p) => {
        samplerRef.current.sample(p);
      });
    }

    pointsRef.current = points;
    // return points;
  }, [loaded]);

  useFrame((state) => {
    // const time = state.clock.getElapsedTime();
    // instancedMeshRef.current.rotation.x = Math.sin(time / 4);
    // instancedMeshRef.current.rotation.y = Math.sin(time / 2);
    let i = 0;
    // if (state.clock.elapsedTime > 10) {
    if (instancedMeshRef.current && pointsRef.current) {
      for (let x = 0; x < 10; x++)
        for (let y = 0; y < 10; y++) {
          // if (state.clock.elapsedTime < 2) {
          //   samplerRef.current.sample(_position);
          //   tempObject.position.set(_position.x, _position.y, _position.z);
          //   tempObject.updateMatrix();
          // }
          const id = i++;
          const p = pointsRef.current[i];
          _scale.set(
            Math.sin(state.clock.elapsedTime * i * 0.1) * i * 0.015,
            0,
            0
          );
          p.add(_scale);

          tempObject.position.set(p.x, p.y, p.z);
          // tempObject.scale.setScalar(2);
          tempObject.scale.setScalar(
            (Math.sin(state.clock.elapsedTime * i * 0.1) + 1) * i * 0.02
          );
          // tempObject.scale.setScalar(Math.random());
          tempObject.updateMatrix();
          instancedMeshRef.current.setMatrixAt(id, tempObject.matrix);
          // if (state.clock.elapsedTime < 10) {
          //   samplerRef.current.sample(_position);
          //   _matrix.makeTranslation(_position.x, _position.y, _position.z);
          //   // instancedMeshRef.current.setMatrixAt(id, _matrix);
          // // }

          // const s = Math.random();
          // // _position.addScalar()
          // tempObject.scale.setScalar(s);
          // tempObject.updateMatrix();

          // _scale.setScalar(2);
          // _matrix.makeScale(_scale.x, _scale.y, _scale.z);
          // // _matrix(new Vector3(s, s, s));
          // // samplerRef.current.sample(_position);
          // // _matrix.makeTranslation(_position.x, _position.y, _position.z);
          // // instancedMeshRef.current.setMatrixAt()
          // instancedMeshRef.current.setMatrixAt(id, _matrix);
          //   Math.sin(z / 4 + time);
          // tempObject.rotation.z = tempObject.rotation.y * 2;
          // if (hovered !== prevRef.Current) {
          //   tempColor
          //     .set(id === hovered ? "white" : data[id].color)
          //     .toArray(colorArray, id * 3);
          //   meshRef.current.geometry.attributes.color.needsUpdate = true;
          // }
          // const scale = (data[id].scale = THREE.MathUtils.lerp(
          //   data[id].scale,
          //   id === hovered ? 3 : 1,
          //   0.1
          // ));
          // tempObject.scale.setScalar(scale);
          // tempObject.updateMatrix();

          // }
          instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    }
    // }

    // for (let z = 0; z < 10; z++) {
  });

  useEffect(() => {
    // sound.current.setBuffer(buffer);
    // sound.current.setVolume(1);
    // sound.current.setRefDistance(0);
    // sound.current.setLoop(true);
    // sound.current.play();
    // camera.add(listener);
    // return () => camera.remove(listener);
  }, [isLoaded]);

  // const sampler =

  return (
    <group name="violin_group" ref={group}>
      {/* <instancedMesh ref={instancedMeshRef} args={[null, null, 100]}>
        <sphereGeometry args={[1, 5, 5]}></sphereGeometry>
        <meshMatcapMaterial
          opacity={0.1}
          attach="material"
          matcap={matcapTexture}
        />
      </instancedMesh> */}
      {children.map((c, i) => {
        // const q = useSpring({
        //   // const { pos } = useSpring({
        //   from: { position: isLoaded?[2, 0, 0]:[0,0,0] },
        //   to: { position: [5, 0, 0] },
        // });
        // const q = useSpring({
        //   // const { pos } = useSpring({
        //   position: isLoaded ? [-100, 100, -100] : [-500, 0, 0],
        //   // position: isLoaded ? [-100, 100, -100] : [0, 0, 0],
        // });
        const start = getRandomIntInclusive(10, 100);
        useEffect(() => {
          console.log(isLoaded);
        }, [isLoaded]);
        const { spring } = useSpring({
          spring: isLoaded ? 0 : 10,
          config: config.stiff,
          // config: {
          //   mass: 1,
          //   tension: 500,
          //   friction: 0,
          //   // precision: 0.0001,
          //   // duration: 0,
          //   clamp: true,
          //   frequency: 1,
          // },
          // config: {
          //   mass: 1,
          //   tension: 500,
          //   friction: 0,
          //   // precision: 0.0001,
          //   // duration: 0,
          //   clamp: true,
          //   frequency: 1,
          // },
        });

        // const start = getRandomIntInclusive(50, 100);
        // const xPos = spring.to([0, 1], [start, 0]);

        // console.log(q.position);
        return (
          <a.mesh
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
            position-x={spring}
            // position-x={spring}
            // position-x={xPos}
            // position-x={q.position[0]}
            // position-y={q.position[1]}
            // position-z={q.position[2]}
            // position-x={q.position[0]}
            // position-y={q.position[1]}
            // position-z={q.position[2]}
            // position={q.position}
          >
            <meshMatcapMaterial
              attach="material"
              // opacity={1.0}
              opacity={0.5}
              // color="yellow"
              matcap={matcapTexture}
            />
            {isRemix || <shaderMaterial ref={shaderRef} args={[bravias]} />}
          </a.mesh>
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
  const depthOfFieldRef = useRef<DepthOfFieldEffect>();
  const { isSm } = useQuery();
  const ContextBridge = useContextBridge(HomeContext);
  // const [name, setName] = React.useState("hello");
  // const greeting = React.useContext(GreetingContext);
  // console.log(greeting);
  return (
    // <GreetingContext.Provider value={{ name: name, setName }}>
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
          {/* <SkyBox /> */}
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
    // </GreetingContext.Provider>
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
