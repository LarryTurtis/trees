import { Canvas } from './canvas.js';
import { Triangle } from './triangle.js';
import { shapesRegistry } from './shapesregistry.js'
import { animate } from './animate.js';

function initialize() {
	var shape;
    window.addEventListener('load', function() {
        var canvas = new Canvas();

        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);

        shapesRegistry.setCanvas(canvas);

        shape = new Triangle(canvas.centerX, canvas.centerY, 50);
        shape.setColor("green");
        shape.setStrokeColor("orange");
        shapesRegistry.addShape(shape);
        var size = 1;
        var callback = function() {
           size += .01;
           //shape.resize(size);
           shape.rotate(size, 200);
        }

        animate(callback);

    }, false);

    // document.addEventListener('mousemove', function(e) {
    //     shape.x = e.clientX;
    //     shape.y = e.clientY;
    // })
}


export { initialize };
