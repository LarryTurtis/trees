import { engine } from './engine/engine.js';

let shapes = engine.shapesRegistry;
let interval = null;

function addDrop() {
    let size = 80;
    let fallingDrop = new engine.FallingDrop(size, -size, size, size);
    shapes.add(fallingDrop);
}


function load() {

    engine.gravity(true);

    let platform1 = new engine.simples.Rectangle(10, 300, 600, 40, 10);
    let platform2 = new engine.simples.Rectangle(250, 650, 600, 40, -10)
    let triangle = new engine.simples.Triangle(400, 300, 80, 80, 0)

    let arrow = new engine.complex.Arrow(600, 300, 80, 80, 90)

    shapes.add(platform1);
    shapes.add(platform2);
    shapes.add(triangle);
    shapes.add(arrow);

    interval = setInterval(addDrop, 1000);
    
    addDrop();
}

function initialize() {
   engine.go(load);
}

export { initialize };