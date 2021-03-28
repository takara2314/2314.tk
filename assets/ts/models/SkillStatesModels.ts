import { Object3D, Material } from 'three';

interface SkillStatesModels {
    nodes: {[name: string]: Object3D};
    materials: {[name: string]: Material};
}

export default SkillStatesModels;