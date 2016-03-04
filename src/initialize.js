import { Canvas } from './canvas.js';
import { Stream } from './stream.js';
import { Spurt } from './spurt.js';
import { ShapesRegistry } from './shapesregistry.js'

function initialize() {

    let shapesRegistry = new ShapesRegistry();

    window.addEventListener('load', function() {

        let canvas = new Canvas();

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let shape = new Stream(0, 0, 0, 0)
        shapesRegistry.addShape(shape);
        shape.lineColor = "white";
        shape.lineWidth = 31;

        shape.size = 1;
        shape.gravity = 1;
        var callback = function() {
            if (!shape.hitBottom) {

                shape.size *= 0.995
                shape.gravity *= 1.01;

            } 
        }

        canvas.animate(callback);

    }, false);

    // document.addEventListener('mousemove', function(e) {
    //     shape.x = e.clientX;
    //     shape.y = e.clientY;
    // })
}


export { initialize };
