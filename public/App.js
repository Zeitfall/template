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

  // src/components/Vector/Vector3D.ts
  var Vector3D = class {
    constructor(x, y, z) {
      this.x = x;
      this.y = y;
      this.z = z;
      this.x = x;
      this.y = y;
      this.z = z;
    }
    add(v0) {
      this.x += v0.x;
      this.y += v0.y;
      this.z += v0.z;
      return this;
    }
    subtract(v0) {
      this.x -= v0.x;
      this.y -= v0.y;
      this.z -= v0.z;
      return this;
    }
    multiply(v0) {
      this.x *= v0.x;
      this.y *= v0.y;
      this.z *= v0.z;
      return this;
    }
    multiplyByScalar(value) {
      this.x *= value;
      this.y *= value;
      this.z *= value;
      return this;
    }
    divide(v0) {
      this.x *= v0.x ** -1;
      this.y *= v0.y ** -1;
      this.z *= v0.z ** -1;
      return this;
    }
    divideByScalar(value) {
      this.multiplyByScalar(value ** -1);
      return this;
    }
    magnitudeSquared() {
      return this.x ** 2 + this.y ** 2 + this.z ** 2;
    }
    magnitude() {
      return this.magnitudeSquared() ** 0.5;
    }
    setMagnitude(value) {
      return this.normalize().multiplyByScalar(value);
    }
    dot(v0) {
      return this.x * v0.x + this.y * v0.y + this.z * v0.z;
    }
    distanceBetween(v0) {
      return this.subtract(v0).magnitude();
    }
    normalize() {
      const LENGTH = this.magnitude();
      return LENGTH ? this.divideByScalar(LENGTH) : this;
    }
    limit(value) {
      const MAGNITUDE_SQUARED = this.magnitudeSquared();
      if (MAGNITUDE_SQUARED > value ** 2) {
        this.setMagnitude(value);
      }
      return this;
    }
    angleBetween(v0) {
      const DOT_PRODUCT = this.dot(v0);
      const THETA = DOT_PRODUCT / (this.magnitude() * v0.magnitude());
      return Math.acos(Math.min(1, Math.max(-1, THETA)));
    }
    fromAngles(alpha, betta) {
      const MAGNITUDE = this.magnitude();
      const COSINE_ALPHA = Math.cos(alpha);
      const SINE_ALPHA = Math.sin(alpha);
      const COSINE_BETTA = Math.cos(betta);
      const SINE_BETTA = Math.sin(betta);
      this.x = MAGNITUDE * SINE_ALPHA * SINE_BETTA;
      this.y = -MAGNITUDE * COSINE_ALPHA;
      this.z = MAGNITUDE * SINE_ALPHA * COSINE_BETTA;
      return this;
    }
    toArray() {
      return [this.x, this.y];
    }
  };

  // src/App.ts
  var scene = new Scene(document.body, {
    name: "sc1",
    size: [512, 512],
    backgroundColor: "#202020",
    coordinateSystemCentered: true,
    FPS: 60
  });
  var POINTS = [];
  for (let i = -8; i < 8; i++) {
    for (let j = -8; j < 8; j++) {
      for (let k = -8; k < 8; k++) {
        POINTS.push(new Vector3D(i * 10, j * 10, k * 10));
      }
    }
  }
})();
