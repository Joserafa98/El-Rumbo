import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';

/** El Golpe Cargado: mantener presionado y soltar justo en la zona dorada. */
export function renderChargeGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const g = { pos: 0, charging: false, tries: 3, hits: 0, zoneStart: 50 - diff.cargaZone / 2 };
  g.zoneStart = Math.max(4, Math.min(96 - diff.cargaZone, g.zoneStart));
  const meta = document.createElement('div'); meta.className = 'timing-meta';
  meta.innerHTML = `<span>Mantén presionado para cargar el golpe y suelta en la zona dorada</span><span id="chargeAttempts">Intentos: ${g.tries} · Aciertos: ${g.hits}/${diff.cargaNeeded}</span>`;
  card.appendChild(meta);
  const track = document.createElement('div'); track.className = 'timing-track';
  const zone = document.createElement('div'); zone.className = 'timing-zone';
  zone.style.left = g.zoneStart + '%'; zone.style.width = diff.cargaZone + '%';
  const indicator = document.createElement('div'); indicator.className = 'timing-indicator';
  indicator.style.left = '0%';
  track.appendChild(zone); track.appendChild(indicator);
  card.appendChild(track);
  const btn = document.createElement('button'); btn.className = 'primary-btn'; btn.textContent = 'MANTENER PARA CARGAR';
  card.appendChild(btn);

  let interval = null;
  function startCharge() {
    if (g.charging || g.tries <= 0) return;
    g.charging = true; g.pos = 0;
    interval = setInterval(() => {
      g.pos += 2.1 + step.tier * 0.45;
      if (g.pos >= 100) { g.pos = 100; indicator.style.left = '100%'; release(); return; }
      indicator.style.left = g.pos + '%';
    }, 30);
  }
  function release() {
    if (!g.charging) return;
    g.charging = false;
    clearInterval(interval);
    const inZone = g.pos >= g.zoneStart && g.pos <= (g.zoneStart + diff.cargaZone);
    if (inZone) g.hits++;
    g.tries--;
    document.getElementById('chargeAttempts').textContent = `Intentos: ${g.tries} · Aciertos: ${g.hits}/${diff.cargaNeeded}`;
    g.pos = 0; indicator.style.left = '0%';
    if (g.hits >= diff.cargaNeeded) { resolveBossOutcome(card, true, step.tier, !!step.final); }
    else if (g.tries <= 0) { resolveBossOutcome(card, false, step.tier, !!step.final); }
  }
  btn.addEventListener('mousedown', startCharge);
  btn.addEventListener('touchstart', (e) => { e.preventDefault(); startCharge(); });
  btn.addEventListener('mouseup', release);
  btn.addEventListener('mouseleave', () => { if (g.charging) release(); });
  btn.addEventListener('touchend', (e) => { e.preventDefault(); release(); });
}
