import { engine } from './engine/engine.js';

let shapes = engine.shapesRegistry;
let interval = null;

function addDrop() {
    let size = 40;
    let fallingDrop = new engine.sprites.FallingDrop(size, -size, size, size);
    shapes.add(fallingDrop);
}


function load() {

    engine.gravity(true);

    let platform1 = new engine.sprites.Platform(10, 300, 600, 40, 10);
    let platform2 = new engine.sprites.Platform(250, 650, 600, 40, -10)

    shapes.add(platform1);
    shapes.add(platform2);

    interval = setInterval(addDrop, 1000);
    
    addDrop();
}

function initialize() {
   engine.go(load);
}

export { initialize };