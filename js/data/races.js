/** Razas jugables. Añadir una es sumar un objeto más a este array. */
export const RACES = [
  { id: 'humano', name: 'Humano', desc: 'La raza más común de los mares. Versátil, sin techo claro de crecimiento.', mod: {} },
  { id: 'gigante', name: 'Gigante', desc: 'Naces varias veces más grande que cualquier tripulación. Fuerza descomunal, pero pasas desapercibido en ningún lado.', mod: { combate: 2, navegacion: -1 } },
  { id: 'gyojin', name: 'Gyojin', desc: 'Hijo del mar. Nadas como nadie y tu fuerza física supera por lejos a la de un humano.', mod: { resistencia: 2, navegacion: 1 } },
  { id: 'cielo', name: 'Ciudadano del Cielo', desc: 'Naciste sobre las nubes, en una isla que la mayoría del mundo no cree que existe.', mod: { navegacion: 2, inteligencia: 1 } }
];
