import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';
import { pick } from '../core/helpers.js';

/** La Fuga: elegir el lado correcto para esquivar el golpe anunciado. */
export function renderFugaGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const lanes = [{ id: 'izq', label: 'Izquierda', icon: '⬅️' }, { id: 'centro', label: 'Centro', icon: '⏺️' }, { id: 'der', label: 'Derecha', icon: '➡️' }];
  const g = { round: 0, hits: 0 };
  const meta = document.createElement('div'); meta.className = 'mem-meta';
  meta.innerHTML = `<span>Esquivá el próximo golpe</span><span id="fugaProg">Ronda 1/${diff.fugaRounds} · Aciertos ${g.hits}/${diff.fugaNeeded}</span>`;
  card.appendChild(meta);
  const warn = document.createElement('div'); warn.className = 'lane-warn'; warn.id = 'fugaWarn';
  card.appendChild(warn);
  const row = document.createElement('div'); row.className = 'rps-row';
  card.appendChild(row);
  function nextRound() {
    g.round++;
    const incoming = pick(lanes);
    warn.textContent = `El golpe viene por ${incoming.label.toLowerCase()}...`;
    row.innerHTML = '';
    lanes.forEach(l => {
      const b = document.createElement('div'); b.className = 'rps-btn';
      b.innerHTML = `<span class="ri">${l.icon}</span>${l.label}`;
      b.onclick = () => choose(l, incoming);
      row.appendChild(b);
    });
  }
  function choose(chosen, incoming) {
    row.innerHTML = '';
    const dodged = chosen.id !== incoming.id;
    if (dodged) g.hits++;
    document.getElementById('fugaProg').textContent = `Ronda ${Math.min(g.round, diff.fugaRounds)}/${diff.fugaRounds} · Aciertos ${g.hits}/${diff.fugaNeeded}`;
    warn.textContent = dodged ? '¡Esquivaste justo a tiempo!' : 'Te llevaste el golpe de lleno.';
    if (g.hits >= diff.fugaNeeded) { setTimeout(() => resolveBossOutcome(card, true, step.tier, !!step.final), 500); return; }
    if (g.round >= diff.fugaRounds) { setTimeout(() => resolveBossOutcome(card, false, step.tier, !!step.final), 500); return; }
    setTimeout(nextRound, 650);
  }
  nextRound();
}
