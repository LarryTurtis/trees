import { Canvas } from './canvas.js';
import { Cloud } from './cloud.js';
import { shapesRegistry } from './shapesregistry.js'
import { animate } from './animate.js';

function initialize() {
    var shape;
    window.addEventListener('load', function() {
        var canvas = new Canvas();

        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);

        shapesRegistry.setCanvas(canvas);
        setInterval(() => {
            var shape = new Cloud(-50, 25, 50)
            shapesRegistry.addShape(shape);
            shape.setColor("white");
        }, 400);

        var callback = function() {
            shapesRegistry.getShapes().forEach(shape => { 
              shape.x += 1;
            });
        }

        animate(callback);

    }, false);

    // document.addEventListener('mousemove', function(e) {
    //     shape.x = e.clientX;
    //     shape.y = e.clientY;
    // })
}


export { initialize };
