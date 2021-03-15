import React, { PointerEvent, useEffect, useState, useCallback } from 'react';
import Base from './Base';
import loadBlocksByJSON from '../../services/loadBlocksByJSON';
import WorldProps from '../../models/WorldProps';

const Favorites = (props: WorldProps) => {
  const [blocks, setBlocks] = useState<any[]>(Array());
  const [loadState, setLoadState] = useState<string>('Loading');

  const [selection, setSelection] = useState<number>(0);
  const [tmpX0, setTmpX0] = useState<number>(8);
  const [tmpY0, setTmpY0] = useState<number>(26.5);
  const [tmpZ0, setTmpZ0] = useState<number>(-0.5);
  const [tmpX1, setTmpX1] = useState<number>(0.5);
  const [tmpY1, setTmpY1] = useState<number>(26.5);
  const [tmpZ1, setTmpZ1] = useState<number>(8);
  const [tmpX2, setTmpX2] = useState<number>(2);
  const [tmpY2, setTmpY2] = useState<number>(26.5);
  const [tmpZ2, setTmpZ2] = useState<number>(4);
  const [tmpX3, setTmpX3] = useState<number>(4);
  const [tmpY3, setTmpY3] = useState<number>(26.5);
  const [tmpZ3, setTmpZ3] = useState<number>(2);
  const [tmpX4, setTmpX4] = useState<number>(5);
  const [tmpY4, setTmpY4] = useState<number>(26.5);
  const [tmpZ4, setTmpZ4] = useState<number>(1);
  const [tmpX5, setTmpX5] = useState<number>(-5);
  const [tmpY5, setTmpY5] = useState<number>(26.5);
  const [tmpZ5, setTmpZ5] = useState<number>(-1);
  const [tmpX6, setTmpX6] = useState<number>(3);
  const [tmpY6, setTmpY6] = useState<number>(26.5);
  const [tmpZ6, setTmpZ6] = useState<number>(3);
  const [tmpX7, setTmpX7] = useState<number>(0.5);
  const [tmpY7, setTmpY7] = useState<number>(26.5);
  const [tmpZ7, setTmpZ7] = useState<number>(-8);

  useEffect(() => {
    props.changeMemoName('favorites');
  }, []);

  useEffect(() => {
    fetch('../public/areas/favorites.json')
    .then(res => res.json())
    .then(
      (result) => {
        setBlocks(
          loadBlocksByJSON(
            props,
            result,
            [0, 25, 0]
          )
        );
        setLoadState('OK');
      },
      (error) => {
        setLoadState('Error');
      }
    )
  }, [props.place]);

  useEffect(() => {
    window.addEventListener('keydown', debugPos);

    return () => window.removeEventListener('keydown', debugPos);
  }, [selection, tmpX0, tmpX1, tmpX2, tmpX3, tmpX4, tmpX5, tmpX6, tmpX7, tmpY0, tmpY1, tmpY2, tmpY3, tmpY4, tmpY5, tmpY6, tmpY7, tmpZ0, tmpZ1, tmpZ2, tmpZ3, tmpZ4, tmpZ5, tmpZ6, tmpZ7]);

  const debugPos = useCallback((e: KeyboardEvent) => {
    if (e.key == '1') {
      switch (selection) {
        case 0:
          setTmpX0(tmpX0+0.5);
          break;
        case 1:
          setTmpX1(tmpX1+0.5);
          break;
        case 2:
          setTmpX2(tmpX2+0.5);
          break;
        case 3:
          setTmpX3(tmpX3+0.5);
          break;
        case 4:
          setTmpX4(tmpX4+0.5);
          break;
        case 5:
          setTmpX5(tmpX5+0.5);
          break;
        case 6:
          setTmpX6(tmpX6+0.5);
          break;
        case 7:
          setTmpX7(tmpX7+0.5);
          break;
      }
    }

    if (e.key == '2') {
      switch (selection) {
        case 0:
          setTmpY0(tmpY0+0.5);
          break;
        case 1:
          setTmpY1(tmpY1+0.5);
          break;
        case 2:
          setTmpY2(tmpY2+0.5);
          break;
        case 3:
          setTmpY3(tmpY3+0.5);
          break;
        case 4:
          setTmpY4(tmpY4+0.5);
          break;
        case 5:
          setTmpY5(tmpY5+0.5);
          break;
        case 6:
          setTmpY6(tmpY6+0.5);
          break;
        case 7:
          setTmpY7(tmpY7+0.5);
          break;
      }
    }

    if (e.key == '3') {
      switch (selection) {
        case 0:
          setTmpZ0(tmpZ0+0.5);
          break;
        case 1:
          setTmpZ1(tmpZ1+0.5);
          break;
        case 2:
          setTmpZ2(tmpZ2+0.5);
          break;
        case 3:
          setTmpZ3(tmpZ3+0.5);
          break;
        case 4:
          setTmpZ4(tmpZ4+0.5);
          break;
        case 5:
          setTmpZ5(tmpZ5+0.5);
          break;
        case 6:
          setTmpZ6(tmpZ6+0.5);
          break;
        case 7:
          setTmpZ7(tmpZ7+0.5);
          break;
      }
    }

    if (e.key == '4') {
      switch (selection) {
        case 0:
          setTmpX0(tmpX0-0.5);
          break;
        case 1:
          setTmpX1(tmpX1-0.5);
          break;
        case 2:
          setTmpX2(tmpX2-0.5);
          break;
        case 3:
          setTmpX3(tmpX3-0.5);
          break;
        case 4:
          setTmpX4(tmpX4-0.5);
          break;
        case 5:
          setTmpX5(tmpX5-0.5);
          break;
        case 6:
          setTmpX6(tmpX6-0.5);
          break;
        case 7:
          setTmpX7(tmpX7-0.5);
          break;
      }
    }

    if (e.key == '5') {
      switch (selection) {
        case 0:
          setTmpY0(tmpY0-0.5);
          break;
        case 1:
          setTmpY1(tmpY1-0.5);
          break;
        case 2:
          setTmpY2(tmpY2-0.5);
          break;
        case 3:
          setTmpY3(tmpY3-0.5);
          break;
        case 4:
          setTmpY4(tmpY4-0.5);
          break;
        case 5:
          setTmpY5(tmpY5-0.5);
          break;
        case 6:
          setTmpY6(tmpY6-0.5);
          break;
        case 7:
          setTmpY7(tmpY7-0.5);
          break;
      }
    }

    if (e.key == '6') {
      switch (selection) {
        case 0:
          setTmpZ0(tmpZ0-0.5);
          break;
        case 1:
          setTmpZ1(tmpZ1-0.5);
          break;
        case 2:
          setTmpZ2(tmpZ2-0.5);
          break;
        case 3:
          setTmpZ3(tmpZ3-0.5);
          break;
        case 4:
          setTmpZ4(tmpZ4-0.5);
          break;
        case 5:
          setTmpZ5(tmpZ5-0.5);
          break;
        case 6:
          setTmpZ6(tmpZ6-0.5);
          break;
        case 7:
          setTmpZ7(tmpZ7-0.5);
          break;
      }
    }

    if (e.key == 'q') {
      switch (selection) {
        case 0:
          console.log(`0: ${tmpX0} / ${tmpY0} / ${tmpZ0}`);
          break;
        case 1:
          console.log(`1: ${tmpX1} / ${tmpY1} / ${tmpZ1}`);
          break;
        case 2:
          console.log(`2: ${tmpX2} / ${tmpY2} / ${tmpZ2}`);
          break;
        case 3:
          console.log(`3: ${tmpX3} / ${tmpY3} / ${tmpZ3}`);
          break;
        case 4:
          console.log(`4: ${tmpX4} / ${tmpY4} / ${tmpZ4}`);
          break;
        case 5:
          console.log(`5: ${tmpX5} / ${tmpY5} / ${tmpZ5}`);
          break;
        case 6:
          console.log(`6: ${tmpX6} / ${tmpY6} / ${tmpZ6}`);
          break;
        case 7:
          console.log(`7: ${tmpX7} / ${tmpY7} / ${tmpZ7}`);
          break;
      }
    }
  }, [selection, tmpX0, tmpX1, tmpX2, tmpX3, tmpX4, tmpX5, tmpX6, tmpX7, tmpY0, tmpY1, tmpY2, tmpY3, tmpY4, tmpY5, tmpY6, tmpY7, tmpZ0, tmpZ1, tmpZ2, tmpZ3, tmpZ4, tmpZ5, tmpZ6, tmpZ7]);

  return (
    <>
      <Base {...props} />
      {blocks}

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('programming');
          setSelection(0);
          e.stopPropagation();
        }}
        position={[tmpX0, tmpY0, tmpZ0]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(8);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-0.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('gaming');
          setSelection(1);
          e.stopPropagation();
        }}
        position={[tmpX1, tmpY1, tmpZ1]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0.5);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(8);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"pink"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('music');
          setSelection(2);
          e.stopPropagation();
        }}
        position={[tmpX2, tmpY2, tmpZ2]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(2);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(4);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"orange"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('painting');
          setSelection(3);
          e.stopPropagation();
        }}
        position={[tmpX3, tmpY3, tmpZ3]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(4);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(2);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"yellow"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('foods');
          setSelection(4);
          e.stopPropagation();
        }}
        position={[tmpX4, tmpY4, tmpZ4]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(5);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(1);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"lightgreen"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('kawaii');
          setSelection(5);
          e.stopPropagation();
        }}
        position={[tmpX5, tmpY5, tmpZ5]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-5);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-1);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('anime');
          setSelection(6);
          e.stopPropagation();
        }}
        position={[tmpX6, tmpY6, tmpZ6]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(3);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(3);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"blue"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('with-someone');
          setSelection(7);
          e.stopPropagation();
        }}
        position={[tmpX7, tmpY7, tmpZ7]}
        rotation={[0, Math.PI * -15/180, Math.PI * 15/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(0.4);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-8);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 3.5, 3.5]} />
          <meshStandardMaterial color={"purple"} />
        </mesh>
      </group>
    </>
  );
}

export default Favorites;