import { renderMemoryGame } from './memory.js';
import { renderRpsGame } from './rps.js';
import { renderTimingGame } from './timing.js';
import { renderClaveGame } from './clave.js';
import { renderChargeGame } from './carga.js';
import { renderFugaGame } from './fuga.js';
import { renderPalpitoGame } from './palpito.js';
import { renderDadosGame } from './dados.js';
import { renderHuecoGame } from './hueco.js';
import { renderBluffGame } from './bluff.js';

/**
 * Registro de minijuegos de "Técnica Pura". screens/boss.js sortea una
 * clave al azar y llama a la función correspondiente con (card, step).
 *
 * Para sumar un minijuego nuevo:
 * 1. Crea js/minigames/tuJuego.js exportando renderTuJuego(card, step).
 * 2. Impórtalo aquí y agrégalo a este objeto con una clave nueva.
 * 3. Si usa números que varían por dificultad, súmale esos campos a
 *    cada tier en js/data/difficulty.js.
 */
export const TECNICA_GAMES = {
  memory: renderMemoryGame,
  rps: renderRpsGame,
  timing: renderTimingGame,
  clave: renderClaveGame,
  carga: renderChargeGame,
  fuga: renderFugaGame,
  palpito: renderPalpitoGame,
  dados: renderDadosGame,
  hueco: renderHuecoGame,
  bluff: renderBluffGame
};
