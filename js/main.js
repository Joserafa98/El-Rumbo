/**
 * Punto de entrada. Importa (por efecto secundario) todos los módulos de
 * pantalla, que se registran a sí mismos en SCREENS al cargar, y después
 * dibuja la primera pantalla.
 *
 * Para sumar una pantalla nueva: crea su módulo en js/screens/ (o
 * js/minigames/ si es un minijuego), haz que registre su entrada en
 * SCREENS (ver js/core/screens-registry.js), e impórtalo aquí.
 */
import './screens/creation.js';
import './screens/journey.js';
import './screens/boss.js';
import './screens/final.js';

import { render } from './core/render.js';

render(true);
