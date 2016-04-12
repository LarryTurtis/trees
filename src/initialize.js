import { Canvas } from './canvas.js';
import { FallingDrop } from './fallingDrop.js';
import { Platform } from './platform.js';
import { Spout } from './spout.js';
import { ShapesRegistry } from './shapesregistry.js'

let shapesRegistry = new ShapesRegistry();
let shooterX = 100;
let speed = 1000;
let interval = null;

function addDrop() {
    var fallingDrop = new FallingDrop(shooterX, 20, 80, 80);
    shapesRegistry.add(fallingDrop);
}

function initialize() {
    window.addEventListener('load', function() {

        let canvas = new Canvas();

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        let spout = new Spout(50, -10, 50, 50);
        shapesRegistry.add(spout);

        shapesRegistry.add(new Platform(10, 300, 600, 5, 10));
        shapesRegistry.add(new Platform(250, 850, 600, 5, -10));

        interval = setInterval(addDrop, speed);
        addDrop();
        var deg = -50;
        var callback = function() {
            //fallingDrop.xSpeed *= 0.995
            //fallingDrop.ySpeed *= 1.02;
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
