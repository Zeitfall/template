export type RendererCallbackType = (
  canvas: HTMLCanvasElement,
  context: CanvasRenderingContext2D,
  ...args: Array<any>
) => void;
