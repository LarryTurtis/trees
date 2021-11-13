let shapesRegistry = new ShapesRegistry();
let level = 0;

import { ShapesRegistry } from "./shapesregistry.js";
import { animate } from "./animate.js";
import { drawStaticShapes } from "./drawStaticShapes.js";
import { simples } from "./simples/simples.js";
import { complex } from "./complex/complex.js";
import { client } from "./client/client.js";
import { patterns } from "./patterns/patterns.js";
import { mouseEvents } from "./userInput/mouseEvents.js";
import { keyboardEvents } from "./userInput/keyboardEvents.js";
import { scrollEvents } from "./userInput/scrollEvents.js";

let engine = {
  patterns: patterns,
  shapesRegistry: shapesRegistry,
  drawStaticShapes: drawStaticShapes,
  simples: simples,
  complex: complex,
  client: client,
  go: go,
  levels: [],
};

export { engine };

//set canvas height, maps keys, calls game setup function, and begins animation.
function go(callback) {
  shapesRegistry.maxShapes = 10000;

  shapesRegistry.allCanvases.forEach((canvas) => {
    canvas.setSize(window.innerWidth, window.innerHeight);
  });
  window.addEventListener(
    "load",
    () => {
      callback();
      drawStaticShapes();
      animate();
    },
    false
  );
}
