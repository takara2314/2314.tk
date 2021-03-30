import React, { useEffect, useMemo, useState, PointerEvent, Suspense } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import SkillStatesProps from '../../models/SkillStatesProps';
import { Mesh } from 'three';
import { useGLTF } from "@react-three/drei";

const Skills = (props: WorldProps) => {
  const [selection, setSelection] = useState<boolean[]>([
    false, false, false, false,
    false, false, false, false,
    false, false, false, false
  ]);

  useEffect(() => {
    props.changeMemoName('skills');
  }, []);

  return (
    <>
      <Base {...props} />
      <SkillStates
        {...props}
        position={[0, 25, 0]}
        ratio={4/5}
        radius={9}
        amount={12}
        skillList={[
          'html', 'swift', 'dart', 'csharp',
          'javascript', 'python', 'golang', 'tools',
          'infrastructures', 'os','sql', 'css'
        ]}
        skillRatioPosX={[
          20/2, 13/2, 27/4, 14/2,
          25/4, 27/4, 12/2, 13/2,
          13/2, 25/4, 27/4, 18/2
        ]}
        selection={selection}
        setSelection={setSelection}
      />
    </>
  );
}

const SkillStates = (props: WorldProps & SkillStatesProps) => {
  const plots: any[] = Array(props.amount);

  const [basePosX, basePosY, basePosZ] = props.position;
  const angle: number = 2 * Math.PI / props.amount;

  for (let i = 0; i < props.amount; i++) {
    plots[i] = useMemo(() => {
      const posX: number = basePosX + props.ratio * props.radius * Math.sin(angle * i);
      const posZ: number = basePosZ + props.ratio * props.radius * Math.cos(angle * i);

      return (
        <group
          key={i}
          position={[posX, basePosY, posZ]}
          rotation={[
            Math.PI * 0/180,
            (1/2 * Math.PI) + ((2 * Math.PI) * (i / props.amount)),
            Math.PI * 0/180
          ]}
          onPointerDown={(e: PointerEvent<Element>) => {
            const tmp: boolean[] = Array<boolean>(props.amount);
            tmp.fill(false);
            tmp[i] = true;
            props.setSelection(tmp);

            props.changeMemoName(props.skillList[i]);
            e.stopPropagation();
          }}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(posX);
            props.changeHoverPosY(basePosY);
            props.changeHoverPosZ(posZ);
          }}
        >
          <SkillState
            skill={props.skillList[i]}
            ratioPosX={props.skillRatioPosX[i]}
            selection={props.selection}
            thisNum={i}
          />
        </group>
      );
    }, [props.selection]);
  }

  return (
    <>
      {plots}
    </>
  );
}

const SkillState = (props: {skill: string, ratioPosX: number, selection: boolean[], thisNum: number}) => {
  const { nodes, materials } = useGLTF(`../public/models/${props.skill}-state.glb`);

  return (
    <Suspense fallback={null}>
      <mesh
        position={[
          nodes.skill.position.x * props.ratioPosX,
          nodes.skill.position.y * 1/2,
          nodes.skill.position.z * 1/2
        ]}
        rotation={[
          nodes.skill.rotation.x,
          nodes.skill.rotation.y,
          nodes.skill.rotation.z
        ]}
        scale={[
          nodes.skill.scale.x * 1/2,
          nodes.skill.scale.y * 1/2,
          nodes.skill.scale.z * 1/2
        ]}
        geometry={(nodes.skill as Mesh).geometry}
        material={materials.skill}
      />
      <mesh
        position={[0, 0, 0]}
        scale={[1, 1, 1]}
        geometry={(nodes.state as Mesh).geometry}
      >
        <meshStandardMaterial
          color={props.selection[props.thisNum]
            ? 'rgb(255, 255, 255)'
            : 'rgb(220, 220, 220)'
          }
        />
      </mesh>
    </Suspense>
  );
}
useGLTF.preload('../public/models/html-state.glb');
useGLTF.preload('../public/models/swift-state.glb');
useGLTF.preload('../public/models/dart-state.glb');
useGLTF.preload('../public/models/csharp-state.glb');
useGLTF.preload('../public/models/javascript-state.glb');
useGLTF.preload('../public/models/python-state.glb');
useGLTF.preload('../public/models/golang-state.glb');
useGLTF.preload('../public/models/tools-state.glb');
useGLTF.preload('../public/models/infrastructures-state.glb');
useGLTF.preload('../public/models/os-state.glb');
useGLTF.preload('../public/models/sql-state.glb');
useGLTF.preload('../public/models/css-state.glb');

export default Skills;