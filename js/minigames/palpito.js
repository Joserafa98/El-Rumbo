import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';

/** El Pálpito del Enemigo: mayor o menor contra las cartas del rival. */
export function renderPalpitoGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const g = { current: 1 + Math.floor(Math.random() * 12), streak: 0, tries: 3 };
  const wrap = document.createElement('div'); wrap.className = 'center';
  wrap.innerHTML = `<div class="mem-meta"><span>Adivina si la próxima carta del enemigo es mayor o menor</span><span id="palpitoProg">Racha ${g.streak}/${diff.palpitoNeeded} · Intentos ${g.tries}</span></div>
    <div class="card-draw" id="palpitoCard">${g.current}</div>`;
  card.appendChild(wrap);
  const row = document.createElement('div'); row.className = 'rps-row'; row.style.gridTemplateColumns = '1fr 1fr';
  row.innerHTML = `<div class="rps-btn" id="palpitoMenor"><span class="ri">⬇️</span>Menor</div><div class="rps-btn" id="palpitoMayor"><span class="ri">⬆️</span>Mayor</div>`;
  card.appendChild(row);
  function guess(dir) {
    let next = 1 + Math.floor(Math.random() * 12);
    while (next === g.current) { next = 1 + Math.floor(Math.random() * 12); }
    const correct = dir === 'mayor' ? next > g.current : next < g.current;
    g.current = next;
    document.getElementById('palpitoCard').textContent = g.current;
    if (correct) g.streak++; else { g.streak = 0; g.tries--; }
    document.getElementById('palpitoProg').textContent = `Racha ${g.streak}/${diff.palpitoNeeded} · Intentos ${g.tries}`;
    if (g.streak >= diff.palpitoNeeded) { setTimeout(() => resolveBossOutcome(card, true, step.tier, !!step.final), 400); return; }
    if (g.tries <= 0) { setTimeout(() => resolveBossOutcome(card, false, step.tier, !!step.final), 400); }
  }
  row.querySelector('#palpitoMenor').onclick = () => guess('menor');
  row.querySelector('#palpitoMayor').onclick = () => guess('mayor');
}
