import React, { useCallback, useEffect, PointerEvent, Suspense, useState } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import WorksPoleProps from '../../models/WorksPoleProps';
import { Mesh, Vector3 } from 'three';
import { useGLTF } from "@react-three/drei";

const Works = (props: WorldProps) => {
  const [nowAzimuth, setNowAzimuth] = useState<string>('south');

  const memos: {[azimuth: string]: string[]} = {
    north: [
      'html-geter', 'html-geter', 'html-geter', 'html-geter'
    ],
    east: [
      'nenga2021', 'kadaistore-api', 'html-geter', '2314tk'
    ],
    south:[
      'kadaistore', 'kadaistore-api', '2314tk', 'nenga2021'
    ],
    west: [
      'nenga2021', 'kadaistore-api', 'html-geter', '2314tk'
    ]
  };

  // ↓ 予定
  // const memos: {[azimuth: string]: string[]} = {
  //   north: [
  //     'foxseed', 'html-geter', 'school-bytrain', 'kadai-alarm'
  //   ],
  //   east: [
  //     'happynewyear2020', 'ut2', 'mittc-hackathon2021', 'nlns'
  //   ],
  //   south:[
  //     'kadaistore', 'kadaistore-api', '2314tk', 'nenga2021'
  //   ],
  //   west: [
  //     'codemple', 'hackday2021', 'not-secretmemo', 'mcstarpark'
  //   ]
  // };

  useEffect(() => {
    props.changeMemoName('works');
  }, []);

  return (
    <>
      <Base {...props} />

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName(memos[nowAzimuth][0]);
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
          <meshStandardMaterial color={"white"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName(memos[nowAzimuth][1]);
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
          <meshStandardMaterial color={"white"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName(memos[nowAzimuth][2]);
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
          <meshStandardMaterial color={"white"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName(memos[nowAzimuth][3]);
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
          <meshStandardMaterial color={"white"} />
        </mesh>
      </group>

      <WorksPole {...props} nowAzimuth={nowAzimuth} changeNowAzimuth={setNowAzimuth} />
    </>
  );
}

const WorksPole = (props: WorldProps & WorksPoleProps) => {
  const { nodes, materials } = useGLTF('../public/models/works_pole.glb');

  const [debugX, setX] = useState<number>(0);
  const [debugY, setY] = useState<number>(0);
  const [debugZ, setZ] = useState<number>(0);

  const [pressed, setPressed] = useState<boolean[]>([
    false, false, true, false
  ]);

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
  const azimuthButtonPosStaying: number[][] = [
    [0, 34.5, 1.5],
    [-1.5, 34.5, 0],
    [0, 34.5, -1.5],
    [1.5, 34.5, 0]
  ];
  const azimuthButtonPosPressed: number[][] = [
    [0, 34.5, 1.3],
    [-1.3, 34.5, 0],
    [0, 34.5, -1.3],
    [1.3, 34.5, 0]
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

  const pressHandler = (index: number): void => {
    const temp: boolean[] = [false, false, false, false];
    temp[index] = true;

    setPressed([
      temp[0],
      temp[1],
      temp[2],
      temp[3],
    ]);

    props.changeNowAzimuth(azimuthNames[index]);
  }

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
              pressHandler(index);
              e.stopPropagation();
            }}
            position={pressed[index]
              ? [
                azimuthButtonPosPressed[index][0],
                azimuthButtonPosPressed[index][1],
                azimuthButtonPosPressed[index][2]
              ]
              : [
                azimuthButtonPosStaying[index][0],
                azimuthButtonPosStaying[index][1],
                azimuthButtonPosStaying[index][2]
              ]
            }
            rotation={[
              Math.PI * azimuthButtonRot[index][0]/180,
              Math.PI * azimuthButtonRot[index][1]/180,
              Math.PI * azimuthButtonRot[index][2]/180
            ]}
            scale={new Vector3(3, 3, 3)}
            onPointerOver={() => {
              props.changeIsHover(true);
              props.changeHoverPosX(azimuthButtonPosStaying[index][0]);
              props.changeHoverPosY(azimuthButtonPosStaying[index][1]);
              props.changeHoverPosZ(azimuthButtonPosStaying[index][2]);
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
            material={
              materials[
                pressed[index]
                ? `${azimuth}_button`
                : `${azimuth}_text`
              ]
            }
          />
        </group>
      )}
    </Suspense>
  );
}
useGLTF.preload('../public/models/works_pole.glb');

export default Works;