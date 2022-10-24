import { Renderer } from "@components/Renderer";


// TEST
const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

const R = new Renderer(canvas, context, {
  backgroundColor: '#101010',
  FPS: 60,
  coordinateSystemCentered: false,
});

let x = 0, y = 0;
let vx = 2, vy = 5;

R.render((context, time) => {
  context.fillStyle = 'white';
  context.fillRect(x, y, 100, 100);

  if (x >= canvas.width - 100 || x < 0) {
    vx *= -1;
  }

  if (y >= canvas.height - 100 || y < 0) {
    vy *= -1;
  }

  x += vx;
  y += vy;
});
