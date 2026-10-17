/** Utilidades chicas, sin estado propio, usadas en todo el proyecto. */

/** Devuelve un elemento al azar de un array. */
export function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/** Devuelve n elementos distintos al azar de un array (sin repetir). */
export function pickN(arr, n) {
  const copy = [...arr];
  const out = [];
  while (out.length < n && copy.length) {
    const i = Math.floor(Math.random() * copy.length);
    out.push(copy.splice(i, 1)[0]);
  }
  return out;
}

/**
 * Suma un objeto de modificadores a las stats del state global, en el lugar.
 * Se importa `state` adentro (no como parámetro) para que todas las
 * pantallas puedan seguir escribiendo `addMod({ combate: 2 })` tal cual
 * estaba en el archivo original de una sola pieza.
 */
import { state } from './state.js';
export function addMod(mod) {
  if (!mod) return;
  Object.keys(mod).forEach(k => { state.stats[k] = (state.stats[k] || 0) + mod[k]; });
}

/** Suma total de todas las stats (se usa para calcular el rango final). */
export function statTotal() {
  return Object.values(state.stats).reduce((a, b) => a + b, 0);
}

/** Formatea un número de berries/recompensa al estilo "฿ 1.234.567". */
export function fmt(n) {
  return '฿ ' + Math.round(n).toLocaleString('es-AR');
}
