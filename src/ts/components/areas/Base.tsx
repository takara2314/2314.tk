import React, { useEffect, useRef, useState } from 'react';
import WorldProps from '../../models/WorldProps';
import loadBlocksByJSON from '../../services/loadBlocksByJSON';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { useFrame } from 'react-three-fiber';

// ベースの地面コンポーネント
const Base = (props: WorldProps) => {
  const [blocks, setBlocks] = useState<any[]>(Array());
  const [loadState, setLoadState] = useState<string>('Loading');

  const controlsRef = useRef<OrbitControls>();

  // 最初にブロックデータを読み込み
  useEffect(() => {
    fetch('./public/areas/base.json')
    .then(res => res.json())
    .then(
      (result) => {
        // 無事読み込めたらエリアに設置
        setBlocks(
          loadBlocksByJSON(
            props,
            result,
            [0, 0, 0]
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
      {blocks}
    </>
  );
}

export default Base;