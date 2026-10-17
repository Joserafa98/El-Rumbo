/**
 * Parámetros de dificultad por tier (1 = primer jefe del mar de origen,
 * 4 = jefe final antes de Laugh Tale). Cada minijuego lee de acá sus
 * propios números, así que sumar un minijuego nuevo normalmente implica
 * sumarle sus campos a cada tier acá.
 */
export const DIFFICULTY = {
  1: {
    diceThreshold: 7, memPairs: 3, memMisses: 3, rpsNeeded: 2,
    timingZone: 34, timingTries: 3, timingHits: 1, bounty: 500, berries: 400,
    claveLen: 4, cargaZone: 32, cargaNeeded: 2, fugaRounds: 4, fugaNeeded: 3,
    palpitoNeeded: 2, dadosThreshold: 14, huecoRounds: 4, huecoNeeded: 3, bluffNeeded: 2
  },
  2: {
    diceThreshold: 8, memPairs: 4, memMisses: 2, rpsNeeded: 3,
    timingZone: 26, timingTries: 3, timingHits: 2, bounty: 900, berries: 650,
    claveLen: 5, cargaZone: 25, cargaNeeded: 2, fugaRounds: 5, fugaNeeded: 4,
    palpitoNeeded: 3, dadosThreshold: 16, huecoRounds: 5, huecoNeeded: 4, bluffNeeded: 2
  },
  3: {
    diceThreshold: 9, memPairs: 5, memMisses: 2, rpsNeeded: 3,
    timingZone: 20, timingTries: 4, timingHits: 2, bounty: 1400, berries: 900,
    claveLen: 6, cargaZone: 19, cargaNeeded: 3, fugaRounds: 5, fugaNeeded: 4,
    palpitoNeeded: 3, dadosThreshold: 18, huecoRounds: 5, huecoNeeded: 4, bluffNeeded: 3
  },
  4: {
    diceThreshold: 10, memPairs: 6, memMisses: 1, rpsNeeded: 4,
    timingZone: 14, timingTries: 4, timingHits: 3, bounty: 2600, berries: 1500,
    claveLen: 7, cargaZone: 14, cargaNeeded: 3, fugaRounds: 6, fugaNeeded: 5,
    palpitoNeeded: 4, dadosThreshold: 20, huecoRounds: 6, huecoNeeded: 5, bluffNeeded: 3
  }
};
