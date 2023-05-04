import { type IShadowLight, Scene, ShadowGenerator } from "babylonjs";

export default (
  scene: Scene,
  keyword: string = "",
  options: {
    blur?: boolean;
    size?: number;
    fullFloat?: boolean;
  } = {}
) => {
  scene.lights.forEach((light) => {
    // light.intensity *= .1
    if (light.name.indexOf(keyword) === -1) {
      return;
    }
    const shadowGenerator = new ShadowGenerator(
      options.size || 1024,
      light as IShadowLight,
      !!options.fullFloat
    );
    shadowGenerator.useBlurExponentialShadowMap = !!options.blur;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 8;
    shadowGenerator.bias = 0.0001;
    scene.meshes.forEach((mesh) => {
      shadowGenerator.addShadowCaster(mesh, false);
    });
  });
  scene.meshes.forEach((mesh) => {
    mesh.receiveShadows = true;
  });
};