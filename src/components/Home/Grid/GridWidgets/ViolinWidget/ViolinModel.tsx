import React, {
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useThree, useFrame, useLoader } from "@react-three/fiber";
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
  EdgesGeometry,
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
import Particles from "./Particles";
import {
  EffectComposer,
  Glitch,
  DepthOfField,
  Outline,
  // Resizer,
} from "@react-three/postprocessing";
import { a, useSpring, config } from "@react-spring/three";
import bravias from "./bravias";
import s1 from "./s1.wav";
import { getRandomIntInclusive } from "@utils";
import { MeshSurfaceSampler } from "three-stdlib";
import { lerp } from "three/src/math/MathUtils";
import BubbleParticles from "./BubbleParticles";
import HomeContext from "@components/Home/HomeContext";
import theme from "@static/theme";

const Bubbles = ({ children }: { children: Group }): JSX.Element => {
  return;
};

function playAudio() {
  s1.play();
}

const ViolinModel = ({
  track,
  isPlaying,
}: {
  track: Track;
  isPlaying: boolean;
}) => {
  const { active, progress, errors, item, loaded, total } = useProgress();
  const { isLoaded } = React.useContext(HomeContext);

  const { nodes } = useGLTF(
    `${process.env.PUBLIC_URL}/Models/realistic-violin.glb`
  );
  console.log(nodes);
  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matpurple.png`
  );

  const group = useRef<Group>();
  const target = nodes.V as unknown as Mesh;
  // const target = nodes.V as unknown as Group;
  // const target = nodes.V as unknown as Group;
  const outline = nodes.OUTLINE as unknown as Mesh;
  // const lineGeo = useMemo(() => {
  //   if (outline.geometry) {
  //     return new EdgesGeometry(outline.geometry);
  //   }
  // }, []);
  // const lines = useMemo(()=>{
  //   const edges = new EdgesGeometry( geometry );
  // })
  console.log(outline);
  // const children = target.children as Mesh[];

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
  // useMemo(() => {
  //   samplerRef.current = new MeshSurfaceSampler(children[0]).build();
  //   console.log(samplerRef.current);
  // }, [children.length]);

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
      {/* <line geometry={lineGeo}>
        <lineBasicMaterial attach="material" color={"#9c88ff"} linewidth={10} />
      </line> */}
      <mesh geometry={outline.geometry}>
        <meshBasicMaterial color={theme.secondary} />
      </mesh>
      {/* <a.mesh geometry={target.geometry}>
        <meshMatcapMaterial
          attach="material"
          // opacity={1.0}
          opacity={0.0}
          // opacity={0.5}
          // color="yellow"
          matcap={matcapTexture}
        />
        {isRemix || <shaderMaterial ref={shaderRef} args={[bravias]} />}
      </a.mesh> */}
    </group>
  );
};
export default ViolinModel;

// {children.map((c, i) => {
//   const start = getRandomIntInclusive(10, 100);
//   useEffect(() => {
//     console.log(isLoaded);
//   }, [isLoaded]);
//   const { spring } = useSpring({
//     spring: isLoaded ? 0 : 10,
//     config: config.stiff,
//   });

//   return (
//     <a.mesh
//       onPointerDown={(e) => {
//         // console.log(e);
//         // if (sound.current) {
//         //   sound.current.play();
//         // }
//         // const i = getRandomIntInclusive(0, 60);
//         // setAudioInd(i);
//         // playAudio();
//       }}
//       key={i}
//       geometry={c.geometry}
//       material={c.material}
//       position-x={spring}
//     >
//       <meshMatcapMaterial
//         attach="material"
//         // opacity={1.0}
//         opacity={0.5}
//         // color="yellow"
//         matcap={matcapTexture}
//       />
//       {isRemix || <shaderMaterial ref={shaderRef} args={[bravias]} />}
//     </a.mesh>
//   );
// })}
