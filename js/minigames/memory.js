import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';

/** Memoria: memorizar y emparejar los ataques del enemigo. */
export function renderMemoryGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const symbols = ['⚔️', '🌊', '🏴‍☠️', '🔥', '⚓', '💀', '🗺️', '🐉', '🦈', '🍖', '🌀', '⭐'].slice(0, diff.memPairs);
  let deck = [...symbols, ...symbols].sort(() => Math.random() - 0.5);
  const g = { deck, open: [], matched: new Set(), misses: 0, locked: false };

  const meta = document.createElement('div'); meta.className = 'mem-meta';
  meta.innerHTML = `<span>Memoriza los ataques del enemigo</span><span id="memMisses">Errores: 0 / ${diff.memMisses}</span>`;
  card.appendChild(meta);
  const grid = document.createElement('div'); grid.className = 'mem-grid';
  card.appendChild(grid);

  function draw() {
    grid.innerHTML = '';
    g.deck.forEach((sym, i) => {
      const c = document.createElement('div');
      c.className = 'mem-card' + (g.matched.has(i) ? ' matched' : (g.open.includes(i) ? ' open' : ''));
      c.textContent = (g.matched.has(i) || g.open.includes(i)) ? sym : '?';
      c.onclick = () => flip(i);
      grid.appendChild(c);
    });
  }
  function flip(i) {
    if (g.locked || g.matched.has(i) || g.open.includes(i)) return;
    g.open.push(i);
    draw();
    if (g.open.length === 2) {
      g.locked = true;
      const [a, b] = g.open;
      if (g.deck[a] === g.deck[b]) {
        g.matched.add(a); g.matched.add(b); g.open = []; g.locked = false; draw();
        if (g.matched.size === g.deck.length) {
          setTimeout(() => resolveBossOutcome(card, true, step.tier, !!step.final), 400);
        }
      } else {
        setTimeout(() => {
          g.misses++; document.getElementById('memMisses').textContent = `Errores: ${g.misses} / ${diff.memMisses}`;
          g.open = []; g.locked = false; draw();
          if (g.misses > diff.memMisses) {
            resolveBossOutcome(card, false, step.tier, !!step.final);
          }
        }, 700);
      }
    }
  }
  draw();
}
