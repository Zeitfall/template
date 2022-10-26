import { Renderer } from '@components/Renderer';

import {
  SceneConstructorInterface,
  SceneInterface,
  SceneOptionsInterface,
  RendererInterface,
} from '@interfaces';
import { RendererCallbackType } from '@types';

export const Scene: SceneConstructorInterface = class implements SceneInterface {
  private readonly node: HTMLElement | Element;
  private canvas: HTMLCanvasElement;
  private context: CanvasRenderingContext2D;
  private renderer: RendererInterface;
  private readonly options: SceneOptionsInterface;

  constructor(node: HTMLElement | Element, options: SceneOptionsInterface) {
    this.node = node;
    this.options = options;

    this.__init();
  }

  private __init(): void {
    const { name, size, ...RENDERER_OPTIONS } = this.options;
    const [width, height] = size;
    const ATTRIBUTES = { name, width, height };

    this.canvas = document.createElement('canvas');
    this.context = this.canvas.getContext('2d');
    this.renderer = new Renderer(this.canvas, this.context, RENDERER_OPTIONS);

    Object.entries(ATTRIBUTES).forEach(([name, value]) => {
      this.canvas.setAttribute(name, `${ value }`);
    });

    this.node.insertAdjacentElement('afterbegin', this.canvas);
  }

  render(callback: RendererCallbackType): void {
    return this.renderer.render(callback);
  }
}
