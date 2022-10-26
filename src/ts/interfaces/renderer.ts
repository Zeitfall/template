import { RendererBackground } from "@enums";
import { RendererCallbackType } from "@types";

export interface RendererConstructorInterface {
  new(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    options: RendererOptionsInterface
    ): RendererInterface;
}

export interface RendererInterface {
  render(callback: RendererCallbackType): void;
}

export interface RendererOptionsInterface {
  FPS?: number;
  backgroundColor: RendererBackground.TRANSPARENT | string;
  coordinateSystemCentered?: boolean;
}
