import { DIFFICULTY } from '../data/difficulty.js';
import { resolveBossOutcome } from '../core/combat.js';
import { timerBox, clearTiming } from '../core/timer.js';

/** Timing: golpear justo cuando el indicador pasa por la zona verde. */
export function renderTimingGame(card, step) {
  const diff = DIFFICULTY[step.tier];
  const g = { pos: 0, dir: 1, speed: 1.6 + step.tier * 0.5, tries: diff.timingTries, hits: 0, zoneStart: 40 - diff.timingZone / 2 };
  g.zoneStart = Math.max(4, Math.min(96 - diff.timingZone, g.zoneStart));

  const meta = document.createElement('div'); meta.className = 'timing-meta';
  meta.innerHTML = `<span>Golpeá justo cuando pase por la zona verde</span><span id="timAttempts">Intentos: ${g.tries} · Aciertos: ${g.hits}/${diff.timingHits}</span>`;
  card.appendChild(meta);
  const track = document.createElement('div'); track.className = 'timing-track';
  const zone = document.createElement('div'); zone.className = 'timing-zone';
  zone.style.left = g.zoneStart + '%'; zone.style.width = diff.timingZone + '%';
  const indicator = document.createElement('div'); indicator.className = 'timing-indicator';
  track.appendChild(zone); track.appendChild(indicator);
  card.appendChild(track);
  const btn = document.createElement('button'); btn.className = 'primary-btn'; btn.textContent = '¡GOLPEAR!';
  card.appendChild(btn);

  timerBox.id = setInterval(() => {
    g.pos += g.dir * g.speed;
    if (g.pos >= 100) { g.pos = 100; g.dir = -1; }
    if (g.pos <= 0) { g.pos = 0; g.dir = 1; }
    indicator.style.left = g.pos + '%';
  }, 30);

  btn.onclick = () => {
    const inZone = g.pos >= g.zoneStart && g.pos <= (g.zoneStart + diff.timingZone);
    if (inZone) g.hits++;
    g.tries--;
    document.getElementById('timAttempts').textContent = `Intentos: ${g.tries} · Aciertos: ${g.hits}/${diff.timingHits}`;
    if (g.hits >= diff.timingHits) {
      clearTiming();
      resolveBossOutcome(card, true, step.tier, !!step.final);
    } else if (g.tries <= 0) {
      clearTiming();
      resolveBossOutcome(card, false, step.tier, !!step.final);
    }
  };
}
