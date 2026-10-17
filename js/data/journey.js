import { pick } from '../core/helpers.js';
import { TIER1_ENEMIES, TIER2_RIVALS, TIER2_WARLORDS, TIER3_YONKO, TIER3_FINAL } from './enemies.js';

/**
 * Arma el recorrido completo (los 3 arcos: mar de origen, Grand Line,
 * Nuevo Mundo) como una lista plana de "steps". Cada step tiene un
 * `type` que coincide con una clave del dispatcher en screens/journey.js
 * (arcintro, narrative, crew, nav, boss, shop).
 *
 * Para añadir un capítulo nuevo a un arco: agregá un objeto más al array
 * en el punto que quieras. Para añadir un arco completo: copiá un bloque
 * arcintro + sus steps y agregalo al final (y sumá un tier4/5 de enemigos
 * y dificultad si corresponde).
 */
export function buildSteps(seaName, islandName) {
  return [
    { type: 'arcintro', arc: 'Arco I', title: `Tu leyenda en ${seaName}`, text: `Todo capitán empieza en algún lado. El tuyo empieza acá, en ${islandName}.` },
    {
      type: 'narrative',
      text: `Las primeras semanas en el mar te enseñan más que años enteros en tierra firme. Un pueblo cercano a ${islandName} decide, sin saberlo, en qué te vas a convertir.`,
      options: [
        { title: 'Entrenar cuerpo a cuerpo', desc: 'Pasás semanas moliéndote a golpes contra quien se deje.', mod: { combate: 2 } },
        { title: 'Estudiar rutas y corrientes', desc: 'Preferís entender el mar antes que pelear contra él.', mod: { navegacion: 2 } },
        { title: 'Escuchar antes que golpear', desc: 'Aprendés a leer a la gente antes que a leer un mapa.', mod: { carisma: 2 } }
      ]
    },
    {
      type: 'narrative',
      text: 'Otro capitán, con su propia tripulación y su propio orgullo, decide que tu bandera no tiene lugar en este mar todavía.',
      options: [
        { title: 'Pelear a muerte', desc: 'Ganás nombre, ganás miedo, y te llenás de cicatrices.', mod: { combate: 2 }, berries: 150 },
        { title: 'Ganarle con inteligencia', desc: 'Lo dejás en ridículo sin tocarlo. Se corre la voz igual.', mod: { inteligencia: 2 }, berries: 100 },
        { title: 'Evitar el enfrentamiento', desc: 'Te vas sin pelear. No todos los orgullos valen una tumba.', mod: { navegacion: 1, resistencia: 1 } }
      ]
    },
    { type: 'crew' },
    { type: 'boss', enemyKey: 't1', tier: 1, label: 'El primer gran rival de tu mar' },
    { type: 'shop', tier: 1 },

    { type: 'arcintro', arc: 'Arco II', title: 'Entrando al Grand Line', text: 'Las corrientes de cuatro mares chocan en un solo punto. Cruzarlo es la primera prueba real.' },
    {
      type: 'narrative',
      text: 'El cruce te recibe con un clima que cambia sin avisar y corrientes que no perdonan errores de cálculo.',
      options: [
        { title: 'Confiar en tu propia lectura del mar', desc: 'Nadie te va a salvar si te equivocás.', mod: { navegacion: 2 } },
        { title: 'Preguntar a los viejos lobos de mar', desc: 'Tragarte el orgullo también es una habilidad.', mod: { carisma: 1, inteligencia: 1 } },
        { title: 'Forzar el cruce sin más', desc: 'Terco, arriesgado, y a veces funciona.', mod: { resistencia: 2 } }
      ]
    },
    { type: 'nav', tier: 2 },
    {
      type: 'narrative',
      text: 'Una isla que no aparece en ningún mapa oficial guarda ruinas de una civilización que nadie recuerda del todo bien.',
      options: [
        { title: 'Explorar las ruinas', desc: 'Lo que encuentres ahí puede valer más que cualquier tesoro.', mod: { inteligencia: 2, haki: 1 } },
        { title: 'Cazar lo que sea que viva ahí', desc: 'El instinto de pelea manda más que la curiosidad.', mod: { combate: 2 } },
        { title: 'Cartografiar la zona', desc: 'Nadie tiene un mapa bueno de esto todavía. Vos sí vas a tenerlo.', mod: { navegacion: 2 } }
      ]
    },
    { type: 'crew' },
    { type: 'boss', enemyKey: 't2rival', tier: 2, label: 'Otra tripulación novata te disputa el rumbo' },
    { type: 'boss', enemyKey: 't2warlord', tier: 3, label: 'La Marina manda a alguien de peso' },
    { type: 'shop', tier: 2 },

    { type: 'arcintro', arc: 'Arco III', title: 'Entrando al Nuevo Mundo', text: 'Isla Gyojin queda atrás. De acá en más, cada isla puede ser la última.' },
    {
      type: 'narrative',
      text: 'La vida bajo el mar te recibe con una hospitalidad que no esperabas, y con rumores de que el fondo del océano guarda más que corales.',
      options: [
        { title: 'Aceptar la hospitalidad gyojin', desc: 'Ganás aliados donde otros solo ven un lugar de paso.', mod: { carisma: 2 } },
        { title: 'Investigar los rumores del fondo marino', desc: 'Curiosidad peligrosa, recompensa mayor.', mod: { inteligencia: 2 } },
        { title: 'Entrenar con guerreros gyojin', desc: 'Su fuerza física no se parece a nada que hayas visto.', mod: { combate: 2 } }
      ]
    },
    { type: 'nav', tier: 3 },
    { type: 'crew' },
    { type: 'boss', enemyKey: 't3yonko', tier: 3, label: 'Un comandante de un Emperador te corta el paso' },
    {
      type: 'narrative',
      text: 'Ya no hay corrientes marcadas ni consejos de otros capitanes delante tuyo. Solo tu tripulación y lo que aprendiste hasta acá.',
      options: [
        { title: 'Entrenar hasta el límite', desc: 'Últimos ajustes de cuerpo y mente antes del golpe final.', mod: { combate: 1, haki: 1, resistencia: 1 } },
        { title: 'Reforzar el barco y la ruta', desc: 'Preferís llegar entero antes que llegar fuerte.', mod: { navegacion: 2, resistencia: 1 } },
        { title: 'Reunir toda la información posible', desc: 'No hay poder que gane a saber exactamente a qué te enfrentás.', mod: { inteligencia: 2, haki: 1 } }
      ]
    },
    { type: 'boss', enemyKey: 't3final', tier: 4, label: 'La última guardia antes de Laugh Tale', final: true }
  ];
}

/** Sortea un enemigo por cada jefe del recorrido. */
export function pickEnemies() {
  return {
    t1: pick(TIER1_ENEMIES),
    t2rival: pick(TIER2_RIVALS),
    t2warlord: pick(TIER2_WARLORDS),
    t3yonko: pick(TIER3_YONKO),
    t3final: pick(TIER3_FINAL)
  };
}

/** Deja el state listo para arrancar a jugar el recorrido (mutación directa, a propósito). */
export function startJourney(state) {
  state.enemies = pickEnemies();
  state.steps = buildSteps(state.sea.name, state.island.name);
  state.stepIndex = 0;
  state.screen = 'play';
}
