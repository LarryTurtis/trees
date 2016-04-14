import { Canvas } from './canvas.js';
import { FallingDrop } from './fallingDrop.js';
import { Platform } from './platform.js';
import { Spout } from './spout.js';
import { ShapesRegistry } from './shapesregistry.js'

let shapesRegistry = new ShapesRegistry();
let shooterX = 100;
let speed = 100;
let interval = null;

        let canvas = new Canvas();
function addDrop() {
    var size = Math.floor(Math.random() * 10) + 17
    var fallingDrop = new FallingDrop(Math.floor(Math.random()*canvas.width), canvas.height, size, size);
    shapesRegistry.add(fallingDrop);
}

function initialize() {
    window.addEventListener('load', function() {


        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let spout = new Spout(50, -10, 50, 50);
        shapesRegistry.add(spout);
        let platform = new Platform(10, 300, 600, 40, 10);
        shapesRegistry.add(platform);
        shapesRegistry.add(new Platform(250, 650, 600, 40, -10));

        interval = setInterval(addDrop, speed);
        addDrop();
        var deg = -50;
        var callback = function() {
            //platform.angle++;
        }

        canvas.animate(callback);

    }, false);

    document.onkeydown = function(e) {
        e = e || window.event;
        switch (e.keyCode) {
            case 37: // left
                shooterX -= 10;
                shapesRegistry.shapes[0].x = shooterX;
                break;

            case 38: // up
                speed -= 100;
                clearInterval(interval);
                interval = setInterval(addDrop, speed);
                break;

            case 39: // right
                shooterX += 10;
                shapesRegistry.shapes[0].x = shooterX;
                break;

            case 40: // down
                speed += 100;
                clearInterval(interval);
                interval = setInterval(addDrop, speed);
                break;

            default:
                return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    };
}

export { initialize };
