import { Canvas } from './canvas.js';
import { Cloud } from './cloud.js';
import { ShapesRegistry } from './shapesregistry.js'

function initialize() {
    var shape;
    let shapesRegistry = new ShapesRegistry();
    window.addEventListener('load', function() {
        var canvas = new Canvas();

        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);

        setInterval(() => {
            var shape = new Cloud(-50, 25, 50)
            shapesRegistry.addShape(shape);
            shape.setColor("white");
        }, 400);

        var callback = function() {
            shapesRegistry.shapes.forEach(shape => { 
              shape.x += 1;
            });
        }

        canvas.animate(callback);

    }, false);

    // document.addEventListener('mousemove', function(e) {
    //     shape.x = e.clientX;
    //     shape.y = e.clientY;
    // })
}


export { initialize };
