import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';

/** La Clave del Den Den Mushi: memorizar una secuencia y repetirla en el teclado. */
export function renderClaveGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const seq = Array.from({ length: diff.claveLen }, () => Math.floor(Math.random() * 10));
  const g = { input: [] };
  const meta = document.createElement('div'); meta.className = 'mem-meta';
  meta.innerHTML = `<span>Memoriza la clave del Den Den Mushi</span><span id="claveProg">0 / ${diff.claveLen}</span>`;
  card.appendChild(meta);
  const disp = document.createElement('div'); disp.className = 'seq-display';
  disp.textContent = seq.join('  ');
  card.appendChild(disp);
  const pad = document.createElement('div'); pad.className = 'keypad-grid'; pad.style.opacity = '0.3'; pad.style.pointerEvents = 'none';
  for (let n = 0; n < 10; n++) {
    const b = document.createElement('div'); b.className = 'key-btn'; b.textContent = n;
    b.onclick = () => pressDigit(n);
    pad.appendChild(b);
  }
  card.appendChild(pad);
  const clearBtn = document.createElement('div'); clearBtn.className = 'key-btn key-clear'; clearBtn.textContent = 'Borrar';
  clearBtn.onclick = () => { g.input = []; updateProg(); };
  card.appendChild(clearBtn);

  setTimeout(() => {
    disp.textContent = seq.map(() => '•').join('  ');
    pad.style.opacity = '1'; pad.style.pointerEvents = 'auto';
  }, 1100 + diff.claveLen * 380);

  function updateProg() { document.getElementById('claveProg').textContent = `${g.input.length} / ${diff.claveLen}`; }
  function pressDigit(n) {
    g.input.push(n);
    updateProg();
    const idx = g.input.length - 1;
    if (seq[idx] !== n) {
      pad.style.pointerEvents = 'none';
      setTimeout(() => resolveBossOutcome(card, false, step.tier, !!step.final), 300);
      return;
    }
    if (g.input.length === seq.length) {
      pad.style.pointerEvents = 'none';
      setTimeout(() => resolveBossOutcome(card, true, step.tier, !!step.final), 300);
    }
  }
}
