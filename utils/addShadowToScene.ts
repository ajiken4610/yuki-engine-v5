import { Scene, ShadowGenerator } from "babylonjs";

export default (
  scene: Scene,
  keyword: string = "",
  options: {
    blur?: boolean;
    size?: number;
    fullFloat?: boolean;
  } = {}
) => {
  const generators: ShadowGenerator[] = addLightShadow(
    scene.lights,
    scene,
    keyword,
    options
  );
  scene.meshes.forEach((mesh) => {
    mesh.receiveShadows = true;
  });
  return generators;
};
