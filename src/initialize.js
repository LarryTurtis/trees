import { Canvas } from './canvas.js';
import { Marble } from './marble.js';
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
        let marble = new Marble(0, 0, 10, 10);
        let platform = new Platform(0, 300, 300, 5);

        shapesRegistry.addShape(marble);
        shapesRegistry.addShape(platform);

        marble.collisionRegistry.addCollision(platform)
        marble.lineColor = "black";
        marble.lineWidth = 1;

        var callback = function() {
            marble.size *= 0.995
            marble.gravity *= 1.01;
            if (marble.hasCollisions) {
                marble.collisionRegistry.collisions.forEach(collision => {
                    marble.collisionRegistry.removeCollision(collision);
                    //marble.y = platform.y - marble.height;
                });
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
