import React, { useCallback, useEffect, PointerEvent, Suspense, useState } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import WorksPoleProps from '../../models/WorksPoleProps';
import { Mesh, Vector3 } from 'three';
import { useGLTF, Text } from "@react-three/drei";

const Works = (props: WorldProps) => {
  // Worksエリア内の現在の場所名
  const [nowAzimuth, setNowAzimuth] = useState<string>('south');
  // Worksで呼び出すメモ一覧
  const memos: {[azimuth: string]: string[]} = {
    north: [
      'foxseed', 'html-geter', 'school-bytrain', 'kadai-alarm'
    ],
    east: [
      'happynewyear2020', 'ut2', 'awareshe', 'nlns'
    ],
    south:[
      'kadaistore', 'kadaistore-api', '2314tk', 'nenga2021'
    ],
    west: [
      'codemple', 'emoface', 'not-secretmemo', 'mcstarpark'
    ]
  };

  // 最初にメモを読み込み
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
          <meshStandardMaterial color={(
            () => {
              switch (nowAzimuth) {
                case 'north':
                  return 'rgb(255, 204, 204)'
                case 'east':
                  return 'rgb(204, 255, 204)'
                case 'south':
                  return 'rgb(191, 191, 255)'
                case 'west':
                  return 'rgb(255, 255, 191)'
              }
            }
            )()}
          />
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
          <meshStandardMaterial color={(
            () => {
              switch (nowAzimuth) {
                case 'north':
                  return 'rgb(255, 204, 204)'
                case 'east':
                  return 'rgb(204, 255, 204)'
                case 'south':
                  return 'rgb(191, 191, 255)'
                case 'west':
                  return 'rgb(255, 255, 191)'
              }
            }
            )()}
          />
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
          <meshStandardMaterial color={(
            () => {
              switch (nowAzimuth) {
                case 'north':
                  return 'rgb(255, 204, 204)'
                case 'east':
                  return 'rgb(204, 255, 204)'
                case 'south':
                  return 'rgb(191, 191, 255)'
                case 'west':
                  return 'rgb(255, 255, 191)'
              }
            }
            )()}
          />
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
          <meshStandardMaterial color={(
            () => {
              switch (nowAzimuth) {
                case 'north':
                  return 'rgb(255, 204, 204)'
                case 'east':
                  return 'rgb(204, 255, 204)'
                case 'south':
                  return 'rgb(191, 191, 255)'
                case 'west':
                  return 'rgb(255, 255, 191)'
              }
            }
            )()}
          />
        </mesh>
      </group>

      <WorksPole {...props} nowAzimuth={nowAzimuth} changeNowAzimuth={setNowAzimuth} />
    </>
  );
}

// 中央のボタンの塔
const WorksPole = (props: WorldProps & WorksPoleProps) => {
  // モデルをロード
  const { nodes, materials } = useGLTF('../public/models/works_pole.glb');
  // ボタンが押されているかどうか
  // デフォルトとして、南エリアのボタンは押されていることにする
  const [pressed, setPressed] = useState<boolean[]>([
    false, false, true, false
  ]);

  // // 位置デバッグ用コード
  // const [debugX, setX] = useState<number>(0);
  // const [debugY, setY] = useState<number>(180);
  // const [debugZ, setZ] = useState<number>(0);

  // const moveKeydown = useCallback((e: KeyboardEvent) => {
  //   console.log(`${debugX} / ${debugY} / ${debugZ}`);
  //   if (e.key == 'x') {
  //     setX(debugX+45);
  //   }
  //   if (e.key == '1') {
  //     setX(debugX-45);
  //   }
  //   if (e.key == 'y') {
  //     setY(debugY+45);
  //   }
  //   if (e.key == '2') {
  //     setY(debugY-45);
  //   }
  //   if (e.key == 'z') {
  //     setZ(debugZ+45);
  //   }
  //   if (e.key == '3') {
  //     setZ(debugZ-45);
  //   }
  // }, [debugX, debugY, debugZ]);

  // useEffect(() => {
  //   window.addEventListener('keydown', moveKeydown);
  //   return () => window.removeEventListener('keydown', moveKeydown);
  // }, [debugX, debugY, debugZ]);

  // 場所一覧
  const azimuthNames: string[] = [
    'north', 'east', 'south', 'west'
  ];
  // 押されていないときのボタンの位置
  const azimuthButtonPosStaying: number[][] = [
    [0, 34.5, 1.5],
    [-1.5, 34.5, 0],
    [0, 34.5, -1.5],
    [1.5, 34.5, 0]
  ];
  // 押されたときのボタンの位置
  const azimuthButtonPosPressed: number[][] = [
    [0, 34.5, 1.3],
    [-1.3, 34.5, 0],
    [0, 34.5, -1.3],
    [1.3, 34.5, 0]
  ];
  // ボタンの角度
  const azimuthButtonRot: number[][] = [
    [-90, 0, 0],
    [0, 0, -90],
    [90, 0, 0],
    [0, 0, 90]
  ];
  // 塔の3D文字の位置
  const azimuthTextPos: number[][] = [
    [-0.8, 32.8, 1.65],
    [-1.65, 32.8, -0.8],
    [0.8, 32.8, -1.65],
    [1.65, 32.8, 0.8],
  ];
  // 塔の3D文字の角度
  const azimuthTextRot: number[][] = [
    [90, 270, 0],
    [180, 0, 90],
    [-90, 90, 0],
    [180, 180, -270]
  ];

  // ボタンが押されたときの処理
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
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        fontSize={0.5}
        position={[0.5, 34, 2]}
        rotation={[0, Math.PI * 0 / 180, 0]}
      >
        {props.nowAzimuth === 'north'
          ? ''
          : 'Click!'
        }
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        fontSize={0.5}
        position={[-2, 34, 0.5]}
        rotation={[0, Math.PI * 270 / 180, 0]}
      >
        {props.nowAzimuth === 'east'
          ? ''
          : 'Click!'
        }
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        fontSize={0.5}
        position={[-0.5, 34, -2]}
        rotation={[0, Math.PI * 180 / 180, 0]}
      >
        {props.nowAzimuth === 'south'
          ? ''
          : 'Click!'
        }
      </Text>
      <Text
        color="black"
        anchorX="center"
        anchorY="middle"
        fontSize={0.5}
        position={[2, 34, -0.5]}
        rotation={[0, Math.PI * 90 / 180, 0]}
      >
        {props.nowAzimuth === 'west'
          ? ''
          : 'Click!'
        }
      </Text>

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
// モデルをプリロード
useGLTF.preload('../public/models/works_pole.glb');

export default Works;