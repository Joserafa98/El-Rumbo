import { state } from '../core/state.js';
import { SCREENS } from '../core/screens-registry.js';
import { render } from '../core/render.js';
import { addMod, pickN } from '../core/helpers.js';
import { SEAS } from '../data/seas.js';
import { RACES } from '../data/races.js';
import { COMBAT_STYLES } from '../data/combatStyles.js';
import { FRUITS, NO_FRUIT } from '../data/fruits.js';
import { buildSteps, pickEnemies } from '../data/journey.js';

/**
 * Pantallas de creación de personaje: intro → nombre → mar → isla → raza →
 * estilo de combate → fruta. La última (fruitIntro) termina armando el
 * recorrido completo con buildGame() y entra a la pantalla `play`.
 *
 * Para sumar un paso nuevo al flujo de creación: creá la pantalla acá,
 * sumala a SCREENS, y cambiá el `state.screen = '...'` del paso anterior
 * para que apunte a la tuya.
 */

SCREENS.intro = (stage) => {
  stage.innerHTML = `
    <div class="brand">
      <div class="kicker">UN MAR, UNA BANDERA, UN RUMBO</div>
      <h1>EL RUMBO</h1>
      <p>¿Llegás a tener tu estatua en Laugh Tale?</p>
    </div>
    <div class="card">
      <div class="scene-text">
        Nacés en algún rincón de un mundo cubierto de mar. Elegís tu origen, tu poder y tu forma de pelear.
        Cruzás tres tramos —tu mar de origen, el Grand Line y el Nuevo Mundo— sumando tripulación, recompensa
        y berries en el camino. Al final, o tu nombre queda escrito para siempre, o se pierde en el intento.
      </div>
      <button class="primary-btn" id="start">Zarpar</button>
    </div>
    <div class="footer-note">Juego de rol corto hecho por diversión. Personajes, frutas e islas son ficción original.</div>
  `;
  stage.querySelector('#start').onclick = () => { state.screen = 'name'; render(); };
};

SCREENS.name = (stage) => {
  stage.innerHTML = `
    <div class="brand"><div class="kicker">CREACIÓN</div><h1 style="font-size:26px;">¿Cómo te llamás?</h1></div>
    <div class="card">
      <div class="scene-text">El primer nombre que corre de boca en boca en un puerto es siempre el más difícil de olvidar.</div>
      <input type="text" id="nameInput" maxlength="24" placeholder="Nombre de tu capitán o capitana">
      <button class="primary-btn" id="next" disabled>Continuar</button>
    </div>`;
  const input = stage.querySelector('#nameInput'); const btn = stage.querySelector('#next');
  input.oninput = () => { btn.disabled = input.value.trim().length < 2; };
  input.addEventListener('keydown', e => { if (e.key === 'Enter' && !btn.disabled) btn.click(); });
  btn.onclick = () => { state.name = input.value.trim(); state.screen = 'sea'; render(); };
};

SCREENS.sea = (stage) => {
  stage.innerHTML = `
    <div class="brand"><div class="kicker">CREACIÓN · MAR DE ORIGEN</div><h1 style="font-size:26px;">¿En qué mar naciste?</h1></div>
    <div class="card"><div class="scene-text">Antes de tu primera pelea, antes de tu primera fruta, hubo un mar que te vio nacer.</div>
    <div class="options" id="opts"></div></div>`;
  const opts = stage.querySelector('#opts');
  SEAS.forEach(s => {
    const el = document.createElement('div'); el.className = 'opt';
    el.innerHTML = `<span class="opt-title">${s.name}</span><span class="opt-desc">${s.desc}</span>`;
    el.onclick = () => { state.sea = s; state.screen = 'island'; render(); };
    opts.appendChild(el);
  });
};

SCREENS.island = (stage) => {
  stage.innerHTML = `
    <div class="brand"><div class="kicker">CREACIÓN · ISLA NATAL</div><h1 style="font-size:26px;">¿De qué isla de ${state.sea.name} venís?</h1></div>
    <div class="card"><div class="scene-text">Cada isla de este mar cría gente distinta.</div>
    <div class="options" id="opts"></div></div>`;
  const opts = stage.querySelector('#opts');
  state.sea.islands.forEach(isl => {
    const el = document.createElement('div'); el.className = 'opt';
    el.innerHTML = `<span class="opt-title">${isl.name}</span><span class="opt-desc">${isl.desc}</span>`;
    el.onclick = () => { state.island = isl; addMod(state.sea.mod); addMod(isl.mod); state.screen = 'race'; render(); };
    opts.appendChild(el);
  });
};

SCREENS.race = (stage) => {
  stage.innerHTML = `
    <div class="brand"><div class="kicker">CREACIÓN · RAZA</div><h1 style="font-size:26px;">¿A qué raza pertenecés?</h1></div>
    <div class="card"><div class="scene-text">Naciste en ${state.island.name}, ${state.sea.name}. Pero tu cuerpo viene de mucho más atrás que eso.</div>
    <div class="options" id="opts"></div></div>`;
  const opts = stage.querySelector('#opts');
  RACES.forEach(r => {
    const el = document.createElement('div'); el.className = 'opt';
    el.innerHTML = `<span class="opt-title">${r.name}</span><span class="opt-desc">${r.desc}</span>`;
    el.onclick = () => { state.race = r; addMod(r.mod); state.screen = 'combatStyle'; render(); };
    opts.appendChild(el);
  });
};

SCREENS.combatStyle = (stage) => {
  stage.innerHTML = `
    <div class="brand"><div class="kicker">CREACIÓN · ESTILO DE COMBATE</div><h1 style="font-size:24px;">¿Qué clase de peleador sos?</h1></div>
    <div class="card">
      <div class="scene-text">Define cómo se resuelven TODOS los combates grandes de tu viaje. No se puede cambiar después.</div>
      <div class="grid2" id="opts"></div>
    </div>`;
  const opts = stage.querySelector('#opts');
  COMBAT_STYLES.forEach(cs => {
    const el = document.createElement('div'); el.className = 'style-card';
    el.innerHTML = `<span class="si">${cs.icon}</span><h3>${cs.name}</h3><p>${cs.desc}</p>`;
    el.onclick = () => { state.combatStyle = cs.id; state.screen = 'fruitIntro'; render(); };
    opts.appendChild(el);
  });
};

SCREENS.fruitIntro = (stage) => {
  const choices = pickN(FRUITS, 3);
  state._fruitChoices = choices;
  stage.innerHTML = `
    <div class="brand"><div class="kicker">ARCO I · ${state.sea.name.toUpperCase()}</div><h1 style="font-size:24px;">Algo apareció en la orilla</h1></div>
    <div class="card">
      <div class="scene-text">Un día, cerca de ${state.island.name}, encontrás algo que no tiene ningún sentido: una fruta rara, de aspecto imposible. Se dice que hay al menos tres tipos en el mundo. O podés decidir que no la vas a tocar.</div>
      <div class="options" id="opts"></div>
    </div>`;
  const opts = stage.querySelector('#opts');
  [...choices, NO_FRUIT].forEach(p => {
    const el = document.createElement('div'); el.className = 'opt';
    el.innerHTML = `<span class="fruit-icon">${p.icon}</span><span class="opt-title">${p.name}${p.type ? ` <span style="font-weight:400;font-size:11px;color:var(--teal)">· ${p.type}</span>` : ''}</span><span class="opt-desc">${p.desc}</span><span class="opt-tags">${p.note || 'No podés volver a nadar en tu vida.'}</span>`;
    el.onclick = () => { state.power = p; addMod(p.mod); buildGame(); };
    opts.appendChild(el);
  });
};

/** Arma el recorrido completo (3 arcos) y entra a la pantalla de juego. */
function buildGame() {
  state.enemies = pickEnemies();
  state.steps = buildSteps(state.sea.name, state.island.name);
  state.stepIndex = 0;
  state.screen = 'play';
  render();
}
