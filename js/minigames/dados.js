import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';

/** Los Dados del Destino: tirar, guardar y volver a tirar hasta sumar lo necesario. */
export function renderDadosGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const g = { dice: [0, 0, 0, 0, 0], kept: [false, false, false, false, false], rollsLeft: 3 };
  function rollAll() {
    for (let i = 0; i < 5; i++) { if (!g.kept[i]) g.dice[i] = 1 + Math.floor(Math.random() * 6); }
    g.rollsLeft--;
  }
  rollAll();
  const meta = document.createElement('div'); meta.className = 'mem-meta';
  meta.innerHTML = `<span>Necesitas sumar ${diff.dadosThreshold} o más. Toca un dado para guardarlo.</span><span>Tiradas restantes: ${g.rollsLeft}</span>`;
  const rollsLeftEl = meta.lastElementChild;
  card.appendChild(meta);
  const diceRow = document.createElement('div'); diceRow.className = 'rps-row'; diceRow.style.gridTemplateColumns = 'repeat(5,1fr)';
  card.appendChild(diceRow);
  const sumLine = document.createElement('div'); sumLine.className = 'scene-text center'; sumLine.id = 'dadosSum';
  card.appendChild(sumLine);
  const btn = document.createElement('button'); btn.className = 'primary-btn'; btn.id = 'dadosRollBtn';
  card.appendChild(btn);

  function draw() {
    diceRow.innerHTML = '';
    g.dice.forEach((v, i) => {
      const d = document.createElement('div'); d.className = 'rps-btn' + (g.kept[i] ? ' kept' : '');
      d.innerHTML = `<span class="ri">${v}</span>${g.kept[i] ? 'Guardado' : 'Tocar'}`;
      d.onclick = () => { if (g.rollsLeft < 3) { g.kept[i] = !g.kept[i]; draw(); } };
      diceRow.appendChild(d);
    });
    const sum = g.dice.reduce((a, b) => a + b, 0);
    sumLine.textContent = `Suma actual: ${sum} / necesitas ${diff.dadosThreshold}`;
    rollsLeftEl.textContent = `Tiradas restantes: ${g.rollsLeft}`;
    btn.textContent = g.rollsLeft > 0 ? `Volver a tirar (${g.rollsLeft} quedan)` : 'Cerrar jugada';
  }
  btn.onclick = () => {
    if (g.rollsLeft > 0) {
      rollAll(); draw();
    } else {
      const sum = g.dice.reduce((a, b) => a + b, 0);
      resolveBossOutcome(card, sum >= diff.dadosThreshold, step.tier, !!step.final);
    }
  };
  draw();
}
