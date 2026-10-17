/**
 * Caja mutable para guardar el id del intervalo del minijuego de timing
 * (renderTimingGame). Se usa un objeto en vez de una variable suelta para
 * poder importarlo y mutarlo desde distintos módulos sin ciclos.
 */
export const timerBox = { id: null };

/** Detiene y limpia el intervalo de timing activo, si hay uno. */
export function clearTiming() {
  if (timerBox.id !== null) {
    clearInterval(timerBox.id);
    timerBox.id = null;
  }
}
