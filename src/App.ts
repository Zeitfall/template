import { Scene } from '@components/Scene';

//TEST
const scene = new Scene(document.body, {
  name: 'scene-1',
  size: [512, 512],
  backgroundColor: '#101010',
});

let x = 256, y = 256;
let vx = 0, vy = 0;
let ax = 0, ay = .5;

scene.render(({ width, height }, context, time) => {

  if (y > height - 30) {
    vy *= -1;
  }

  context.fillStyle = '#eee';
  context.beginPath();
  context.arc(x, y, 30, 0, 2*Math.PI, false);
  context.fill();

  vx += ax;
  vy += ay;
  y += vy;
  x += vx;
});
