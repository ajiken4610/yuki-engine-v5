import { IShadowLight, Light, Scene, ShadowGenerator } from "babylonjs";

export default (
  lights: Light[],
  scene: Scene,
  keyword: string = "",
  options: {
    blur?: boolean;
    size?: number;
    fullFloat?: boolean;
  } = {}
) => {
  const generators: ShadowGenerator[] = [];
  lights.forEach((light) => {
    if (light.name.indexOf(keyword) === -1) {
      return;
    }
    const shadowGenerator = new ShadowGenerator(
      options.size || 1024,
      light as IShadowLight,
      !!options.fullFloat
    );
    generators.push(shadowGenerator);
    shadowGenerator.useBlurExponentialShadowMap = !!options.blur;
    shadowGenerator.useKernelBlur = true;
    shadowGenerator.blurKernel = 8;
    shadowGenerator.bias = options.blur ? 0.01 : 0.0001;
    shadowGenerator.getShadowMap()!.renderList = scene.meshes;
  });
  return generators;
};
