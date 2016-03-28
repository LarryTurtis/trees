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

        let platform = new Platform(0, 300, 3000, 5);
        shapesRegistry.addShape(platform);


        setInterval(function() {

            var droplet = new Droplet(Math.floor(Math.random() * 500) + 1, 0, 20, 20);
            shapesRegistry.addShape(droplet);
            droplet.collisionRegistry.addCollision(platform)
            droplet.lineColor = "transparent";
            droplet.color = "white";
            droplet.lineWidth = 1;

        }, 500);

        var callback = function() {
            //droplet.xSpeed *= 0.995
            //droplet.ySpeed *= 1.02;
        }

        canvas.animate(callback);

    }, false);

    // document.addEventListener('mousemove', function(e) {
    //     shape.x = e.clientX;
    //     shape.y = e.clientY;
    // })
}


export { initialize };
