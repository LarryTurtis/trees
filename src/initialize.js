import { Canvas } from './canvas.js';
import { Droplet } from './droplet.js';
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
        let droplet = new Droplet(0, 0, 50, 50);
        let platform = new Platform(0, 300, 300, 5);

        shapesRegistry.addShape(droplet);
        shapesRegistry.addShape(platform);

        droplet.collisionRegistry.addCollision(platform)
        droplet.lineColor = "black";
        droplet.lineWidth = 1;

        var callback = function() {
            droplet.xSpeed *= 0.995
            droplet.ySpeed *= 1.01;
        }

        canvas.animate(callback);

    }, false);

    // document.addEventListener('mousemove', function(e) {
    //     shape.x = e.clientX;
    //     shape.y = e.clientY;
    // })
}


export { initialize };
