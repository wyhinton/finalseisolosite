import React, { useEffect, useMemo, useRef } from "react";
import { useFrame, useLoader, useThree } from "@react-three/fiber";
// import { useGLTF } from "drei";
import {
  TextureLoader,
  InstancedMesh,
  Vector3,
  Matrix4,
  Object3D,
  Mesh,
} from "three";
import { Track } from "@interfaces/Track";
import { MeshSurfaceSampler } from "three-stdlib/math/MeshSurfaceSampler";
import { useProgress } from "@react-three/drei";

const BubbleParticles = ({}: {}) => {
  const samplerRef = useRef<MeshSurfaceSampler>();

  const { scene } = useThree();
  const { loaded } = useProgress();

  const matcapTexture = useLoader(
    TextureLoader,
    `${process.env.PUBLIC_URL}/Textures/matpurple.png`
  );

  useMemo(() => {
    if (loaded == 3) {
      const children = scene.children[1];
      console.log(children);
      samplerRef.current = new MeshSurfaceSampler(children[1] as Mesh).build();
      console.log(samplerRef.current);
    }
  }, [loaded, scene.children]);

  const instancedMeshRef = useRef<InstancedMesh>();

  const _scale = new Vector3();
  const tempObject = new Object3D();
  const pointsRef = useRef<Vector3[]>();

  useEffect(() => {
    const r = Array.from(Array(101).keys());
    const points = r.map(() => {
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
    let i = 0;
    // if (state.clock.elapsedTime > 10) {
    if (instancedMeshRef.current && pointsRef.current) {
      for (let x = 0; x < 10; x++)
        for (let y = 0; y < 10; y++) {
          const id = i++;
          const p = pointsRef.current[i];
          _scale.set(
            Math.sin(state.clock.elapsedTime * i * 0.1) * i * 0.015,
            0,
            0
          );
          //   _scale.set(
          //     Math.sin(state.clock.elapsedTime * i * 0.1) * i * 0.015,
          //     0,
          //     0
          //   );
          p.add(_scale);

          tempObject.position.set(p.x, p.y, p.z);
          // tempObject.scale.setScalar(2);
          tempObject.scale.setScalar(
            (Math.sin(state.clock.elapsedTime * i * 0.1) + 1) * i * 0.02
          );
          // tempObject.scale.setScalar(Math.random());
          tempObject.updateMatrix();
          instancedMeshRef.current.setMatrixAt(id, tempObject.matrix);

          instancedMeshRef.current.instanceMatrix.needsUpdate = true;
        }
    }
  });

  // const sampler =

  return (
    <instancedMesh ref={instancedMeshRef} args={[null, null, 100]}>
      <sphereGeometry args={[1, 5, 5]}></sphereGeometry>
      <meshMatcapMaterial
        opacity={0.1}
        attach="material"
        matcap={matcapTexture}
      />
    </instancedMesh>
  );
};

export default BubbleParticles;
