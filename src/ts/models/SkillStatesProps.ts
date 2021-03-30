interface SkillSignProps {
  position:       number[];
  ratio:          number;
  radius:         number;
  amount:         number;
  skillList:      string[];
  skillRatioPosX: number[];
  selection:      boolean[];
  setSelection:   (selection: boolean[]) => void;
}

export default SkillSignProps;