"use strict";
(() => {
  // src/components/Renderer.ts
  var Renderer = class {
    canvas;
    context;
    options;
    FPS;
    dt = 0;
    constructor(canvas2, context2, { FPS = 60, ...options }) {
      this.canvas = canvas2;
      this.context = context2;
      this.options = options;
      this.FPS = FPS;
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
      callback(this.context, this.dt);
      this.dt++;
      this.context.restore();
      setTimeout(() => requestAnimationFrame(this.render.bind(this, callback)), 1e3 / this.FPS);
    }
  };

  // src/App.ts
  var canvas = document.querySelector("canvas");
  var context = canvas.getContext("2d");
  var R = new Renderer(canvas, context, {
    backgroundColor: "#101010",
    FPS: 60,
    coordinateSystemCentered: false
  });
  var x = 0;
  var y = 0;
  var vx = 2;
  var vy = 5;
  R.render((context2, time) => {
    context2.fillStyle = "white";
    context2.fillRect(x, y, 100, 100);
    if (x >= canvas.width - 100 || x < 0) {
      vx *= -1;
    }
    if (y >= canvas.height - 100 || y < 0) {
      vy *= -1;
    }
    x += vx;
    y += vy;
  });
})();
