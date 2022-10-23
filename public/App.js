"use strict";
(() => {
  // src/App.ts
  var LineChart = class {
    node;
    svg;
    polylines = [];
    options;
    constructor(node, options) {
      this.node = node;
      this.options = options;
      this.__init();
    }
    __init() {
      this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      this.options.attributes.forEach((attribute) => {
        const [name, value] = attribute.split("=");
        this.svg.setAttribute(name, value.replace(/\"/g, ""));
      });
      this.node.insertAdjacentElement("afterbegin", this.svg);
    }
    __formatData(data) {
      const X0 = data.map(([x, _]) => x);
      const Y0 = data.map(([_, y]) => y);
      const [MIN_X, MIN_Y] = [Math.min(...X0), Math.min(...Y0)];
      const [MAX_X, MAX_Y] = [Math.max(...X0), Math.max(...Y0)];
      const [PADDING_X, PADDING_Y] = this.options.padding;
      const [RATIO_X, RATIO_Y] = [
        (MAX_X - MIN_X) / (this.options.width - PADDING_X),
        (MAX_Y - MIN_Y) / (this.options.height - PADDING_Y)
      ];
      return data.map((_, index) => {
        const X = X0[index] / RATIO_X + PADDING_X * 0.5;
        const Y = (MAX_Y - Y0[index]) / RATIO_Y + PADDING_Y * 0.5;
        return [X, Y];
      });
    }
    add(data, options) {
      const POLYLINE = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      POLYLINE.setAttribute("points", `${this.__formatData(data)}`);
      Object.entries(options).forEach((attribute) => {
        const [name, value] = attribute;
        POLYLINE.style[name] = value;
      });
      this.polylines.push(POLYLINE);
      this.svg.insertAdjacentElement("afterbegin", POLYLINE);
    }
  };
  var linechart = new LineChart(document.body, {
    name: "lnch-1",
    width: 512,
    height: 384,
    padding: [0, 128],
    get attributes() {
      return [
        'class="linechart"',
        `data-name=${this.name}`,
        `width=${this.width}`,
        `height=${this.height}`
      ];
    }
  });
  var SINE = new Array(512).fill(null).map((_, index) => [index, Math.sin(index * 0.03125)]);
  linechart.add(SINE, {
    stroke: "black",
    fill: "none",
    strokeWidth: 4
  });
  console.log(linechart);
})();
