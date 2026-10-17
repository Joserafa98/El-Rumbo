/** Roles de tripulación reclutables en las paradas de puerto. */
export const CREW_ROLES = [
  { role: 'Espadachín', desc: 'Corta lo que se le ponga adelante, empezando por tus enemigos.', mod: { combate: 2 } },
  { role: 'Navegante', desc: 'Lee el cielo y las corrientes mejor que cualquier mapa.', mod: { navegacion: 2 } },
  { role: 'Cocinero', desc: 'Mantiene a la tripulación de pie y con la moral alta.', mod: { resistencia: 1, carisma: 1 } },
  { role: 'Médico', desc: 'La diferencia entre una herida y un funeral.', mod: { resistencia: 2 } },
  { role: 'Tirador', desc: 'Golpea desde donde nadie lo espera.', mod: { combate: 1, inteligencia: 1 } },
  { role: 'Arqueólogo', desc: 'Sabe leer ruinas, historia y trampas antes de que te maten.', mod: { inteligencia: 2 } },
  { role: 'Carpintero', desc: 'Tu barco no se hunde mientras esta persona esté a bordo.', mod: { resistencia: 1, navegacion: 1 } },
  { role: 'Músico', desc: 'Sube la moral en los peores momentos, y hace correr tu leyenda por los puertos.', mod: { carisma: 2 } }
];
