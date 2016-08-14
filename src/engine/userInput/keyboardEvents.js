import { Canvas } from '../canvas.js';
import { ShapesRegistry } from '../shapesregistry.js';

let keyboardEvents = {
    initialize: initialize
}

let canvas = new Canvas();
let shapesRegistry = new ShapesRegistry();

let boundingBoxes = false;
let upArrow = new Event('upArrow');
let downArrow = new Event('downArrow');
let leftArrow = new Event('leftArrow');
let rightArrow = new Event('rightArrow');

function initialize() {
    document.onkeydown = mapKeys;
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

export { keyboardEvents }