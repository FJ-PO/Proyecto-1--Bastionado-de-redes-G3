import { defineDeck } from 'beatdeck';
import '../themes/neutral.css';
import '../themes/light.css';
import { config } from './deck.config';
import { SCENES } from './scenes';
import { Open } from './scenes/01-Open';
import { Problema } from './scenes/02-Problema';
import { Idea } from './scenes/03-Idea';
import { Hecho } from './scenes/04-Hecho';
import { Falta } from './scenes/05-Falta';
import { Molestias } from './scenes/06-Molestias';
import { Descartes } from './scenes/07-Descartes';
import { End } from './scenes/08-End';

/** Every layer of the stage, back to front. All stay mounted; each shows itself for its own scene. */
function Stage() {
  return (
    <>
      <Open />
      <Problema />
      <Idea />
      <Hecho />
      <Falta />
      <Molestias />
      <Descartes />
      <End />
    </>
  );
}

export default defineDeck({
  id: 'mareas-asesores-bastionado-de-la-red',
  title: config.title,
  lang: 'es',
  scenes: SCENES,
  Stage,
  fonts: ['400 100px "Inter Variable"', '600 100px "Inter Variable"', '400 32px "JetBrains Mono Variable"'],
  qrUrl: config.qrUrl,
});
