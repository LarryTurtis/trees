import { Canvas } from './canvas.js';
import { ShapesRegistry } from './shapesregistry.js'
import { simples } from './simples/simples.js'
import { complex } from './complex/complex.js'
import { FallingDrop } from './fallingDrop.js'
import { animations } from './animations/animations.js';
import { patterns } from './patterns/patterns.js';

let shapesRegistry = new ShapesRegistry();
let canvas = new Canvas();
let boundingBoxes = false;
let clickedShape = null;
let level = 0;

let upArrow = new Event('upArrow');
let downArrow = new Event('downArrow');
let leftArrow = new Event('leftArrow');
let rightArrow = new Event('rightArrow');

let mouseX;
let mouseY;

let engine = {
    canvas: canvas,
    animations: animations,
    patterns: patterns,
    shapesRegistry: shapesRegistry,
    simples: simples,
    complex: complex,
    FallingDrop: FallingDrop,
    mapKeys: mapKeys,
    go: go,
    levels: []
};

export { engine };

//set canvas height, maps keys, calls game setup function, and begins animation.
function go(setup) {
    shapesRegistry.maxShapes = 10000;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('load', setup, false);
    document.onkeydown = mapKeys;

    window.addEventListener("mousedown", dragObject);

    canvas.animate();

}

function dragObject(e) {
    console.log('mouse', e.clientX, e.clientY)
    var bRect = canvas.getBoundingClientRect();
    mouseX = (e.clientX - bRect.left) * (canvas.width / bRect.width);
    mouseY = (e.clientY - bRect.top) * (canvas.height / bRect.height);

    shapesRegistry.forEach(shape => {
        if (shape.wasClicked(mouseX, mouseY)) {
            console.log(shape);
        }
    });
}

function toggleBoundingBoxes() {
    boundingBoxes = !boundingBoxes;
    shapesRegistry.forEach(shape => {
        shape.showBoundingBox = boundingBoxes;
    })
}

function nextScene() {
    if (level < engine.levels.length - 1) {
        level++;
        let nextLevel = engine.levels[level];
        if (nextLevel) {
            clearInterval(engine.timer);
            engine.shapesRegistry.reset();
            nextLevel();
        }
    }
}

function previousScene() {
    if (level > 0) {
        level--;
        let nextLevel = engine.levels[level];
        if (nextLevel) {
            clearInterval(engine.timer);
            engine.shapesRegistry.reset();
            nextLevel();
        }
    }
}

function mapKeys(e) {
    e = e || window.event;

    switch (e.keyCode) {
        case 37: // left
            //previousScene();
            canvas.dispatchEvent(leftArrow);
            break;
        case 32: // space
            toggleBoundingBoxes();
            break;
        case 38: // up
            //if (canvas.fps < 60) canvas.fps += 10;
            canvas.dispatchEvent(upArrow);
            break;
        case 39: // right
            //nextScene();
            canvas.dispatchEvent(rightArrow);
            break;
        case 40: // down
            //if (canvas.fps > 0) canvas.fps -= 1;
            canvas.dispatchEvent(downArrow);
            break;

        default:
            return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};