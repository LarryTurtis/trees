var shapes = [];
var canvas = null;
var shapesRegistry = {
    addShape: addShape,
    removeShape: removeShape,
    getShapes: getShapes,
    setCanvas: setCanvas,
    getCanvas: getCanvas
}

function setCanvas(object) {
    canvas = object;
}

function getCanvas() {
    return canvas;
}

function addShape(shape) {
    if (shapes.length < 25) {
        shapes.push(shape);
    }
    return shapes;
}

function removeShape(shape) {
    shapes.splice(shapes.indexOf(shape), 1);
    return shapes
}

function getShapes() {
    return shapes;
}


export { shapesRegistry }
