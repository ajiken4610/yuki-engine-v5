import { Engine } from "babylonjs";

export default (canvas: HTMLCanvasElement) => {
  return new Engine(canvas);
};
