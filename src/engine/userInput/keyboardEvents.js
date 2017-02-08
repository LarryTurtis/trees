import { Canvas } from '../canvas.js';
import { ShapesRegistry } from '../shapesregistry.js';

let keyboardEvents = {
    initialize: initialize
}

let shapes = new ShapesRegistry();
let boundingBoxes = false;
let i = 0;

let nowScrolling = false;

function initialize() {
    document.onkeydown = mapKeys;
}

function toggleBoundingBoxes() {
    boundingBoxes = !boundingBoxes;
    shapes.forEach(shape => {
        shape.showBoundingBox = boundingBoxes;
    })
}

function scrollUp() {

    nowScrolling = true;

    if (i < shapes.staticBackgroundCanvas.height.percent(2)) {
        shapes.allCanvases.forEach(canvas => {
            canvas.scroll(-3);
        })
        i++;
        setTimeout(scrollUp, 5);
    } else {
        nowScrolling = false;
    }
}

function scrollDown() {
    nowScrolling = true;
    if (i < shapes.staticBackgroundCanvas.height.percent(2)) {
        shapes.allCanvases.forEach(canvas => {
            canvas.scroll(3);
        })
        i++;
        setTimeout(scrollDown, 5);
    } else {
        nowScrolling = false;
    }
}

function mapKeys(e) {
    e = e || window.event;
    let downArrow = new CustomEvent('downArrow', {});
    let upArrow = new CustomEvent('upArrow', {});

    switch (e.keyCode) {
        case 32: // space
            toggleBoundingBoxes();
            break;
        case 38:
            shapes.allCanvases.forEach(canvas => {
                canvas.dispatchEvent(downArrow);
            })
            break;
        case 40: // down
            console.log('down');
            shapes.allCanvases.forEach(canvas => {
                canvas.dispatchEvent(upArrow);
            })
            break;
        default:
            return;
    }
    e.preventDefault();
};

export { keyboardEvents }