/**
 * Estilos de combate. `id` se guarda en state.combatStyle y decide, en
 * screens/boss.js, si los combates grandes usan rituales (instinto) o
 * minijuegos reales (tecnica).
 */
export const COMBAT_STYLES = [
  { id: 'instinto', icon: '🎲', name: 'Instinto Feroz', desc: 'Los combates grandes se deciden a pura corazonada: un amuleto, una plegaria al mar, una promesa que te hiciste una vez. No hay truco que aprender, solo confiar.' },
  { id: 'tecnica', icon: '🧠', name: 'Técnica Pura', desc: 'Los combates grandes se deciden con destreza real: memoria, reflejos, timing. Es más exigente, pero ganar depende enteramente de ti.' }
];
