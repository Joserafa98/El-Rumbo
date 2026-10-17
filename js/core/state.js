/**
 * Estado global del juego. Es un único objeto mutable que todas las
 * pantallas leen y escriben directamente (no hay store ni eventos),
 * igual que en el archivo original de una sola pieza.
 */
export const state = {
  screen: 'intro', name: '', sea: null, island: null, race: null, combatStyle: null, power: null,
  stats: { combate: 0, haki: 0, inteligencia: 0, carisma: 0, navegacion: 0, resistencia: 0 },
  bounty: 0, berries: 0, crew: [], bossesWon: 0, steps: [], stepIndex: 0, enemies: {}
};

/** Reinicia el state a su forma inicial, mutando el mismo objeto exportado (usado en "Zarpar de nuevo"). */
export function resetState() {
  Object.assign(state, {
    screen: 'intro', name: '', sea: null, island: null, race: null, combatStyle: null, power: null,
    stats: { combate: 0, haki: 0, inteligencia: 0, carisma: 0, navegacion: 0, resistencia: 0 },
    bounty: 0, berries: 0, crew: [], bossesWon: 0, steps: [], stepIndex: 0, enemies: {}, finalOutcome: undefined
  });
}
