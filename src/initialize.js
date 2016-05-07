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

    let platform1 = new engine.simples.Rectangle(10, 400, 500, 50, 10);
    let platform2 = new engine.simples.Rectangle(250, 650, 600, 40, -10)
    let triangle = new engine.simples.Triangle(400, 300, 80, 80, 30)
    let polygon = new engine.simples.Polygon(10, 300, 100, 100, 0, 9)

    let arrow = new engine.complex.DoubleArrow(10, 100, 80, 80, 0)
    let door = new engine.complex.Door(400, 400, 50, 200, 0)
    let tree = new engine.complex.Tree(10, 20, 20, 200, 0);
    let hose = new engine.complex.Hose(10, 100, 800, 20, 0, engine.simples.Rectangle);

    shapes.add(polygon);
    //shapes.add(platform2);
    shapes.add(arrow);
    shapes.add(hose);
    hose.bend(10, 15, 100);
    hose.bend(14, 23, -100);
    // shapes.add(door);
    // shapes.add(tree);

    // interval = setInterval(addDrop, 1000);
    // addDrop();
    

}

function initialize() {
   engine.go(load);
}

export { initialize };