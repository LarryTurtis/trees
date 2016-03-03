import { Canvas } from './canvas.js';
import { Stream } from './stream.js';
import { ShapesRegistry } from './shapesregistry.js'

function initialize() {

    let shapesRegistry = new ShapesRegistry();

    window.addEventListener('load', function() {

        let canvas = new Canvas();

        canvas.setWidth(window.innerWidth);
        canvas.setHeight(window.innerHeight);

        //setInterval(() => {
        let shape = new Stream(0, 100, 0, 25)
        shapesRegistry.addShape(shape);
        shape.color = "white";
        shape.lineColor = "black"
            //}, 400);
        let size = 1;
        let gravity = 1;
        var callback = function() {
            shapesRegistry.shapes.forEach(shape => {
                shape.w += size;
                shape.gravity += gravity;
                size *= 0.99;
                gravity *= gravity < 30 ? 1.10 : 1;
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
