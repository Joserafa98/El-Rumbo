import { state } from './state.js';
import { SCREENS } from './screens-registry.js';
import { fmt } from './helpers.js';
import { clearTiming } from './timer.js';

/**
 * Vuelve a dibujar la pantalla actual (state.screen) dentro del #stage,
 * con una transición de salida/entrada en CSS (clases `stage-exit` /
 * `stage-enter`, definidas en css/styles.css).
 */
export function render(skipExit) {
  clearTiming();
  const stage = document.getElementById('stage');
  const swap = () => {
    stage.innerHTML = '';
    SCREENS[state.screen](stage);
    stage.classList.remove('stage-exit');
    void stage.offsetWidth; // fuerza reflow para reiniciar la animación
    stage.classList.add('stage-enter');
    window.scrollTo(0, 0);
  };
  if (skipExit || !stage.firstChild) {
    swap();
  } else {
    stage.classList.remove('stage-enter');
    stage.classList.add('stage-exit');
    setTimeout(swap, 150);
  }
}

/** Dibuja la barra de stats actuales dentro de un contenedor dado. */
export function statbar(container) {
  const wrap = document.createElement('div'); wrap.className = 'statbar-wrap';
  const labels = { combate: 'Combate', haki: 'Haki', inteligencia: 'Inteligencia', carisma: 'Carisma', navegacion: 'Navegación', resistencia: 'Resistencia' };
  Object.keys(labels).forEach(k => {
    const s = document.createElement('div'); s.className = 'stat';
    s.innerHTML = `<b>${state.stats[k] || 0}</b> ${labels[k]}`;
    wrap.appendChild(s);
  });
  const b1 = document.createElement('div'); b1.className = 'stat'; b1.innerHTML = `<b>${fmt(state.bounty)}</b> Recompensa`;
  const b2 = document.createElement('div'); b2.className = 'stat'; b2.innerHTML = `<b>${fmt(state.berries)}</b> Berries`;
  wrap.appendChild(b1); wrap.appendChild(b2);
  container.appendChild(wrap);
}

/** Dibuja una barra de progreso de segmentos "paso actual / total". */
export function progressBar(container, current, total) {
  const p = document.createElement('div'); p.className = 'progress';
  for (let i = 0; i < total; i++) {
    const seg = document.createElement('span'); const fill = document.createElement('i');
    fill.style.width = i < current ? '100%' : (i === current ? '55%' : '0%');
    seg.appendChild(fill); p.appendChild(seg);
  }
  container.appendChild(p);
}

/** Dibuja el encabezado tipo "kicker" (actualmente sin uso directo, se mantiene por compatibilidad). */
export function kicker(container, text) {
  const wrap = document.createElement('div'); wrap.className = 'brand';
  wrap.innerHTML = `<div class="kicker">${text}</div>`;
  container.appendChild(wrap);
}

/** Avanza al siguiente paso del recorrido (state.steps) y vuelve a renderizar. */
export function advanceStep() {
  state.stepIndex++;
  if (state.stepIndex >= state.steps.length) { state.screen = 'final'; }
  else { state.screen = 'play'; }
  render();
}

/** Devuelve el objeto de paso actual del recorrido. */
export function currentStep() {
  return state.steps[state.stepIndex];
}
