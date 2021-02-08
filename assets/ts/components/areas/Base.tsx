import React, { useEffect, useRef, useState } from 'react';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFrame } from 'react-three-fiber';

type BaseProps = {
  posX: number;
  posY: number;
  posZ: number;
  changePosX: (x: number) => void;
  changePosY: (y: number) => void;
  changePosZ: (z: number) => void;

  isHover:   boolean;
  hoverPosX: number;
  hoverPosY: number;
  hoverPosZ: number;
  changeIsHover:   (flag: boolean) => void;
  changeHoverPosX: (x: number) => void;
  changeHoverPosY: (y: number) => void;
  changeHoverPosZ: (z: number) => void;
}

const Base: React.FC<BaseProps> = (props: BaseProps) => {
  const [blocks, setBlocks] = useState<any[]>(Array());
  const [loadState, setLoadState] = useState<string>('Loading');

  const controlsRef = useRef<OrbitControls>();

  useEffect(() => {
    fetch('http://localhost:2314/public/areas/base.json')
    .then(res => res.json())
    .then(
      (result) => {
        setBlocksByJSON(result);
        setLoadState('OK');
      },
      (error) => {
        setLoadState('Error');
      }
    )
  }, []);

  useFrame(({camera}) => {
    controlsRef.current?.update();

    props.changePosX(camera.position.x);
    props.changePosY(camera.position.y);
    props.changePosZ(camera.position.z);
  });

  const chooseBlock = (floorBlock: string): string => {
    if (floorBlock == 'stone') {
      return Math.random() >= 0.5 ? "rgb(150, 150, 150)" : "rgb(140, 140, 140))";
    }
    return Math.random() >= 0.5 ? "rgb(0, 255, 127)" : "rgb(0, 191, 95)";
  }

  const setBlocksByJSON = (json: any) => {
    let blocksTemp: any[] = Array();

    for (let y in json.area) {
      console.log(y);
      for (let x in json.area[y].hit) {
        for (let z in json.area[y].hit[x]) {
          if (json.area[y].hit[x][z]) {
            console.log(`${x} / ${y} / ${z}`);
            blocksTemp.push(
              <mesh
                position={[Number(x), Number(y), Number(z)]}
                onPointerOver={() => {
                  props.changeIsHover(true);
                  props.changeHoverPosX(Number(x));
                  props.changeHoverPosY(Number(y));
                  props.changeHoverPosZ(Number(z));
                }}
                onPointerOut={() => {
                  props.changeIsHover(false);
                }}
                onClick={() => console.log(`${x} / ${y} / ${z}`)}
              >
                <boxBufferGeometry args={[1, 1, 1]} />
                <meshStandardMaterial color={
                  chooseBlock(json.area[y].block)
                } />
              </mesh>
            );
          }
        }
      }
    }

    setBlocks(blocksTemp);
  };

  return (
    <>
      {blocks}
    </>
  );
}

export default Base;