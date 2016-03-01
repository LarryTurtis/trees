import { Canvas } from './canvas.js';
import { shapesRegistry } from './shapesregistry.js';

function animate(callback) {
    var canvas = shapesRegistry.getCanvas();
    var shapes = shapesRegistry.getShapes();

    removeOffScreenObjects(shapes, canvas);

    canvas.ctx.clearRect(0, 0, canvas.element.width, canvas.element.height);
    callback();
    shapes.forEach(shape => {
        shape.draw(canvas.ctx);
    });

    requestAnimationFrame(() => {
        animate(callback);
    });
}

function removeOffScreenObjects(shapes, canvas) {
    if (shapes.length && shapes[shapes.length - 1].x > canvas.element.width) {
        shapesRegistry.removeShape(shapes[shapes.length - 1]);
    }
    if (shapes.length && shapes[shapes.length - 1].y > canvas.element.height) {
        shapesRegistry.removeShape(shapes[shapes.length - 1]);
    }
}

export { animate }
