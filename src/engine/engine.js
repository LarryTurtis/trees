import { Canvas } from './canvas.js';
import { ShapesRegistry } from './shapesregistry.js'
import { simples } from './simples/simples.js'
import { complex } from './complex/complex.js'
import { FallingDrop } from './fallingDrop.js'
import { gravity } from './animations/gravity.js'
import { scroll } from './animations/scroll.js'

let shapesRegistry = new ShapesRegistry();
let canvas = new Canvas();
let boundingBoxes = false;
let clickedShape = null;

let engine = {
    canvas: canvas,
    gravity: gravity,
    scroll: scroll,
    shapesRegistry: shapesRegistry,
    simples: simples,
    complex: complex,
    FallingDrop: FallingDrop,
    mapKeys: mapKeys,
    go: go
}

export { engine };

//set canvas height, maps keys, calls game setup function, and begins animation.
function go(setup) {
    shapesRegistry.maxShapes = 100;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.addEventListener('load', setup, false);
    document.onkeydown = mapKeys;

    engine.callback = function() {
        shapesRegistry.forEach(shape => {
            if (shape.callback) shape.callback();
        })
    }

    window.addEventListener("click", dragObject);

    canvas.animate(engine.callback);

}

function dragObject(e) {
    if (!clickedShape) {
        shapesRegistry.forEach(shape => {
            if (shape.boundary.a.x <= e.clientX &&
                shape.boundary.b.x >= e.clientX &&
                shape.boundary.a.y <= e.clientY &&
                shape.boundary.d.y >= e.clientY) {
                clickedShape = shape;
            }
        });
    } else {
        clickedShape.x = e.clientX;
        clickedShape.y = e.clientY;
        clickedShape = null;
    }
}

function toggleBoundingBoxes() {
    boundingBoxes = !boundingBoxes;
    shapesRegistry.forEach(shape => {
        shape.showBoundingBox = boundingBoxes;
    })
}

function mapKeys(e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 37: // left
            break;

        case 32: // up
            toggleBoundingBoxes();
            break;

        case 38: // up
            if (canvas.fps < 60) canvas.fps += 10;
            break;

        case 39: // right
            break;

        case 40: // down
            if (canvas.fps > 0) canvas.fps -= 1;
            break;

        default:
            return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};
