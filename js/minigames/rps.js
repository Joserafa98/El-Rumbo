import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';
import { pick } from '../core/helpers.js';

/** Piedra, papel o tijera reskineado como ataque/esquiva/guardia. */
export function renderRpsGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const moves = [
    { id: 'ataque', icon: '⚔️', label: 'Ataque', beats: 'esquiva' },
    { id: 'esquiva', icon: '💨', label: 'Esquiva', beats: 'guardia' },
    { id: 'guardia', icon: '🛡️', label: 'Guardia', beats: 'ataque' }
  ];
  const g = { you: 0, foe: 0 };
  const score = document.createElement('div'); score.className = 'rps-score';
  score.innerHTML = `<span class="you">Tú <b id="rpsYou">0</b></span><span class="foe">Enemigo <b id="rpsFoe">0</b></span>`;
  card.appendChild(score);
  const log = document.createElement('div'); log.className = 'rps-log'; log.id = 'rpsLog';
  log.textContent = `Necesitas ${diff.rpsNeeded} rondas ganadas para vencer.`;
  card.appendChild(log);
  const row = document.createElement('div'); row.className = 'rps-row';
  card.appendChild(row);

  function draw() {
    row.innerHTML = '';
    moves.forEach(m => {
      const b = document.createElement('div'); b.className = 'rps-btn';
      b.innerHTML = `<span class="ri">${m.icon}</span>${m.label}`;
      b.onclick = () => play(m);
      row.appendChild(b);
    });
  }
  function play(m) {
    const foe = pick(moves);
    let result;
    if (m.id === foe.id) result = 'empate';
    else if (m.beats === foe.id) result = 'gana';
    else result = 'pierde';
    if (result === 'gana') g.you++;
    if (result === 'pierde') g.foe++;
    document.getElementById('rpsYou').textContent = g.you;
    document.getElementById('rpsFoe').textContent = g.foe;
    document.getElementById('rpsLog').textContent =
      result === 'empate' ? `Empate: los dos eligieron ${m.label.toLowerCase()}.`
      : result === 'gana' ? `Tu ${m.label.toLowerCase()} le gana a su ${foe.label.toLowerCase()}.`
      : `Su ${foe.label.toLowerCase()} le gana a tu ${m.label.toLowerCase()}.`;
    if (g.you >= diff.rpsNeeded) { setTimeout(() => resolveBossOutcome(card, true, step.tier, !!step.final), 500); return; }
    if (g.foe >= diff.rpsNeeded) { setTimeout(() => resolveBossOutcome(card, false, step.tier, !!step.final), 500); return; }
  }
  draw();
}
