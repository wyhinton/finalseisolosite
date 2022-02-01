import React, { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import "./styles.css";
import { Mesh, Vector3 } from "three";

const Scene = (): JSX.Element => {
  const meshRef = useRef<Mesh>();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.add(new Vector3(1, 1, 1));
    }
  });

  return (
    <Canvas camera={{ fov: 75, position: [0, 0, 70] }}>
      <mesh ref={meshRef}>
        <boxBufferGeometry args={[10, 10, 1]} />
      </mesh>
    </Canvas>
  );
};

export default Scene;
