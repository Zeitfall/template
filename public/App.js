"use strict";
(() => {
  // src/components/Renderer/index.ts
  var Renderer = class {
    constructor(canvas, context, options) {
      this.canvas = canvas;
      this.context = context;
      this.options = options;
      this.canvas = canvas;
      this.context = context;
      this.options = options;
    }
    dt = 0;
    initializeCoordinateSystem() {
      this.context.save();
      if (this.options.backgroundColor === "transparent" /* TRANSPARENT */) {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
      } else {
        this.context.fillStyle = this.options.backgroundColor;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
      }
      if (this.options.coordinateSystemCentered) {
        this.context.translate(this.canvas.width * 0.5, this.canvas.height * 0.5);
      }
    }
    render(callback) {
      this.initializeCoordinateSystem();
      callback(this.canvas, this.context, this.dt);
      this.dt++;
      this.context.restore();
      setTimeout(() => requestAnimationFrame(this.render.bind(this, callback)), 1e3 / this.options.FPS);
    }
  };

  // src/components/Scene/index.ts
  var Scene = class {
    constructor(node, options) {
      this.node = node;
      this.options = options;
      this.node = node;
      this.options = options;
      this.__init();
    }
    canvas;
    context;
    renderer;
    __init() {
      const { name, size, ...RENDERER_OPTIONS } = this.options;
      const [width, height] = size;
      const ATTRIBUTES = { name, width, height };
      this.canvas = document.createElement("canvas");
      this.context = this.canvas.getContext("2d");
      this.renderer = new Renderer(this.canvas, this.context, RENDERER_OPTIONS);
      Object.entries(ATTRIBUTES).forEach(([name2, value]) => {
        this.canvas.setAttribute(name2, `${value}`);
      });
      this.node.insertAdjacentElement("afterbegin", this.canvas);
    }
    render(callback) {
      return this.renderer.render(callback);
    }
  };

  // src/App.ts
  var scene = new Scene(document.body, {
    name: "sc1",
    size: [512, 512],
    backgroundColor: "transparent" /* TRANSPARENT */,
    coordinateSystemCentered: false,
    FPS: 60
  });
})();
