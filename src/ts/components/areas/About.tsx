import React, { PointerEvent, useEffect, useRef, useState, useMemo, Suspense } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import StrawberrysProps from '../../models/StrawberrysProps';
import TextureSet from '../../models/TextureSet';
import loadBlocksByJSON from '../../services/loadBlocksByJSON';
import { TextureLoader, Mesh, NearestFilter, Vector3 } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFrame } from 'react-three-fiber';
import { useGLTF } from "@react-three/drei";

const About = (props: WorldProps) => {
  // このエリアの地面ブロック
  const [blocks, setBlocks] = useState<any[]>(Array());
  const [loadState, setLoadState] = useState<string>('Loading');

  const controlsRef = useRef<OrbitControls>();

  // 真ん中のたからーん像のテクスチャ
  const parts = ['head', 'body', 'right_hand', 'left_hand'];
  const angles = ['front', 'right', 'back', 'left', 'top', 'bottom'];
  const textures: TextureSet = {};
  parts.map((part: string) => {
    textures[part] = {};
    angles.map((angle: string) => {
      textures[part][angle] = useMemo(() =>
        new TextureLoader().load(
          `../public/textures/takara2314/${part}/${angle}.png`,
          (tex) => {
            // テクスチャをそのままリサイズ
            tex.magFilter = NearestFilter;
          }
        ), []
      );
    });
  });

  // 最初にメモを読み込み
  useEffect(() => {
    props.changeMemoName('intro');
  }, []);

  // 次にマップデータを読み込み
  useEffect(() => {
    fetch('../public/areas/about.json')
    .then(res => res.json())
    .then(
      (result) => {
        // 無事読み込めたらエリアに設置
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

  return (
    <>
      <Base {...props} />
      {blocks}

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('intro');
          e.stopPropagation();
        }}
        onPointerOut={() => {
          props.changeIsHover(false);
        }}
      >
        <mesh
          position={[0, 36.9, 0]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(0);
            props.changeHoverPosY(36.9);
            props.changeHoverPosZ(0);
          }}
          scale={new Vector3(0.65, 0.65, 0.65)}
        >
          <boxBufferGeometry attach="geometry" args={[8, 8, 8]} />
          <meshStandardMaterial map={textures.head.right} attachArray="material" />
          <meshStandardMaterial map={textures.head.left} attachArray="material" />
          <meshStandardMaterial map={textures.head.top} attachArray="material" />
          <meshStandardMaterial map={textures.head.bottom} attachArray="material" />
          <meshStandardMaterial map={textures.head.back} attachArray="material" />
          <meshStandardMaterial map={textures.head.front} attachArray="material" />
        </mesh>
        <mesh
          position={[0, 30.4, 0]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(0);
            props.changeHoverPosY(30.4);
            props.changeHoverPosZ(0);
          }}
          scale={new Vector3(0.65, 0.65, 0.65)}
        >
          <boxBufferGeometry args={[8, 12, 4]} />
          <meshStandardMaterial map={textures.body.right} attachArray="material" />
          <meshStandardMaterial map={textures.body.left} attachArray="material" />
          <meshStandardMaterial map={textures.body.top} attachArray="material" />
          <meshStandardMaterial map={textures.body.bottom} attachArray="material" />
          <meshStandardMaterial map={textures.body.back} attachArray="material" />
          <meshStandardMaterial map={textures.body.front} attachArray="material" />
        </mesh>
        <mesh
          position={[-3.9, 30.4, 0]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(-3.9);
            props.changeHoverPosY(30.4);
            props.changeHoverPosZ(0);
          }}
          scale={new Vector3(0.65, 0.65, 0.65)}
        >
          <boxBufferGeometry args={[4, 12, 4]} />
          <meshStandardMaterial map={textures.left_hand.right} attachArray="material" />
          <meshStandardMaterial map={textures.left_hand.left} attachArray="material" />
          <meshStandardMaterial map={textures.left_hand.top} attachArray="material" />
          <meshStandardMaterial map={textures.left_hand.bottom} attachArray="material" />
          <meshStandardMaterial map={textures.left_hand.back} attachArray="material" />
          <meshStandardMaterial map={textures.left_hand.front} attachArray="material" />
        </mesh>
        <mesh
          position={[3.9, 30.4, 0]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(3.9);
            props.changeHoverPosY(30.4);
            props.changeHoverPosZ(0);
          }}
          scale={new Vector3(0.65, 0.65, 0.65)}
        >
          <boxBufferGeometry args={[4, 12, 4]} />
          <meshStandardMaterial map={textures.right_hand.right} attachArray="material" />
          <meshStandardMaterial map={textures.right_hand.left} attachArray="material" />
          <meshStandardMaterial map={textures.right_hand.top} attachArray="material" />
          <meshStandardMaterial map={textures.right_hand.bottom} attachArray="material" />
          <meshStandardMaterial map={textures.right_hand.back} attachArray="material" />
          <meshStandardMaterial map={textures.right_hand.front} attachArray="material" />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('birthday');
          e.stopPropagation();
        }}
        rotation={[-0.1, 0, 0]}
      >
        <mesh
          position={[4.5, 27, -4.5]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(5);
            props.changeHoverPosY(27);
            props.changeHoverPosZ(-5);
          }}
        >
          <cylinderGeometry args={[2.5, 2.5, 1.8, 12]} />
          <meshStandardMaterial color="rgb(255, 240, 179)" />
        </mesh>
        <Strawberrys
          {...props}
          position={[4.5, 28.2, -4.5]}
          ratio={4/5}
          radius={2.2}
          amount={8}
        />
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('pc');
          e.stopPropagation();
        }}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(-4.5);
          props.changeHoverPosY(27);
          props.changeHoverPosZ(-4.5);
        }}
        position={[2.8, 0.6, 0.5]}
        rotation={[-0.1, 0, 0.1]}
      >
        <mesh
          position={[-4.5, 27, -4.5]}
        >
          <boxBufferGeometry args={[5, 0.25, 4]} />
          <meshStandardMaterial color="rgb(30, 30, 30)" />
        </mesh>
        <mesh
          position={[-4.5, 28.9, -2]}
          rotation={[Math.PI * 3/5, 0, 0]}
        >
          <boxBufferGeometry args={[5, 0.25, 4]} />
          <meshStandardMaterial color="rgb(30, 30, 30)" />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('minecraft');
          e.stopPropagation();
        }}
        position={[8, 26.5, -0.5]}
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
          <meshStandardMaterial color={"green"} />
        </mesh>
      </group>

      <group
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('wishlist');
          e.stopPropagation();
        }}
        position={[-6, 28, 6]}
        rotation={[Math.PI * -20/180, Math.PI * -45/180, Math.PI * 5/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(8);
          props.changeHoverPosY(26.5);
          props.changeHoverPosZ(-0.5);
        }}
      >
        <mesh>
          <boxBufferGeometry args={[3.5, 4, 2]} />
          <meshStandardMaterial color={"darkorange"} />
        </mesh>
        <mesh
          position={[1, 2.8, 0.3]}
          rotation={[Math.PI * -17.5/180, 0, 0]}
        >
          <boxBufferGeometry args={[0.4, 1.75, 0.4]} />
          <meshStandardMaterial color={"darkorange"} />
        </mesh>
        <mesh
          position={[-1, 2.8, 0.3]}
          rotation={[Math.PI * -17.5/180, 0, 0]}
        >
          <boxBufferGeometry args={[0.4, 1.75, 0.4]} />
          <meshStandardMaterial color={"darkorange"} />
        </mesh>
        <mesh
          position={[1, 2.8, -0.3]}
          rotation={[Math.PI * 17.5/180, 0, 0]}
        >
          <boxBufferGeometry args={[0.4, 1.75, 0.4]} />
          <meshStandardMaterial color={"darkorange"} />
        </mesh>
        <mesh
          position={[-1, 2.8, -0.3]}
          rotation={[Math.PI * 17.5/180, 0, 0]}
        >
          <boxBufferGeometry args={[0.4, 1.75, 0.4]} />
          <meshStandardMaterial color={"darkorange"} />
        </mesh>
        <mesh
          position={[0, 3.6, 0]}
        >
          <boxBufferGeometry args={[2.4, 0.4, 0.4]} />
          <meshStandardMaterial color={"darkorange"} />
        </mesh>
      </group>

      <Dream {...props} />
    </>
  );
}

// 夢マークのコンポーネント
const Dream = (props: WorldProps) => {
  // モデルをロード
  const { nodes, materials } = useGLTF('../public/models/dream.glb');

  return (
    <Suspense fallback={null}>
      <mesh
        onPointerDown={(e: PointerEvent<Element>) => {
          props.changeMemoName('dream');
          e.stopPropagation();
        }}
        position={[1.5, 26.9, 6.5]}
        rotation={[Math.PI * 85/180, 0, Math.PI * -45/180]}
        onPointerOver={() => {
          props.changeIsHover(true);
          props.changeHoverPosX(1.5);
          props.changeHoverPosY(26.9);
          props.changeHoverPosZ(6.5);
        }}
        scale={new Vector3(5, 5, 5)}
        geometry={(nodes.text as Mesh).geometry}
        material={materials.text}
      />
    </Suspense>
  );
}
// モデルをプリロード
useGLTF.preload('../public/models/dream.glb');

// いちごを円になるように配置する
const Strawberrys = (props: WorldProps & StrawberrysProps) => {
  // いちごの要素
  const plots: any[] = Array(props.amount);
  // 中心の位置
  const [basePosX, basePosY, basePosZ] = props.position;
  // 角度 (ラジアン角)
  const angle: number = 2 * Math.PI / props.amount;

  for (let i = 0; i < props.amount; i++) {
    plots[i] = useMemo(() => {
      // X座標: 元のX座標 + (半径の比率 × 半径) × sin(角度)
      const posX: number = basePosX + props.ratio * props.radius * Math.sin(angle * i);
      // Z座標: 元のZ座標 + (半径の比率 × 半経) × cos(角度)
      const posZ: number = basePosZ + props.ratio * props.radius * Math.cos(angle * i);

      return (
        <mesh
          key={i}
          position={[posX, basePosY, posZ]}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(posX);
            props.changeHoverPosY(basePosY);
            props.changeHoverPosZ(posZ);
          }}
        >
          <boxBufferGeometry args={[0.5, 0.6, 0.5]} />
          <meshStandardMaterial color={"red"} />
        </mesh>
      );
    }, []);
  }

  return (
    <>
      {plots}
    </>
  );
}

export default About;
