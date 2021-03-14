import React, { useEffect, useMemo, PointerEvent } from 'react';
import Base from './Base';
import WorldProps from '../../models/WorldProps';
import SkillSignProps from '../../models/SkillSignProps';

const Skills = (props: WorldProps) => {
  const skillList: string[] = [
    'golang',
    'python',
    'javascript',
    'csharp',
    'dart',
    'swift',
    'html',
    'css',
    'sql',
    'os',
    'infrastructures',
    'tools'
  ]

  useEffect(() => {
    props.changeMemoName('skills');
  }, []);

  return (
    <>
      <Base {...props} />
      <Signs
        {...props}
        position={[0, 25, 0]}
        ratio={5/5}
        radius={9}
        amount={12}
        contents={skillList}
      />
    </>
  );
}

const Signs = (props: WorldProps & SkillSignProps) => {
  const plots: any[] = Array(props.amount);

  const [basePosX, basePosY, basePosZ] = props.position;
  const angle: number = 2 * Math.PI / props.amount;

  for (let i = 0; i < props.amount; i++) {
    plots[i] = useMemo(() => {
      const posX: number = basePosX + props.ratio * props.radius * Math.sin(angle * i);
      const posZ: number = basePosZ + props.ratio * props.radius * Math.cos(angle * i);

      return (
        <mesh
          key={i}
          position={[posX, basePosY, posZ]}
          onPointerDown={(e: PointerEvent<Element>) => {
            props.changeMemoName(props.contents[i]);
            e.stopPropagation();
          }}
          onPointerOver={() => {
            props.changeIsHover(true);
            props.changeHoverPosX(posX);
            props.changeHoverPosY(basePosY);
            props.changeHoverPosZ(posZ);
          }}
        >
          <boxBufferGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={"white"} />
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

export default Skills;