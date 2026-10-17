/**
 * Mares de origen.
 * Para añadir un mar nuevo: copiá un bloque, cambiá id/name/desc/mod y sus
 * islands. `mod` se suma a las stats del personaje al elegir el mar;
 * cada isla dentro de `islands` suma un `mod` propio además del mar.
 */
export const SEAS = [
  {
    id: 'east', name: 'East Blue',
    desc: 'El mar más tranquilo de los cuatro. Se aprende rápido y barato, pero nadie te toma en serio al principio.',
    mod: { inteligencia: 1 },
    islands: [
      { name: 'Puerto Escoria', desc: 'Un pueblo pesquero que vive a la sombra de piratas locales.', mod: { resistencia: 1 } },
      { name: 'Bahía Serena', desc: 'Aguas tranquilas, gente amable, casi ningún peligro real.', mod: { carisma: 1 } },
      { name: 'Isla del Farol Roto', desc: 'Un viejo faro apagado guía a menos barcos de los que debería.', mod: { navegacion: 1 } },
      { name: 'Cala Gris', desc: 'Contrabandistas y comerciantes conviven sin hacerse muchas preguntas.', mod: { inteligencia: 1 } }
    ]
  },
  {
    id: 'north', name: 'North Blue',
    desc: 'Mar frío de reinos e intrigas. Buena cuna para estrategas y espadachines de escuela.',
    mod: { combate: 1 },
    islands: [
      { name: 'Frontera Helada', desc: 'Reinos que cambian de mano cada generación.', mod: { resistencia: 1 } },
      { name: 'Isla del Duelo', desc: 'Ahí se resuelven las diferencias con acero, no con palabras.', mod: { combate: 1 } },
      { name: 'Puerto Cuervo', desc: 'Espías, tratados rotos y algún que otro noble caído en desgracia.', mod: { inteligencia: 1 } },
      { name: 'Bahía de Sal Negra', desc: 'Marineros curtidos por tormentas que nadie más navega.', mod: { navegacion: 1 } }
    ]
  },
  {
    id: 'south', name: 'South Blue',
    desc: 'Tierra dura, piratas curtidos desde niños. Se sale con hambre de algo más grande.',
    mod: { resistencia: 1 },
    islands: [
      { name: 'Arrabal del Puño', desc: 'Se pelea por comida antes de aprender a leer.', mod: { combate: 1 } },
      { name: 'Isla Seca', desc: 'La sequía enseñó a esta gente a no desperdiciar nada, ni fuerzas.', mod: { resistencia: 1 } },
      { name: 'Muelle de los Perdidos', desc: 'Un puerto que junta a quien no encaja en ningún otro lado.', mod: { carisma: 1 } },
      { name: 'Roca Quebrada', desc: 'Cazadores de recompensas menores rondan sus tabernas.', mod: { inteligencia: 1 } }
    ]
  },
  {
    id: 'west', name: 'West Blue',
    desc: 'El mar de los reinos en guerra constante. Endurece rápido a quien sobrevive.',
    mod: { carisma: 1 },
    islands: [
      { name: 'Ciudadela Partida', desc: 'Dos coronas se disputan la misma isla desde hace décadas.', mod: { carisma: 1 } },
      { name: 'Puerto Trinchera', desc: 'La guerra dejó más soldados retirados que civiles.', mod: { combate: 1 } },
      { name: 'Isla del Mercado Negro', desc: 'Todo se compra y se vende, incluida la información.', mod: { inteligencia: 1 } },
      { name: 'Cabo Tormenta', desc: 'Las corrientes son tan traicioneras como los tratados de paz.', mod: { navegacion: 1 } }
    ]
  },
  {
    id: 'grandline', name: 'Grand Line / Nuevo Mundo',
    desc: 'Naciste ya dentro de la tormenta. Todo cuesta más caro, pero arrancás sabiendo leer el mar.',
    mod: { navegacion: 2 },
    islands: [
      { name: 'Archipiélago del Clima Loco', desc: 'Cuatro estaciones distintas en el mismo día, y ya estás acostumbrado.', mod: { navegacion: 1 } },
      { name: 'Isla del Log Roto', desc: 'Nadie confía en las brújulas comunes acá, y con razón.', mod: { inteligencia: 1 } },
      { name: 'Puerto de las Corrientes Cruzadas', desc: 'Solo los que crecieron viendo morir barcos ajenos aprenden a no ser el próximo.', mod: { resistencia: 1 } }
    ]
  },
  {
    id: 'tenryuubito', name: 'Tenryuubito',
    desc: 'Naciste en la cima del mundo, en Mary Geoise. Nadie se atreve a tocarte... pero tampoco a confiar en vos.',
    mod: { carisma: 2, haki: -1 },
    islands: [
      { name: 'Sector Alto de Mary Geoise', desc: 'Nunca tocaste el suelo común hasta el día que decidiste bajar.', mod: { carisma: 1 } },
      { name: 'Terraza de las Estatuas Doradas', desc: 'Creciste rodeado de lujo y de miedo ajeno.', mod: { inteligencia: 1 } }
    ]
  }
];
