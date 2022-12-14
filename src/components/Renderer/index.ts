import { RendererBackground } from "@enums";
import { RendererCallbackType } from "@types";
import {
  RendererConstructorInterface,
  RendererInterface,
  RendererOptionsInterface,
} from "@interfaces";

export const Renderer: RendererConstructorInterface = class implements RendererInterface {
  private dt: number = 0;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly context: CanvasRenderingContext2D,
    private readonly options: RendererOptionsInterface,
  ) {
    this.canvas = canvas;
    this.context = context;
    this.options = options;
  }

  private initializeCoordinateSystem(): void {
    this.context.save();

    if (this.options.backgroundColor === RendererBackground.TRANSPARENT) {
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    } else {
      this.context.fillStyle = this.options.backgroundColor;
      this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    if (this.options.coordinateSystemCentered) {
      this.context.translate(this.canvas.width * .5, this.canvas.height * .5);
    }
  }

  render(callback: RendererCallbackType): void {
    this.initializeCoordinateSystem();

    callback(this.canvas, this.context, this.dt);

    this.dt++;
    this.context.restore();

    setTimeout(() => 
      requestAnimationFrame(this.render.bind(this, callback)), 1000 / this.options.FPS);
  }
}
