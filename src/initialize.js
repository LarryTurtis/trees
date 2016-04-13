import { Canvas } from './canvas.js';
import { Point } from './point.js';
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
    if (shapesRegistry.length >= 25 && shapesRegistry.shapes["25"]) {
        shapesRegistry.shapes["25"].color = "white";
        clearInterval(interval);
    }
}

function initialize() {
    window.addEventListener('load', function() {
        jQuery(window).on('beforeunload', function() {
            jQuery(window).scrollTop(0);
        });
        canvas.width = window.innerWidth;
        var height = Math.max(document.body.scrollHeight, document.body.offsetHeight,
            document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
        canvas.height = height;

        let page = document.getElementById("page");

        let rect = document.getElementById('handlesw').getBoundingClientRect();
        let platform = new Platform(rect.left, rect.bottom, page.offsetWidth / 12 * 6, 5, -10);

        let rect2 = document.getElementById("handlenw").getBoundingClientRect();
        let platform2 = new Platform(rect2.left, rect2.top - 5, page.offsetWidth / 12 * 8 - 20, 5, 10);

        shapesRegistry.add(platform);
        shapesRegistry.add(platform2);
        interval = setInterval(addDrop, speed);
        addDrop();
        var callback = function() {}

        canvas.animate(callback);

    }, false);

}

export { initialize };
