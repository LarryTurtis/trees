import { engine } from './engine/engine.js';

let shapes = engine.shapesRegistry;
let interval = null;

function addDrop() {
    let size = 80;
    let arrow = new engine.complex.Arrow(size, -size, size, size, 0);
    shapes.add(arrow);
}


function load() {

    engine.gravity(true);

    let platform1 = new engine.simples.Rectangle(300, 300, 50, 50, 0);
    let platform2 = new engine.simples.Rectangle(250, 650, 600, 40, -10)
    let triangle = new engine.simples.Triangle(400, 300, 80, 80, 120)
    let circle = new engine.simples.Circle(500, 300, 80, 80)

    let arrow = new engine.complex.Arrow(600, 300, 150, 150, 0)
    let door = new engine.complex.Door(400, 400, 50, 200, 0)

    //shapes.add(platform1);
    //shapes.add(platform2);
    shapes.add(arrow);
    //shapes.add(triangle);
    //shapes.add(circle);

    //interval = setInterval(addDrop, 1000);
    //addDrop();
    

}

function initialize() {
   engine.go(load);
}

export { initialize };