import { Engine, WebGPUEngine } from "babylonjs";

export default async (canvas: HTMLCanvasElement) => {
  let engine: Engine;
  if (await WebGPUEngine.IsSupportedAsync) {
    engine = new WebGPUEngine(canvas);
    await (engine as WebGPUEngine).initAsync();
  } else {
    engine = new Engine(canvas, false);
  }
  window.addEventListener("resize", () => {
    engine.resize();
  });
  return engine;
};
