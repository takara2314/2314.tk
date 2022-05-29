import type { NextPage } from 'next';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { PointerLockControls } from '@react-three/drei';
import Main from '../components/main';
import normalizeDirection from '../utils/normalizeDirection';

const title = 'ラボ';
const description = 'Pythonでマイコンを制御しよう！';

interface WorldProps {
  changePosition: (pos: any) => void
  changeRotation: (rot: any) => void
};

const Lab: NextPage = () => {
  const [position, setPosition] = useState<any>({ x: -1, y: -1, z: -1 });
  const [rotation, setRotation] = useState<any>({ _x: -1, _y: -1, _z: -1 });

  const changePosition = useCallback((pos: any) => {
    setPosition({ ...pos });
  }, []);

  const changeRotation = useCallback((rot: any) => {
    setRotation({ ...rot });
  }, []);

  return (
    <Main
      title={title}
      description={description}
    >
      <Canvas>
        <World
          changePosition={changePosition}
          changeRotation={changeRotation}
        />
      </Canvas>

      <div className="w-72 h-64 bg-white fixed bottom-0 right-0">
        <div className="mb-5">
          <p>x: {position.x}</p>
          <p>y: {position.y}</p>
          <p>z: {position.z}</p>
        </div>
        <div className="mb-5">
          <p>x: {rotation._x}</p>
          <p>y: {rotation._y}</p>
          <p>z: {rotation._z}</p>
        </div>
        <div>
          <p>direction: {normalizeDirection(rotation._x)}</p>
        </div>
      </div>
    </Main>
  );
};

const World = ({ changePosition, changeRotation }: WorldProps) => {
  const { camera } = useThree();

  const keyMap = {
    'w': false,
    'd': false,
    's': false,
    'a': false
  };

  const [isPointerLocking, setIsPointerLocking] = useState<boolean>(false);

  const handleLock = () => {
    setIsPointerLocking(true);
  };

  const handleUnlock = () => {
    setIsPointerLocking(false);
  };

  const handleKeyDown = (e: globalThis.KeyboardEvent) => {
    if (e.key in keyMap) {
      // @ts-ignore
      keyMap[e.key] = true;
    }

    changePosition(camera.position);

    const direction = normalizeDirection(camera.rotation.x);

    console.log('>', e.key);

    if (keyMap.w) {
      camera.position.x -= 0.1 * Math.cos(direction);
      camera.position.z -= 0.1 * Math.sin(direction);
    }
    if (keyMap.d) {
      camera.position.x += 0.1 * Math.sin(direction);
      camera.position.z -= 0.1 * Math.cos(direction);
    }
    if (keyMap.s) {
      camera.position.x += 0.1 * Math.cos(direction);
      camera.position.z += 0.1 * Math.sin(direction);
    }
    if (keyMap.a) {
      camera.position.x -= 0.1 * Math.sin(direction);
      camera.position.z += 0.1 * Math.cos(direction);
    }
  };

  const handleKeyUp = (e: globalThis.KeyboardEvent) => {
    console.log(e.key);
    if (e.key in keyMap) {
      // @ts-ignore
      keyMap[e.key] = false;
    }
  };

  const handleChange = () => {
    changeRotation(camera.rotation);
  };

  useEffect(() => {
    if (isPointerLocking === true) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isPointerLocking]);

  return (
    <>
      <PointerLockControls
        camera={camera}
        onChange={handleChange}
        onLock={handleLock}
        onUnlock={handleUnlock}
      />

      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box position={[-1.2, 0, 0]} />
      <Box position={[1.2, 0, 0]} />
    </>
  );
};

function Box(props: any) {
  // This reference gives us direct access to the THREE.Mesh object
  const ref = useRef();
  // Hold state for hovered and clicked events
  const [hovered, hover] = useState(false);
  const [clicked, click] = useState(false);
  // Subscribe this component to the render-loop, rotate the mesh every frame
  useFrame((state, delta) => (ref.current.rotation.x += 0.01));
  // Return the view, these are regular Threejs elements expressed in JSX
  return (
    <mesh
      {...props}
      ref={ref}
      scale={clicked ? 1.5 : 1}
      onClick={(event) => click(!clicked)}
      onPointerOver={(event) => hover(true)}
      onPointerOut={(event) => hover(false)}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default Lab;
