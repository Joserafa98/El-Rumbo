import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';

/** El Primer Golpe: adivinar por dónde ataca el enemigo entre varias posiciones. */
export function renderBluffGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const g = { round: 0, hits: 0, rounds: 3 };
  const meta = document.createElement('div'); meta.className = 'mem-meta';
  meta.innerHTML = `<span>Adivina por dónde viene el primer golpe</span><span id="bluffProg">Ronda 1/${g.rounds} · Aciertos ${g.hits}/${diff.bluffNeeded}</span>`;
  card.appendChild(meta);
  const row = document.createElement('div'); row.className = 'grid2';
  card.appendChild(row);
  function nextRound() {
    g.round++;
    const correctIdx = Math.floor(Math.random() * 4);
    row.innerHTML = '';
    for (let i = 0; i < 4; i++) {
      const b = document.createElement('div'); b.className = 'style-card'; b.style.cursor = 'pointer'; b.style.textAlign = 'center';
      b.innerHTML = `<span class="si">👤</span><h3 style="font-size:13px;">Posición ${i + 1}</h3>`;
      b.onclick = () => choose(i === correctIdx);
      row.appendChild(b);
    }
  }
  function choose(correct) {
    if (correct) g.hits++;
    document.getElementById('bluffProg').textContent = `Ronda ${Math.min(g.round, g.rounds)}/${g.rounds} · Aciertos ${g.hits}/${diff.bluffNeeded}`;
    if (g.hits >= diff.bluffNeeded) { setTimeout(() => resolveBossOutcome(card, true, step.tier, !!step.final), 400); return; }
    if (g.round >= g.rounds) { setTimeout(() => resolveBossOutcome(card, false, step.tier, !!step.final), 400); return; }
    setTimeout(nextRound, 500);
  }
  nextRound();
}
