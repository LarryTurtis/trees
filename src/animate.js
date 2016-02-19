import { Canvas } from './canvas.js';
import { shapesRegistry } from './shapesregistry.js';

function animate(callback) {
	var canvas = shapesRegistry.getCanvas();
	var shapes = shapesRegistry.getShapes();

    canvas.ctx.clearRect(0, 0, canvas.element.width, canvas.element.height);
    
    shapes.forEach(shape => {
    	shape.draw(canvas.ctx);
    });

    callback();

    requestAnimationFrame(() => {
    	animate(callback);
    });
}

export { animate }