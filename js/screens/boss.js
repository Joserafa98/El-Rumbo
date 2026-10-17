import { state } from '../core/state.js';
import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';
import { TECNICA_GAMES } from '../minigames/index.js';
import { pick } from '../core/helpers.js';

/** Pantalla de combate de jefe. Elige entre el modo "instinto" y "técnica" según state.combatStyle. */
export function renderBoss(stage, step) {
  const enemy = state.enemies[step.enemyKey];
  const wrap = document.createElement('div');
  const brand = document.createElement('div'); brand.className = 'brand';
  brand.innerHTML = `<div class="kicker">${state.name.toUpperCase()} · ENFRENTAMIENTO</div>`;
  wrap.appendChild(brand);
  const card = document.createElement('div'); card.className = 'card';
  card.innerHTML = `<div class="boss-header"><div class="vs">${step.label}</div><h3>${enemy.name}</h3>
    <div class="btags">${enemy.race} · ${enemy.power}</div>
    <div class="scene-text" style="margin-top:12px;">${enemy.desc}</div></div>`;
  if (state.combatStyle === 'instinto') {
    renderBossInstinto(card, enemy, step);
  } else {
    renderBossTecnica(card, enemy, step);
  }
  wrap.appendChild(card);
  stage.appendChild(wrap);
}

/** Modo Instinto Feroz: elegís un ritual, se decide por dado + stat. */
function renderBossInstinto(card, enemy, step) {
  const rituals = [
    { title: 'Tocar tu amuleto de la suerte', desc: 'El que llevás desde tu primer día en el mar.' },
    { title: 'Rezarle al mar', desc: 'Aunque no creas del todo, no cuesta nada.' },
    { title: 'Confiar ciegamente en tu instinto', desc: 'A veces pensar de más solo te frena.' }
  ];
  const wrap = document.createElement('div'); wrap.className = 'options';
  rituals.forEach(r => {
    const el = document.createElement('div'); el.className = 'opt';
    el.innerHTML = `<span class="opt-title">${r.title}</span><span class="opt-desc">${r.desc}</span>`;
    el.onclick = () => {
      const diff = DIFFICULTY[step.tier];
      const stat = Math.floor(((state.stats.combate || 0) + (state.stats.haki || 0)) / 2);
      const roll = Math.floor(Math.random() * 6) + 1;
      const success = (stat + roll) >= diff.diceThreshold;
      resolveBossOutcome(card, success, step.tier, !!step.final);
    };
    wrap.appendChild(el);
  });
  card.appendChild(wrap);
}

/** Modo Técnica Pura: minijuego aleatorio de TECNICA_GAMES. */
function renderBossTecnica(card, enemy, step) {
  const game = pick(Object.keys(TECNICA_GAMES));
  TECNICA_GAMES[game](card, step);
}
