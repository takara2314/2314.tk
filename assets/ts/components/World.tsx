import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { extend, ReactThreeFiber, useFrame, useThree } from 'react-three-fiber';

extend({ OrbitControls });

declare global {
  namespace JSX {
    interface IntrinsicElements {
      orbitControls: ReactThreeFiber.Node<OrbitControls, typeof OrbitControls>
    }
  }
}

function World() {
  const ref1 = useRef({} as THREE.Mesh);
  const ref2 = useRef({} as THREE.Mesh);
  const ground = useRef({} as THREE.Mesh);
  const boxRef = useRef({} as THREE.Mesh);

  const controlsRef = useRef<OrbitControls>();
  const { camera, gl } = useThree();

  useFrame(() => {
    // ref1.current.rotation.z += 0.01;
    // ref2.current.rotation.z -= 0.01;
    boxRef.current.rotation.x += 0.01;
    boxRef.current.rotation.y += 0.01;
    boxRef.current.rotation.z += 0.01;
    ground.current.position.x -= 0.0075;
    ground.current.position.z -= 0.0075;
    controlsRef.current?.update();
  });

  return (
    <>
      {/* <perspectiveCamera
        ref={camera}
        fov={60}
        aspect={600/400}
        near={1}
        far={1000}
      /> */}
      <orbitControls
        ref={controlsRef}
        args={[camera, gl.domElement]}
        enabled={true}
        enableZoom={true}
        zoomSpeed={1.0}
        enableRotate={true}
        rotateSpeed={1.0}
        enablePan={true}
        panSpeed={2.0}
        minDistance={0}
        maxDistance={Infinity}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
      />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      {/* <mesh
        ref={ref1}
        onClick={e => console.log('click')}
        onPointerOver={e => console.log('hover')}
        onPointerOut={e => console.log('unhover')}
      >
        <boxBufferGeometry attach="geometry" args={[0.5, 20, 1]} />
        <meshBasicMaterial attach="material" color="rgb(0, 255, 0)" />
      </mesh>
      <mesh
        ref={ref2}
        onClick={e => console.log('click')}
        onPointerOver={e => console.log('hover')}
        onPointerOut={e => console.log('unhover')}
      >
        <boxBufferGeometry attach="geometry" args={[0.5, 20, 1]} />
        <meshBasicMaterial attach="material" color="rgb(25, 230, 0)" />
      </mesh> */}
      <mesh
        ref={boxRef}
        position={[0, 0, 0]}
      >
        <boxBufferGeometry args={[2, 2, 2]} />
        <meshStandardMaterial color="rgb(230, 30, 0)" />
      </mesh>
      <mesh
        ref={ground}
        position={[3, 3, 3]}
      >
        <boxBufferGeometry args={[2, 0.5, 2]} />
        <meshStandardMaterial color={"rgb(0, 255, 127)"} />
      </mesh>
    </>
  );
}

export default World;