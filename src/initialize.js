import { engine } from './engine/engine.js';

let shapes = engine.shapesRegistry;
let interval = null;

function addDrop() {
    let size = 80;
    let fallingDrop = new engine.sprites.FallingDrop(size, -size, size, size);
    shapes.add(fallingDrop);
}


function load() {

    engine.gravity(true);

    let platform1 = new engine.sprites.Rectangle(10, 300, 600, 40, 10);
    let platform2 = new engine.sprites.Rectangle(250, 650, 600, 40, -10)
    let triangle = new engine.sprites.Triangle(400, 300, 80, 80, 0)

    shapes.add(platform1);
    shapes.add(platform2);
    shapes.add(triangle);

    interval = setInterval(addDrop, 1000);
    
    addDrop();
}

function initialize() {
   engine.go(load);
}

export { initialize };