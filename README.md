# El Rumbo — ¿llegás a Laugh Tale?

Un juego de rol corto, hecho por diversión, inspirado en el estilo de
["El Ídolo"](https://www.potrerofutbol.ar/el-idolo) pero ambientado en un
universo propio de piratas al estilo One Piece. Elegís tu mar de origen,
tu isla, tu raza, tu estilo de combate y tu fruta del diablo (o la
rechazás y vas solo de Haki), y cruzás tres tramos del mundo —tu mar
natal, el Grand Line y el Nuevo Mundo— sumando tripulación, recompensa y
berries hasta llegar (o no) a Laugh Tale.

Es un proyecto sin fines de lucro y sin copyright (ver `LICENSE`): todos
los mares, islas, frutas, razas y enemigos son invención original, para
no pisar derechos de autor de la obra real.

## Probarlo en local

Es un proyecto 100% estático (HTML + CSS + JS con ES Modules), sin build
step. Pero los módulos ES **no funcionan abriendo el archivo directo**
(`file://`) — el navegador los bloquea por seguridad. Hay que servirlo
con cualquier servidor HTTP simple, por ejemplo:

```bash
# con Python (ya viene instalado en casi cualquier sistema)
python3 -m http.server 8000

# o con Node, sin instalar nada
npx serve .
```

Y después abrís `http://localhost:8000` (o el puerto que te haya dado) en
el navegador.

## Subirlo a GitHub Pages

1. Creá un repo nuevo en GitHub y subí todo el contenido de esta carpeta
   (`index.html`, `css/`, `js/`, etc.) a la rama `main`.
2. En el repo, ir a **Settings → Pages**.
3. En "Build and deployment", elegir **Deploy from a branch**, rama
   `main`, carpeta `/ (root)`.
4. Guardar. A los pocos minutos el juego va a estar disponible en
   `https://<tu-usuario>.github.io/<nombre-del-repo>/`.

No hace falta ningún paso de build: GitHub Pages sirve los archivos tal
cual, y los módulos ES funcionan perfecto ahí porque se sirven por HTTPS.

## Cómo está organizado el proyecto

```
index.html          → el shell de la página (carga css/styles.css y js/main.js)
css/
  styles.css         → todo el estilo visual (tema pirata/pergamino, animaciones)
js/
  main.js            → punto de entrada: importa las pantallas y arranca el juego
  core/
    state.js          → el estado global del juego (un objeto mutable)
    helpers.js         → funciones chicas sin estado propio (pick, fmt, addMod...)
    timer.js           → maneja el intervalo del minijuego de timing
    render.js           → el motor de renderizado (render, statbar, progressBar, advanceStep...)
    combat.js            → resuelve qué pasa después de cada combate de jefe
    screens-registry.js → el objeto SCREENS donde se registran todas las pantallas
  data/
    seas.js, races.js, combatStyles.js, fruits.js, crew.js, shop.js,
    enemies.js, difficulty.js, journey.js
                       → todo el contenido del juego: mares, islas, razas,
                         frutas, tripulación, tienda, enemigos, dificultad
                         y el armado del recorrido de 18 pasos
  screens/
    creation.js        → pantallas de creación de personaje (intro → fruta)
    journey.js          → pantallas del recorrido (narrativa, tripulación,
                           navegación, tienda) + el dispatcher de `play`
    boss.js              → pantalla de combate de jefe (instinto / técnica)
    final.js              → cálculo de rango y pantalla de resultado final
  minigames/
    memory.js, rps.js, timing.js, clave.js, carga.js, fuga.js,
    palpito.js, dados.js, hueco.js, bluff.js, index.js
                       → los 10 minijuegos de "Técnica Pura", cada uno en
                         su propio archivo, más el registro que los agrupa
```

El estado (`js/core/state.js`) es un único objeto global que todas las
pantallas leen y escriben directamente — no hay un framework ni un
sistema de componentes, a propósito: es un juego chico pensado para que
cualquiera pueda entrar a un archivo y entender qué hace sin estudiar una
arquitectura compleja.

## Cómo sumar contenido (la parte divertida)

Esto es exactamente para lo que está pensada esta estructura: cada tipo
de contenido vive en su propio archivo chico, así que agregar algo nuevo
casi nunca te obliga a tocar otro archivo.

- **Un mar nuevo**: copiá un bloque dentro de `js/data/seas.js` y cambiale
  `id`, `name`, `desc`, `mod` y sus `islands`.
- **Una isla nueva**: agregala al array `islands` del mar que corresponda,
  en `js/data/seas.js`.
- **Una raza nueva**: sumá un objeto a `js/data/races.js`.
- **Una fruta del diablo nueva**: sumá un objeto a `js/data/fruits.js`
  (recordá inventar fruta, nombre y descripción originales, no copiar las
  del manga/anime real).
- **Un rol de tripulación nuevo**: sumalo a `js/data/crew.js`.
- **Un ítem de tienda nuevo**: sumalo a `js/data/shop.js`.
- **Un enemigo nuevo**: agregalo al tier que corresponda en
  `js/data/enemies.js` (tier 1 = primer jefe del mar de origen, tier 4 =
  jefe final).
- **Un capítulo narrativo nuevo, un combate más, una parada de tienda
  extra**: agregá un objeto al array que devuelve `buildSteps()` en
  `js/data/journey.js`, en el punto del recorrido donde quieras que
  aparezca.
- **Un arco completo nuevo** (un cuarto tramo del viaje, por ejemplo):
  copiá un bloque de arco entero en `js/data/journey.js` y, si lo
  necesitás, sumá un tier 5 de enemigos y de dificultad.
- **Un minijuego nuevo** para los combates de "Técnica Pura":
  1. Creá `js/minigames/tuJuego.js` exportando una función
     `renderTuJuego(card, step)` (mirá cualquiera de los existentes como
     plantilla — todos terminan llamando a `resolveBossOutcome` de
     `core/combat.js` cuando el jugador gana o pierde).
  2. Importala en `js/minigames/index.js` y agregala al objeto
     `TECNICA_GAMES` con una clave nueva.
  3. Si tu minijuego necesita números que varíen según la dificultad
     (tier 1 a 4), sumale esos campos a cada tier en
     `js/data/difficulty.js`.
- **Una pantalla nueva** (un tipo de evento distinto a narrativa/
  crew/nav/boss/shop): escribí su función de render en `js/screens/` (o
  en un archivo nuevo), registrala en el objeto `SCREENS` (importado de
  `core/screens-registry.js`), e importá ese archivo desde `js/main.js`.
- **Ajustar el balance** (qué tan difícil es cada jefe, cuántas rondas
  dura cada minijuego, cuánta recompensa da ganar): todo eso vive
  centralizado en `js/data/difficulty.js`, un solo archivo para los 4
  tiers.

Ninguno de estos cambios requiere tocar el motor (`js/core/`) ni entender
cómo funciona el resto del juego — es la idea de tenerlo separado así.

## Licencia

Dominio público (Unlicense) — ver `LICENSE`. No hay fines comerciales ni
afiliación con Toei Animation, Shueisha ni Eiichiro Oda; todo el contenido
de mares, frutas, razas y enemigos es original.
