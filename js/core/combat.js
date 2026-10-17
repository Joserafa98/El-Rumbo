import { state } from './state.js';
import { addMod } from './helpers.js';
import { statbar, advanceStep } from './render.js';
import { DIFFICULTY } from '../data/difficulty.js';

/**
 * Centraliza qué pasa después de un combate de jefe, sea que se resolvió
 * por "instinto" (ritual + dado) o por "técnica" (minijuego). Vive aquí,
 * separado de screens/boss.js y de minigames/*, a propósito: tanto la
 * pantalla de jefe como cada minijuego lo importan, y si viviera en
 * cualquiera de los dos lados se formaría un import circular.
 */
export function resolveBossOutcome(card, success, tier, isFinal) {
  const diff = DIFFICULTY[tier];
  card.innerHTML = '';
  const banner = document.createElement('div');
  banner.className = 'result-banner ' + (success ? 'good' : 'bad');
  banner.textContent = success ? '¡Victoria!' : 'La pelea se te escapa';
  card.appendChild(banner);
  const txt = document.createElement('div'); txt.className = 'scene-text';
  if (success) {
    state.bounty += diff.bounty; state.berries += diff.berries; state.bossesWon++;
    addMod({ resistencia: 1 });
    txt.textContent = isFinal
      ? 'El golpe final cae de tu lado. El silencio que sigue es distinto a cualquier otro que hayas escuchado en el mar.'
      : 'Ganas la pelea, tu recompensa sube y tu tripulación te mira distinto a partir de hoy.';
  } else {
    state.berries = Math.max(0, state.berries - Math.round(diff.berries * 0.4));
    addMod({ haki: 1 });
    txt.textContent = isFinal
      ? 'No alcanza. Quedas malherido, pero vivo, con la isla final todavía delante tuyo.'
      : 'Te ganan esta vez. Sales golpeado, pero con algo aprendido para la próxima pelea.';
  }
  card.appendChild(txt);
  statbar(card);
  const btn = document.createElement('button'); btn.className = 'primary-btn'; btn.textContent = 'Continuar';
  btn.onclick = () => { if (isFinal) { state.finalOutcome = success; } advanceStep(); };
  card.appendChild(btn);
}
