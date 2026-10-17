import { state } from '../core/state.js';
import { SCREENS } from '../core/screens-registry.js';
import { render, statbar, progressBar, advanceStep, currentStep } from '../core/render.js';
import { addMod, pickN, fmt } from '../core/helpers.js';
import { CREW_ROLES } from '../data/crew.js';
import { SHOP_ITEMS } from '../data/shop.js';
import { renderBoss } from './boss.js';

/**
 * Dispatcher de la pantalla `play`: cada paso del recorrido (state.steps)
 * tiene un `type`, y aquí se decide qué función de render usar para cada uno.
 * Sumar un tipo de paso nuevo: escribe su `renderX` aquí (o en su propio
 * módulo) y agrégalo a este objeto `dispatch`.
 */
SCREENS.play = (stage) => {
  const step = currentStep();
  const dispatch = {
    arcintro: renderArcIntro, narrative: renderNarrative, crew: renderCrew,
    nav: renderNav, boss: renderBoss, shop: renderShop
  };
  dispatch[step.type](stage, step);
};

export function wrapCard(stage, kickerText, bodyBuilder) {
  const wrap = document.createElement('div');
  const brand = document.createElement('div'); brand.className = 'brand';
  brand.innerHTML = `<div class="kicker">${kickerText}</div>`;
  wrap.appendChild(brand);
  const card = document.createElement('div'); card.className = 'card';
  progressBar(card, state.stepIndex, state.steps.length);
  bodyBuilder(card);
  wrap.appendChild(card);
  stage.appendChild(wrap);
}

function renderArcIntro(stage, step) {
  wrapCard(stage, `${state.name.toUpperCase()} · ${step.arc.toUpperCase()}`, (card) => {
    card.innerHTML += `<div class="arc-banner"><div class="archead">${step.arc}</div><h2>${step.title}</h2><p>${step.text}</p></div>`;
    const btn = document.createElement('button'); btn.className = 'primary-btn'; btn.textContent = 'Continuar viaje';
    btn.onclick = () => advanceStep();
    card.appendChild(btn);
  });
}

function renderNarrative(stage, step) {
  wrapCard(stage, `${state.name.toUpperCase()} · CAPÍTULO ${state.stepIndex + 1}`, (card) => {
    const txt = document.createElement('div'); txt.className = 'scene-text'; txt.textContent = step.text;
    card.appendChild(txt);
    const opts = document.createElement('div'); opts.className = 'options';
    step.options.forEach(o => {
      const el = document.createElement('div'); el.className = 'opt';
      el.innerHTML = `<span class="opt-title">${o.title}</span><span class="opt-desc">${o.desc}</span>`;
      el.onclick = () => { addMod(o.mod); if (o.berries) state.berries += o.berries; if (o.bounty) state.bounty += o.bounty; advanceStep(); };
      opts.appendChild(el);
    });
    card.appendChild(opts);
    statbar(card);
  });
}

function renderCrew(stage, step) {
  const already = state.crew;
  const pool = CREW_ROLES.filter(c => !already.includes(c.role));
  const candidates = pickN(pool.length >= 3 ? pool : CREW_ROLES, 3);
  wrapCard(stage, `${state.name.toUpperCase()} · TRIPULACIÓN`, (card) => {
    card.innerHTML += `<div class="scene-text">En el último puerto conociste a tres personas que quieren subirse a tu barco. Solo hay lugar para sumar una esta vez.</div>`;
    const opts = document.createElement('div'); opts.className = 'options';
    candidates.forEach(c => {
      const el = document.createElement('div'); el.className = 'opt';
      el.innerHTML = `<span class="opt-title">${c.role}</span><span class="opt-desc">${c.desc}</span>`;
      el.onclick = () => { state.crew.push(c.role); addMod(c.mod); advanceStep(); };
      opts.appendChild(el);
    });
    card.appendChild(opts);
    statbar(card);
  });
}

function renderNav(stage, step) {
  const routes = [
    { title: 'Cruzar por la corriente rápida', desc: 'Ahorra días de viaje. Exige buena lectura del mar.', risk: 'navegacion' },
    { title: 'Bordear por aguas tranquilas', desc: 'Más lento, pero mucho más seguro.', risk: null },
    { title: 'Atravesar directo la tormenta', desc: 'Terreno de valientes. Exige resistencia de sobra.', risk: 'resistencia' }
  ];
  wrapCard(stage, `${state.name.toUpperCase()} · NAVEGACIÓN`, (card) => {
    card.innerHTML += `<div class="scene-text">El cielo cambia de color de golpe. Tienes que elegir una ruta antes de que la corriente decida por ti.</div>`;
    const opts = document.createElement('div'); opts.className = 'options';
    routes.forEach(rt => {
      const el = document.createElement('div'); el.className = 'opt';
      el.innerHTML = `<span class="opt-title">${rt.title}</span><span class="opt-desc">${rt.desc}</span>`;
      el.onclick = () => renderNavResult(stage, rt, step.tier);
      opts.appendChild(el);
    });
    card.appendChild(opts);
    statbar(card);
  });
}

function renderNavResult(stage, route, tier) {
  let success = true;
  if (route.risk) {
    const stat = state.stats[route.risk] || 0;
    const roll = Math.floor(Math.random() * 6) + 1;
    success = (stat + roll) >= (5 + tier);
  }
  stage.innerHTML = ''; // evita apilar la tarjeta de resultado sobre la de elección de ruta
  wrapCard(stage, `${state.name.toUpperCase()} · NAVEGACIÓN`, (card) => {
    card.innerHTML += `<div class="center" style="font-size:26px;margin-bottom:12px;">🎲</div>
      <div class="result-banner ${success ? 'good' : 'bad'}">${success ? 'La ruta sale bien' : 'La ruta sale mal'}</div>
      <div class="scene-text">${success ? 'Llegan enteros y con tiempo de sobra. La tripulación gana confianza en ti.' : 'La corriente los golpea de lleno. Se pierde tiempo, algo del barco se daña, pero salen adelante.'}</div>`;
    const btn = document.createElement('button'); btn.className = 'primary-btn'; btn.textContent = 'Seguir viaje';
    btn.onclick = () => { addMod(success ? { navegacion: 1 } : { resistencia: 1 }); advanceStep(); };
    card.appendChild(btn);
  });
}

function renderShop(stage, step) {
  const mult = step.tier === 1 ? 1 : 1.7;
  const bought = new Set();
  wrapCard(stage, `${state.name.toUpperCase()} · MERCADO`, (card) => {
    card.innerHTML += `<div class="berries-top">Tienes ${fmt(state.berries)} para gastar</div>
      <div class="scene-text">Antes de seguir viaje, aprovechas el puerto para reforzar todo lo que puedas pagar.</div>`;
    const list = document.createElement('div');
    SHOP_ITEMS.forEach(item => {
      const cost = Math.round(item.cost * mult);
      const row = document.createElement('div'); row.className = 'shop-item';
      const modText = Object.keys(item.mod).map(k => `+${item.mod[k]} ${k}`).join(', ');
      row.innerHTML = `<div class="si-info"><b>${item.name}</b><span>${item.desc} (${modText})</span></div>`;
      const btn = document.createElement('button'); btn.textContent = fmt(cost);
      btn.onclick = () => {
        if (state.berries >= cost && !bought.has(item.id)) {
          state.berries -= cost; addMod(item.mod); bought.add(item.id);
          btn.textContent = 'Comprado'; btn.disabled = true;
        }
      };
      row.appendChild(btn);
      list.appendChild(row);
    });
    card.appendChild(list);
    statbar(card);
    const cont = document.createElement('button'); cont.className = 'primary-btn'; cont.textContent = 'Continuar viaje';
    cont.onclick = () => advanceStep();
    card.appendChild(cont);
  });
}
