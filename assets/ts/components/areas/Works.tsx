import React, { useCallback, useEffect, PointerEvent, Suspense, useState } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import { Mesh, Vector3 } from 'three';
import { useGLTF } from "@react-three/drei";

const Works: React.FC<WorldProps> = (props: WorldProps) => {
  useEffect(() => {
    props.changeMemoName('works');
  }, []);

  return (
    <>
      <Base {...props} />

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('2314tk');
          e.stopPropagation();
        }}
        position={[8, 26.5, 0]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(8);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(0);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </group>
      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('kadaistore-api');
          e.stopPropagation();
        }}
        position={[-8, 26.5, 0]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-8);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(0);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('kadaistore');
          e.stopPropagation();
        }}
        position={[0, 26.5, -8]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-8);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('nenga2021');
          e.stopPropagation();
        }}
        position={[0, 26.5, 8]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(8);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>
      <WorksPole {...props} />
    </>
  );
}

const WorksPole: React.FC<WorldProps> = (props: WorldProps) => {
  const { nodes, materials } = useGLTF('../public/models/works_pole.glb');

  const [debugX, setX] = useState<number>(0);
  const [debugY, setY] = useState<number>(0);
  const [debugZ, setZ] = useState<number>(0);

  const moveKeydown = useCallback((e: KeyboardEvent) => {
    console.log(`${debugX} / ${debugY} / ${debugZ}`);
    if (e.key == 'x') {
      setX(debugX+1);
    }
    if (e.key == '1') {
      setX(debugX-1);
    }
    if (e.key == 'y') {
      setY(debugY+1);
    }
    if (e.key == '2') {
      setY(debugY-1);
    }
    if (e.key == 'z') {
      setZ(debugZ+1);
    }
    if (e.key == '3') {
      setZ(debugZ-1);
    }
  }, [debugX, debugY, debugZ]);

  useEffect(() => {
    window.addEventListener('keydown', moveKeydown);
    return () => window.removeEventListener('keydown', moveKeydown);
  }, [debugX, debugY, debugZ]);

  const azimuthNames: string[] = [
    'north', 'east', 'south', 'west'
  ];
  const azimuthButtonPos: number[][] = [
    [0, 34.5, 1.5],
    [-1.5, 34.5, 0],
    [0, 34.5, -1.5],
    [1.5, 34.5, 0]
  ];
  const azimuthButtonRot: number[][] = [
    [-90, 0, 0],
    [0, 0, -90],
    [90, 0, 0],
    [0, 0, 90]
  ];
  const azimuthTextPos: number[][] = [
    [-0.8, 32.8, 1.65],
    [-1.65, 32.8, -0.8],
    [0.8, 32.8, -1.65],
    [1.65, 32.8, 0.8],
  ];
  const azimuthTextRot: number[][] = [
    [90, 270, 0],
    [180, 0, 90],
    [-90, 90, 0],
    [180, 180, -270]
  ];

  return (
    <Suspense fallback={null}>
      <mesh
        onPointerDown={(e: PointerEvent<Element>) => {
          e.stopPropagation();
        }}
        position={[0, 24, 0]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0);
          props.changeHoverPosY(24);
          props.changeHoverPosZ(0);
        }}
        scale={new Vector3(3, 3, 3)}
        geometry={(nodes.pole as Mesh).geometry}
        material={materials.pole}
      />

      {azimuthNames.map((azimuth: string, index: number) =>
        <group key={index}>
          <mesh
            onPointerDown={(e: PointerEvent<Element>) => {
              e.stopPropagation();
            }}
            position={[
              azimuthButtonPos[index][0],
              azimuthButtonPos[index][1],
              azimuthButtonPos[index][2]
            ]}
            rotation={[
              Math.PI * azimuthButtonRot[index][0]/180,
              Math.PI * azimuthButtonRot[index][1]/180,
              Math.PI * azimuthButtonRot[index][2]/180
            ]}
            scale={new Vector3(3, 3, 3)}
            onPointerOver={() => {
              props.changeIsHover(true);
              props.changeHoverPosX(azimuthButtonPos[index][0]);
              props.changeHoverPosY(azimuthButtonPos[index][1]);
              props.changeHoverPosZ(azimuthButtonPos[index][2]);
            }}
            geometry={(nodes[`${azimuth}_button`] as Mesh).geometry}
            material={materials[`${azimuth}_button`]}
          />

          <mesh
            onPointerDown={(e: PointerEvent<Element>) => {
              e.stopPropagation();
            }}
            position={[
              azimuthTextPos[index][0],
              azimuthTextPos[index][1],
              azimuthTextPos[index][2]
            ]}
            rotation={[
              Math.PI * azimuthTextRot[index][0]/180,
              Math.PI * azimuthTextRot[index][1]/180,
              Math.PI * azimuthTextRot[index][2]/180
            ]}
            scale={new Vector3(3, 3, 3)}
            onPointerOver={() => {
              props.changeIsHover(true);
              props.changeHoverPosX(azimuthTextPos[index][0]);
              props.changeHoverPosY(azimuthTextPos[index][1]);
              props.changeHoverPosZ(azimuthTextPos[index][2]);
            }}
            geometry={(nodes[`${azimuth}_text`] as Mesh).geometry}
            material={materials[`${azimuth}_text`]}
          />
        </group>
      )}
    </Suspense>
  );
}
useGLTF.preload('../public/models/works_pole.glb');

export default Works;