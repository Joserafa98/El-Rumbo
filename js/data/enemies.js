/**
 * Enemigos originales, agrupados por tier de dificultad (1 a 4).
 * Cada combate de jefe sortea uno al azar de la lista que le corresponde
 * (ver data/journey.js). Sumar un enemigo es agregar un objeto a su tier.
 */
export const TIER1_ENEMIES = [
  { name: 'Capitán Garra Oxidada', race: 'Humano', power: 'Fruta de las Cadenas Vivas', desc: 'Un pirata local temido en los puertos chicos, nada más.' },
  { name: 'Teniente Fen', race: 'Gyojin', power: 'Haki puro', desc: 'Marino de bajo rango, pero con la fuerza de un gyojin entero.' },
  { name: 'Mano Fría', race: 'Humano', power: 'Fruta del Relámpago Quieto', desc: 'Mercenario solitario que cobra por adelantado.' },
  { name: 'La Vieja Bruma', race: 'Ciudadana del Cielo', power: 'Fruta de la Niebla Profunda', desc: 'Cayó de las nubes hace años y nunca contó por qué.' }
];

export const TIER2_RIVALS = [
  { name: '"Colmillo" Reiko', race: 'Humana', power: 'Fruta del Lobo de Tormenta', desc: 'Otra rookie con su propia tripulación y su propio orgullo.' },
  { name: 'Kanoa el Trepador', race: 'Gigante', power: 'Sin fruta, puro músculo', desc: 'Escaló su fama a golpes, literalmente.' },
  { name: 'El Cartógrafo Ciego', race: 'Humano', power: 'Fruta del Reflejo Roto', desc: 'Dice conocer el Grand Line mejor que nadie vivo.' },
  { name: 'Suri de las Mil Caras', race: 'Gyojin', power: 'Fruta de la Arcilla Infinita', desc: 'Nadie sabe cuál de sus caras es la real.' }
];

export const TIER2_WARLORDS = [
  { name: 'Almirante en ascenso Corvo', race: 'Humano', power: 'Fruta de la Ceniza Eterna', desc: 'La Marina lo mueve de isla en isla como advertencia.' },
  { name: '"Águila de Hierro" Vantor', race: 'Ciudadano del Cielo', power: 'Fruta del Águila Real', desc: 'Ex corsario, ahora caza por cuenta propia.' },
  { name: 'La Dama del Caldero', race: 'Humana', power: 'Fruta del Caldero Eterno', desc: 'Corsaria retirada que volvió a las andadas.' },
  { name: 'Gorobei Rompehuesos', race: 'Gigante', power: 'Fruta del Oso de Hierro', desc: 'Un gigante con licencia del gobierno, lo peor de ambos mundos.' }
];

export const TIER3_YONKO = [
  { name: 'Comandante "Marea Negra" Oyuki', race: 'Gyojin', power: 'Fruta de la Niebla Profunda', desc: 'Segunda al mando de una tripulación que gobierna medio océano.' },
  { name: 'El Verdugo de Cristal', race: 'Humano', power: 'Fruta del Relámpago Quieto', desc: 'Ajusticia a quien cruza el territorio de su capitán sin permiso.' },
  { name: 'Hyoga, Puño de Escarcha', race: 'Humano', power: 'Fruta del Dragón Antiguo', desc: 'Uno de los brazos derechos más temidos del Nuevo Mundo.' },
  { name: 'La Bibliotecaria de Huesos', race: 'Ciudadana del Cielo', power: 'Fruta del Reflejo Roto', desc: 'Sabe más secretos del mundo de los que debería.' }
];

export const TIER3_FINAL = [
  { name: 'El Comandante de la Última Línea', race: 'Humano', power: 'Fruta del Dragón Antiguo', desc: 'La última guardia antes de Laugh Tale. No pierde, o al menos nunca perdió.' },
  { name: 'Kurogane, el Emperador Silencioso', race: 'Gigante', power: 'Haki puro, ninguna fruta', desc: 'No necesitó nunca un poder del diablo para llegar a la cima.' },
  { name: 'La Reina de la Ceniza', race: 'Humana', power: 'Fruta de la Ceniza Eterna', desc: 'Gobierna su tramo del Nuevo Mundo desde hace veinte años.' }
];
