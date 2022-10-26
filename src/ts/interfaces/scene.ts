import { RendererOptionsInterface } from "@interfaces";
import { RendererCallbackType } from "@types";

export interface SceneConstructorInterface {
  new(node: HTMLElement | Element, options: SceneOptionsInterface): SceneInterface;
}

export interface SceneInterface {
  render(callback: RendererCallbackType): void;
}

export interface SceneOptionsInterface extends RendererOptionsInterface {
  name: string;
  size: Array<number>;
}
