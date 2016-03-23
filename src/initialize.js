import { Canvas } from './canvas.js';
import { Stream } from './stream.js';
import { Platform } from './platform.js';
import { Spurt } from './spurt.js';
import { ShapesRegistry } from './shapesregistry.js'
import { CollisionRegistry } from './collisionRegistry.js'

function initialize() {

    let shapesRegistry = new ShapesRegistry();

    window.addEventListener('load', function() {

        let canvas = new Canvas();

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let stream = new Stream(0, 0, 0, 0);
        let platform = new Platform(0, 300, 300, 5);

        shapesRegistry.addShape(stream);
        shapesRegistry.addShape(platform);

        stream.collisionRegistry.addCollision(platform)
        stream.lineColor = "black";
        stream.lineWidth = 5;
        
        var callback = function() {
            // stream.size *= 0.995
            // stream.gravity *= 1.01;
            stream.collisionRegistry.collisions.forEach(collision => {
                if (!collision.resolved) {
                    collision.resolved = true;
                    let newStream = new Stream(stream.c.x, stream.c.y, stream.c.x, stream.c.y);
                    newStream.lineWidth = 5;
                    shapesRegistry.addShape(newStream);
                }
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
