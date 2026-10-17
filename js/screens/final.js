import { state, resetState } from '../core/state.js';
import { SCREENS } from '../core/screens-registry.js';
import { render } from '../core/render.js';
import { statTotal, fmt } from '../core/helpers.js';

/**
 * Calcula el rango final según stats totales, recompensa y jefes ganados.
 * Para ajustar el balance de rangos, toca los umbrales de `score` aquí.
 */
function computeRank() {
  const total = statTotal();
  const score = total * 55 + state.bounty * 0.6 + state.bossesWon * 300;
  if (state.finalOutcome === false) return { title: 'La leyenda incompleta', sub: 'Llegaste hasta la última isla, pero el golpe final no fue tuyo. Aun así, nadie te va a olvidar.' };
  if (score >= 6200) return { title: 'Rey / Reina de los Piratas', sub: 'Tu bandera ondea en Laugh Tale. Se acabó la búsqueda, empieza la leyenda.' };
  if (score >= 5000) return { title: 'Emperador del Nuevo Mundo', sub: 'Tu nombre pesa tanto como el de cualquier gobierno.' };
  if (score >= 3800) return { title: 'Corsario temido', sub: 'El mundo entero conoce tu bandera, y la mayoría prefiere no cruzársela.' };
  if (score >= 2600) return { title: 'Novato de Supernova', sub: 'Tu recompensa ya asusta en los puertos correctos.' };
  return { title: 'Pirata en ascenso', sub: 'Apenas estás empezando, pero ya no hay vuelta atrás.' };
}

SCREENS.final = (stage) => {
  const rank = computeRank();
  const crewHtml = state.crew.length ? state.crew.map(c => `<div><b>${c}</b></div>`).join('') : '<div>Navegaste en solitario todo el viaje.</div>';
  stage.innerHTML = `
    <div class="brand"><div class="kicker">FIN DEL VIAJE</div></div>
    <div class="card statue">
      <div class="scene-label">${state.sea.name} · ${state.island.name} · ${state.race.name} · ${state.power.name}</div>
      <h2 class="rank-name">${rank.title}</h2>
      <div class="rank-sub">${rank.sub}</div>
      <div class="final-stats">
        <div class="fs"><div class="k">COMBATE</div><div class="v">${state.stats.combate || 0}</div></div>
        <div class="fs"><div class="k">HAKI</div><div class="v">${state.stats.haki || 0}</div></div>
        <div class="fs"><div class="k">INTELIGENCIA</div><div class="v">${state.stats.inteligencia || 0}</div></div>
        <div class="fs"><div class="k">CARISMA</div><div class="v">${state.stats.carisma || 0}</div></div>
        <div class="fs"><div class="k">NAVEGACIÓN</div><div class="v">${state.stats.navegacion || 0}</div></div>
        <div class="fs"><div class="k">RESISTENCIA</div><div class="v">${state.stats.resistencia || 0}</div></div>
      </div>
      <div class="scene-label">RECOMPENSA FINAL</div>
      <h3 style="color:var(--parchment); margin:6px 0 4px;">${fmt(state.bounty)}</h3>
      <div class="scene-label" style="margin-top:14px;">BERRIES RESTANTES</div>
      <h3 style="color:var(--parchment); margin:6px 0 20px;">${fmt(state.berries)}</h3>
      <div class="scene-label">COMBATES GANADOS: ${state.bossesWon} / 5</div>
      <div class="scene-label" style="margin-top:14px;">TU TRIPULACIÓN</div>
      <div class="crew-list">${crewHtml}</div>
      <button class="primary-btn" id="restart">Zarpar de nuevo</button>
    </div>`;
  stage.querySelector('#restart').onclick = () => {
    resetState();
    render();
  };
};
