"use strict";
(() => {
  // src/components/Renderer.ts
  var Renderer = class {
    canvas;
    context;
    options;
    dt = 0;
    constructor(canvas, context, { FPS = 60, coordinateSystemCentered = false, ...options }) {
      this.canvas = canvas;
      this.context = context;
      this.options = { FPS, coordinateSystemCentered, ...options };
    }
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

  // src/components/Scene.ts
  var Scene = class {
    node;
    canvas;
    context;
    renderer;
    options;
    constructor(node, options) {
      this.node = node;
      this.options = options;
      this.__init();
    }
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
    name: "scene-1",
    size: [512, 512],
    backgroundColor: "#101010"
  });
  var x = 256;
  var y = 256;
  var vx = 0;
  var vy = 0;
  var ax = 0;
  var ay = 0.5;
  scene.render(({ width, height }, context, time) => {
    if (y > height - 30) {
      vy *= -1;
    }
    context.fillStyle = "#eee";
    context.beginPath();
    context.arc(x, y, 30, 0, 2 * Math.PI, false);
    context.fill();
    vx += ax;
    vy += ay;
    y += vy;
    x += vx;
  });
})();
