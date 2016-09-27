let shapesRegistry = new ShapesRegistry();
let level = 0;

import { ShapesRegistry } from './shapesregistry.js';
import { animate } from './animate.js';
import { drawStaticShapes } from './drawStaticShapes.js';
import { simples } from './simples/simples.js';
import { complex } from './complex/complex.js';
import { animations } from './animations/animations.js';
import { patterns } from './patterns/patterns.js';
import { mouseEvents } from './userInput/mouseEvents.js';
import { keyboardEvents } from './userInput/keyboardEvents.js';


let engine = {
    animations: animations,
    patterns: patterns,
    shapesRegistry: shapesRegistry,
    drawStaticShapes: drawStaticShapes,
    simples: simples,
    complex: complex,
    go: go,
    levels: []
};

export { engine };

//set canvas height, maps keys, calls game setup function, and begins animation.
function go(callback) {
    shapesRegistry.maxShapes = 10000;

    shapesRegistry.allCanvases.forEach(canvas => {
        canvas.width = window.innerWidth / 2;
        canvas.height = window.innerHeight / 2;
    });

    window.addEventListener('load', () => {
        callback();
        keyboardEvents.initialize();
        mouseEvents.initialize();
        drawStaticShapes();
        animate();
    }, false);

}