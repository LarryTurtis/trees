import { Canvas } from '../canvas.js';
import { ShapesRegistry } from '../shapesregistry.js';

let keyboardEvents = {
    initialize: initialize
}

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
            document.body.dispatchEvent(leftArrow);
            break;
        case 32: // space
            toggleBoundingBoxes();
            break;
        case 38: // up
            //if (shapesRegistry.canvas.fps < 60) shapesRegistry.canvas.fps += 10;
            document.body.dispatchEvent(upArrow)
            break;
        case 39: // right
            //nextScene();
            document.body.dispatchEvent(rightArrow);
            break;
        case 40: // down
            //if (shapesRegistry.canvas.fps > 0) shapesRegistry.canvas.fps -= 1;
            document.body.dispatchEvent(downArrow);
            break;

        default:
            return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
};

export { keyboardEvents }
