import React, { PointerEvent } from 'react';
import WorldProps from '../models/WorldProps';

// 受け取ったJSONからブロックデータを読み込み
const loadBlocksByJSON = (props: WorldProps, json: any, intercepts: number[]): any[] => {
  let blocksTemp: any[] = Array();

  for (let y in json.area) {
    for (let x in json.area[y].hit) {
      for (let z in json.area[y].hit[x]) {
        if (json.area[y].hit[x][z]) {
          const factX: number = Number(x) - Math.floor(json.area[y].hit.length/2) + intercepts[0];
          const factY: number = Number(y) + intercepts[1];
          const factZ: number = Number(z) - Math.floor(json.area[y].hit[x].length/2) + intercepts[2];

          blocksTemp.push(
            <mesh
              key={Number(x)*10000 + Number(y)*100 + Number(z)}
              position={[factX, factY, factZ]}
              onPointerDown={(e: PointerEvent<Element>) => {
                e.stopPropagation();
              }}
              onPointerOver={() => {
                props.changeIsHover(true);
                props.changeHoverPosX(factX);
                props.changeHoverPosY(factY);
                props.changeHoverPosZ(factZ);
              }}
              onPointerOut={() => {
                props.changeIsHover(false);
              }}
            >
              <boxBufferGeometry args={[1, 1, 1]} />
              <meshStandardMaterial color={
                chooseBlock(props, json.area[y].block)
              } />
            </mesh>
          );
        }
      }
    }
  }

  return blocksTemp;
}

// ブロックの色をランダムで返す関数
const chooseBlock = (props: WorldProps, floorBlock: string): string => {
  // 地面の色
  const grassColor: {[place: string]: string[]} = {
    // 緑
    'about': [
      'rgb(0, 255, 127)',
      'rgb(0, 191, 95)'
    ],
    // オレンジ
    'skills': [
      'rgb(255, 165, 0)',
      'rgb(204, 133, 0)'
    ],
    // 青
    'works': [
      'rgb(0, 136, 204)',
      'rgb(0, 116, 173)'
    ],
    // 黄
    'favorites': [
      'rgb(255, 215, 0)',
      'rgb(204, 173, 0)'
    ],
    // 白
    'lab': [
      'rgb(230, 230, 230)',
      'rgb(200, 200, 200)'
    ]
  };

  // 石の色
  const stoneColor: string[] = [
    'rgb(150, 150, 150)',
    'rgb(140, 140, 140)'
  ];

  // 50%の確立でどちらかに分かれる
  if (floorBlock == 'grass') {
    return Math.random() >= 0.5 ? grassColor[props.place][0] : grassColor[props.place][1];
  }
  return Math.random() >= 0.5 ? stoneColor[0] : stoneColor[1];
}

export default loadBlocksByJSON;