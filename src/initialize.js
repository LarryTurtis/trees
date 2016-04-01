import {
    Canvas
}
from './canvas.js';
import {
    FallingDrop
}
from './fallingDrop.js';
import {
    Platform
}
from './platform.js';
import {
    Spout
}
from './spout.js';
import {
    ShapesRegistry
}
from './shapesregistry.js'

let shapesRegistry = new ShapesRegistry();
let shooterX = 50;
let speed = 1000;
let interval = null;

function addDrop() {
    var fallingDrop = new FallingDrop(shooterX, 20, 30, 30);
    shapesRegistry.add(fallingDrop);
}

function initialize() {
    window.addEventListener('load', function() {

        let canvas = new Canvas();

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let platform = new Platform(20, 300, 800, 5);
        let spout = new Spout(50, -10, 50, 50);
        shapesRegistry.add(spout);
        shapesRegistry.add(platform);

        interval = setInterval(addDrop, speed);

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

export {
    initialize
};
