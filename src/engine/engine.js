import { Canvas } from './canvas.js';
import { ShapesRegistry } from './shapesregistry.js'
import { simples } from './simples/simples.js'
import { complex } from './complex/complex.js'
import { FallingDrop } from './fallingDrop.js'
import { animations } from './animations/animations.js';
import { patterns } from './patterns/patterns.js';
import { mouseEvents } from './userInput/mouseEvents.js';
import { keyboardEvents } from './userInput/keyboardEvents.js';

let shapesRegistry = new ShapesRegistry();
let canvas = new Canvas();

let level = 0;

let engine = {
    canvas: canvas,
    animations: animations,
    patterns: patterns,
    shapesRegistry: shapesRegistry,
    simples: simples,
    complex: complex,
    FallingDrop: FallingDrop,
    go: go,
    levels: []
};

export { engine };

//set canvas height, maps keys, calls game setup function, and begins animation.
function go(callback) {
    shapesRegistry.maxShapes = 10000;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('load', callback, false);

    keyboardEvents.initialize();
    mouseEvents.initialize();

    canvas.animate();

}
