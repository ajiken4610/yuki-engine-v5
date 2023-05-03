<template lang="pug">
div
  canvas.load-scene(ref="canvasRef")
</template>

<script setup lang="ts">
import { IShadowLight, SceneLoader, ShadowGenerator } from 'babylonjs'
import modelPath from "assets/test.glb?url"
import 'babylonjs-loaders';
const canvasRef = ref<HTMLCanvasElement>()
onMounted(() => {
  const canvas = canvasRef.value!
  const engine = createEngine(canvas)
  const scene = createScene(engine)
  scene.clearColor.set(.5, .5, .5, 1)
  // SceneLoader.ShowLoadingScreen = false
  SceneLoader.AppendAsync(modelPath, undefined, scene).then(() => {
    const camera = scene.getCameraByName("Camera.001")!
    scene.activeCamera = camera;
    camera.attachControl(canvas)
    scene.lights.forEach((light) => {
      light.intensity *= .1
      const shadowGenerator = new ShadowGenerator(1024, light as IShadowLight)
      // shadowGenerator.useBlurExponentialShadowMap = true
      shadowGenerator.bias = .0001
      shadowGenerator.addShadowCaster(scene.getMeshById("__root__")!, true)
    })
    scene.meshes.forEach((mesh) => {
      mesh.receiveShadows = true
    })
    engine.runRenderLoop(() => {
      scene.render();
    });
  })
  onUnmounted(() => {
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