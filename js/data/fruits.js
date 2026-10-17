/**
 * Frutas del diablo originales (no son las del manga/anime real, para no
 * pisar derechos de autor). En cada ronda de elección se sortean 3 de este
 * pool más la opción NO_FRUIT (solo Haki). Sumar una fruta nueva es
 * agregar un objeto más al array.
 */
export const FRUITS = [
  { id: 'caldero', name: 'Fruta del Caldero Eterno', type: 'Paramecia', icon: '◆', desc: 'Tu cuerpo se vuelve tan duro y caliente como un caldero al rojo. Los golpes rebotan, el fuego casi no te toca.', mod: { resistencia: 2 } },
  { id: 'cadenas', name: 'Fruta de las Cadenas Vivas', type: 'Paramecia', icon: '◆', desc: 'Podés extender cadenas de metal vivo desde tu propio cuerpo.', mod: { combate: 2 } },
  { id: 'reflejo', name: 'Fruta del Reflejo Roto', type: 'Paramecia', icon: '◆', desc: 'Creás duplicados ilusorios de vos mismo por unos segundos, suficiente para confundir a cualquiera.', mod: { inteligencia: 2 } },
  { id: 'arcilla', name: 'Fruta de la Arcilla Infinita', type: 'Paramecia', icon: '◆', desc: 'Moldeás tu propio cuerpo como si fuera arcilla fresca.', mod: { combate: 1, resistencia: 1 } },
  { id: 'peso', name: 'Fruta del Peso Fantasma', type: 'Paramecia', icon: '◆', desc: 'Podés volver cualquier cosa —incluido tu cuerpo— pesadísima o liviana como el aire.', mod: { combate: 1, navegacion: 1 } },
  { id: 'oso', name: 'Fruta del Oso de Hierro', type: 'Zoan', icon: '✦', desc: 'Te convertís, total o parcialmente, en un oso de proporciones descomunales.', mod: { combate: 2, resistencia: 1 } },
  { id: 'aguila', name: 'Fruta del Águila Real', type: 'Zoan', icon: '✦', desc: 'Te convertís en un ave rapaz enorme, dueña del cielo abierto.', mod: { navegacion: 2, combate: 1 } },
  { id: 'lobo', name: 'Fruta del Lobo de Tormenta', type: 'Zoan', icon: '✦', desc: 'Instinto de cacería y colmillos que no perdonan.', mod: { combate: 1, haki: 1 } },
  { id: 'dragon', name: 'Fruta del Dragón Antiguo', type: 'Zoan Mítica', icon: '✦', desc: 'Una fruta rarísima: te convertís en una bestia alada de una era que ya nadie recuerda.', mod: { combate: 3, resistencia: 1 } },
  { id: 'ceniza', name: 'Fruta de la Ceniza Eterna', type: 'Logia', icon: '❖', desc: 'Tu cuerpo se vuelve ceniza y brasa. Atacás como una tormenta de fuego apagado.', mod: { combate: 2, haki: -1 } },
  { id: 'relampago', name: 'Fruta del Relámpago Quieto', type: 'Logia', icon: '❖', desc: 'Tu cuerpo se convierte en electricidad estática. Rápido, letal, casi imposible de tocar.', mod: { combate: 2, navegacion: 1 } },
  { id: 'niebla', name: 'Fruta de la Niebla Profunda', type: 'Logia', icon: '❖', desc: 'Te disolvés en niebla espesa. Nadie golpea lo que no puede agarrar.', mod: { haki: -1, inteligencia: 2 } }
];

export const NO_FRUIT = {
  id: 'haki', name: 'Rechazar la fruta — solo Haki', icon: '●',
  desc: 'Preferís que tu fuerza salga enteramente de vos, entrenando cuerpo y espíritu.',
  mod: { haki: 3 }, note: 'Seguís nadando como cualquiera.'
};
