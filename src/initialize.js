import { Canvas } from './canvas.js';
import { FallingDrop } from './fallingDrop.js';
import { Platform } from './platform.js';
import { Text } from './text.js';
import { ShapesRegistry } from './shapesregistry.js'

let shapesRegistry = new ShapesRegistry();
let speed = 80;
let interval = null;
let canvas = new Canvas();

function addDrop() {
    let dropSize = 80;
    var fallingDrop = new FallingDrop(canvas.width - dropSize * 2, -dropSize, dropSize, dropSize);
    shapesRegistry.add(fallingDrop);
    if (shapesRegistry.length === 25) clearInterval(interval);
}

function initialize() {
    window.addEventListener('load', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        var platform = new Platform(canvas.width / 3, canvas.height / 3, canvas.width, 5, -10);
        var platform2 = new Platform(80, canvas.height / 3 * 2,  canvas.width / 2, 5, 10);
        shapesRegistry.add(platform);
        shapesRegistry.add(platform2);
        //shapesRegistry.add(new Platform(250, 850, 600, 5, -10));

        interval = setInterval(addDrop, speed);
        addDrop();
        var deg = -50;
        var callback = function() {
        }

        canvas.animate(callback);

    }, false);

}

export { initialize };
