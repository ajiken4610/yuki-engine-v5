<template lang="pug">
div
  canvas.load-scene(ref="canvasRef")
</template>

<script setup lang="ts">
import { SSAORenderingPipeline, SceneLoader } from 'babylonjs'
import modelPath from "assets/test.glb?url"
import 'babylonjs-loaders';
// import { MeshBuilder } from 'babylonjs';
const canvasRef = ref<HTMLCanvasElement>()
onMounted(() => {
  const canvas = canvasRef.value!
  const engine = createEngine(canvas)
  const scene = createScene(engine)
  scene.clearColor.set(0, 0, 0, 1)
  const ssao = new SSAORenderingPipeline("ssao", scene, .75)
  // SceneLoader.ShowLoadingScreen = false
  // const box = MeshBuilder.CreateBox("box", undefined, scene)
  // box.position.x = 3
  SceneLoader.AppendAsync(modelPath, undefined, scene).then(() => {
    const camera = scene.getCameraByName("Camera.001")!
    scene.activeCamera = camera;
    camera.attachControl(canvas)
    addShadowToScene(scene, "", { blur: false })
    scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("ssao", camera);
    engine.runRenderLoop(() => {
      scene.render();
    });
  })

  onUnmounted(() => {
    ssao.dispose()
    engine.dispose()
  })
})

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