import React, { PointerEvent } from 'react';
import WorldProps from '../models/WorldProps';

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

const chooseBlock = (props: WorldProps, floorBlock: string): string => {
  if (props.place == 'lab') {
    if (floorBlock == 'grass') {
      return Math.random() >= 0.5 ? "rgb(255, 215, 0)" : "rgb(204, 173, 0)";
    }
  }

  if (floorBlock == 'grass') {
    return Math.random() >= 0.5 ? "rgb(0, 255, 127)" : "rgb(0, 191, 95)";
  }
  return Math.random() >= 0.5 ? "rgb(150, 150, 150)" : "rgb(140, 140, 140))";
}

export default loadBlocksByJSON;