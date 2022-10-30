import { Scene } from '@components/Scene';
import { Vector } from '@components/Vector';

import { VectorInterface } from '@interfaces';
import { RendererBackground } from '@enums';

const scene = new Scene(document.body, {
  name: 'sc1',
  size: [512, 512],
  backgroundColor: RendererBackground.TRANSPARENT,
  coordinateSystemCentered: false,
  FPS: 60,
});
