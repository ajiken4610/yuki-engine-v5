import { AbstractMesh } from "babylonjs";

export const addMeshShadow = (meshes: AbstractMesh[]) => {
  meshes.forEach((mesh) => {
    mesh.receiveShadows = true;
    addMeshShadow(mesh.getChildMeshes());
  });
};
