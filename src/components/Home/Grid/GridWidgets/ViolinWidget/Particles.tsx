import * as THREE from "three";
import ReactDOM from "react-dom";
import React, { useRef, useMemo } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, SSAO, Bloom } from "@react-three/postprocessing";
import { Color, DoubleSide } from "three";
import theme from "@static/theme";

const Particles = ({ count }: { count: number }): JSX.Element => {
  const mesh = useRef();
  //   const light = useRef();
  const { viewport, mouse } = useThree();

  const dummy = useMemo(() => new THREE.Object3D(), []);
  // Generate some random positions, speed factors and timings
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const t = Math.random() * 100;
      const factor = 20 + Math.abs(Math.random() * 100);
      const speed = 0.01 + Math.random() / 200;
      const xFactor = -50 + Math.random() * 100;
      const yFactor = -50 + Math.abs(Math.random()) * 100;
      //   const xFactor = -50 + Math.random() * 100;
      //   const yFactor = -50 + Math.random() * 100;
      const zFactor = -50 + Math.random() * 100;
      temp.push({ t, factor, speed, xFactor, yFactor, zFactor, mx: 0, my: 0 });
    }
    return temp;
  }, [count]);
  // The innards of this hook will run every frame
  useFrame((state) => {
    // Makes the light follow the mouse

    // Run through the randomized data to calculate some movement
    const t = state.clock.elapsedTime;

    particles.forEach((particle, i) => {
      let { t, factor, speed, xFactor, yFactor, zFactor } = particle;
      // There is no sense or reason to any of this, just messing around with trigonometric functions
      t = particle.t += speed / 2;
      const a = Math.cos(t) + Math.sin(t * 1) / 10;
      const b = Math.sin(t) + Math.cos(t * 2) / 10;
      const s = Math.cos(t);
      particle.mx += mouse.x * viewport.width * particle.mx * 0.01;
      particle.my += mouse.y * viewport.height * particle.my * 0.01;
      // Update the dummy object

      const yPos =
        (particle.my / 10) * b +
        yFactor +
        (Math.sin(t) + 1) * 50 +
        Math.sin(t / 10 + 1) * factor +
        (Math.cos(t * 2) * factor) / 10;

      // console.log(yPos);
      dummy.position.set(
        (particle.mx / 10) * a +
          xFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 1) * factor) / 10,
        (particle.my / 10) * b +
          yFactor +
          (Math.sin(t) + 1) * 50 +
          Math.sin(t / 10 + 1) * factor +
          (Math.cos(t * 2) * factor) / 10,
        // ((particle.my / 10) * b + oldZ + 4) % 100
        //   zFactor +
        //   Math.cos((t / 10) * factor) +
        //   (Math.sin(t * 3) * factor) / 10
        (particle.my / 10) * b +
          zFactor +
          Math.cos((t / 10) * factor) +
          (Math.sin(t * 3) * factor) / 10
      );
      //   console.log(((particle.my / 10) * b + oldZ + 4) % 10);
      dummy.scale.set(s, s, s);
      //   dummy.rotation.set(s * 5, s * 5, s * 5);
      //@ts-ignore
      dummy.updateMatrix();
      // And apply the matrix to the instanced item
      //@ts-ignore
      mesh.current.setMatrixAt(i, dummy.matrix);
    });
    //@ts-ignore
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <>
      {/* <pointLight ref={light} distance={60} intensity={20} color="red">
        <mesh scale={[4, 4, 40]}>
          <dodecahedronGeometry />
        </mesh>
      </pointLight> */}
      <instancedMesh ref={mesh} args={[null, null, count]}>
        {/* <dodecahedronGeometry args={[1, 0]} /> */}
        {/* <meshStandardMaterial color="black" /> */}
        <planeBufferGeometry attach="geometry" args={[1, 1]} />
        <meshPhongMaterial
          // args={[]}
          side={DoubleSide}
          emissive={new Color(...theme.secondaryRGBGL)}
          emissiveIntensity={2}
          attach="material"
          color="#272727"
        />
      </instancedMesh>
    </>
  );
};

function Dolly() {
  // This one makes the camera move in and out
  useFrame(({ clock, camera }) => {
    camera.position.z = 50 + Math.sin(clock.getElapsedTime()) * 30;
  });
  return null;
}

// function Particles() {
//   return (
//     <>
//       <Swarm count={200} />
//     </>
//   );
// }

// function Particles() {
//   return (
//     <div style={{ width: "100vw", height: "100vh" }}>
//       <Canvas camera={{ fov: 75, position: [0, 0, 70] }}>
//         <color attach="background" args={["#010101"]} />
//         <pointLight intensity={1} color="red" />
//         <spotLight
//           intensity={0.2}
//           position={[70, 70, 70]}
//           penumbra={1}
//           color="lightblue"
//         />
//         <Swarm count={100} />
//         {/* <EffectComposer multisampling={0}>
//           <Bloom
//             intensity={1.5}
//             kernelSize={2}
//             luminanceThreshold={0}
//             luminanceSmoothing={0.3}
//           />
//           <Bloom
//             intensity={1.5}
//             kernelSize={4}
//             luminanceThreshold={0}
//             luminanceSmoothing={0.0}
//           />
//         </EffectComposer> */}
//       </Canvas>
//     </div>
//   );
// }

export default Particles;
