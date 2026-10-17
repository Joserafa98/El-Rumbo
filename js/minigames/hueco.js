import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';

/** El Hueco: encontrar el espacio entre los rivales antes de que se cierre. */
export function renderHuecoGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const g = { round: 0, hits: 0, gapIndex: -1, timer: null };
  const meta = document.createElement('div'); meta.className = 'mem-meta';
  meta.innerHTML = `<span>Encuentra el hueco entre los rivales antes de que se cierre</span><span id="huecoProg">Ronda 1/${diff.huecoRounds} · Aciertos ${g.hits}/${diff.huecoNeeded}</span>`;
  card.appendChild(meta);
  const grid = document.createElement('div'); grid.className = 'mem-grid';
  card.appendChild(grid);

  function nextRound() {
    g.round++;
    g.gapIndex = Math.floor(Math.random() * 8);
    grid.innerHTML = '';
    for (let i = 0; i < 8; i++) {
      const c = document.createElement('div'); c.className = 'mem-card';
      if (i === g.gapIndex) { c.style.border = '2px dashed var(--gold)'; }
      else { c.textContent = '🔴'; }
      c.onclick = () => choose(i);
      grid.appendChild(c);
    }
    const timeLimit = Math.max(650, 1500 - step.tier * 180);
    clearTimeout(g.timer);
    g.timer = setTimeout(() => choose(-1), timeLimit);
  }
  function choose(i) {
    clearTimeout(g.timer);
    const correct = i === g.gapIndex;
    if (correct) g.hits++;
    document.getElementById('huecoProg').textContent = `Ronda ${Math.min(g.round, diff.huecoRounds)}/${diff.huecoRounds} · Aciertos ${g.hits}/${diff.huecoNeeded}`;
    if (g.hits >= diff.huecoNeeded) { resolveBossOutcome(card, true, step.tier, !!step.final); return; }
    if (g.round >= diff.huecoRounds) { resolveBossOutcome(card, false, step.tier, !!step.final); return; }
    setTimeout(nextRound, 300);
  }
  nextRound();
}
