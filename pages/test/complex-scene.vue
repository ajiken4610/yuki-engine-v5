<template lang="pug">
div
  canvas.load-scene(ref="canvasRef")
</template>

<script setup lang="ts">
import {
  Engine,
  SSAORenderingPipeline,
  SSRRenderingPipeline,
  SceneLoader,
} from "babylonjs";
import modelPath from "assets/complex-test.glb?url";
import "babylonjs-loaders";
// import { MeshBuilder } from 'babylonjs';
const canvasRef = ref<HTMLCanvasElement>();
onMounted(() => {
  const canvas = canvasRef.value!;
  let outerEngine: Engine;
  createEngine(canvas).then((engine) => {
    outerEngine = engine;
    const scene = createScene(engine);
    scene.clearColor.set(0, 0, 0, 1);
    new SSAORenderingPipeline("ssao", scene, 0.75);
    new SSRRenderingPipeline("ssr", scene);
    // ssr.debug = true
    // SceneLoader.ShowLoadingScreen = false
    // const box = MeshBuilder.CreateBox("box", undefined, scene)
    // box.position.y = 3
    SceneLoader.AppendAsync(modelPath, undefined, scene).then(() => {
      const camera = scene.getCameraByName("Camera")!;
      scene.activeCamera = camera;
      camera.attachControl(canvas);
      addShadowToScene(scene, "", { blur: true });
      scene.lights.forEach((light) => {
        light.intensity *= 0.1;
      });
      scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
        "ssao",
        camera
      );
      scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline(
        "ssr",
        camera
      );
      engine.runRenderLoop(() => {
        scene.render();
      });
    });
  });

  onUnmounted(() => {
    outerEngine.dispose();
  });
});
</script>

<style lang="scss">
html,
body {
  margin: 0 auto;
}
</style>

<style scoped lang="scss">
.load-scene {
  height: 90vh;
  width: 100vw;
}
</style>
