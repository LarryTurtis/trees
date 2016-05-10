import { engine } from './engine/engine.js';

let shapes = engine.shapesRegistry;
let interval = null;
let i = 1;
let a = 0;
let hose;

function addDrop() {
    let size = 80;
    let arrow = new engine.complex.Arrow(size, -size, size, size, 0);
    shapes.add(arrow);
}

engine.callback = function() {
    // if (a > 30) {
    //     i++;
    //     a = 0;
    // }
    // hose.bend(i, i+5, 1);
    // hose.bend(0, i, -1);
    // a++
}


function load() {

    engine.gravity(true);

    let platform1 = new engine.simples.Rectangle(10, 400, 500, 50, 10);
    let platform2 = new engine.simples.Rectangle(250, 650, 600, 40, -10)
    let triangle = new engine.simples.Triangle(400, 300, 80, 80, 30)
    let polygon = new engine.simples.Polygon(10, 300, 100, 100, 0, 5)

    let box = new engine.complex.Box(10, -50, 50, 50);

    let arrow = new engine.complex.DoubleArrow(10, 100, 80, 80, 0)
    let door = new engine.complex.Door(400, 400, 50, 200, 0)
    let tree = new engine.complex.Tree(10, 20, 20, 200, 0);
    let mushroom = new engine.complex.Mushroom(10, 20, 100, 200, 0);
    let octopus = new engine.complex.Octopus(300, 300, 300, 300, 0);
    hose = new engine.complex.Hose(300, 300, 800, 20, 0, engine.simples.Rectangle);
    octopus.color = "black";
    shapes.add(octopus);
    //shapes.add(platform2);
    shapes.add(box);
    //shapes.add(hose);
    // shapes.add(door);
    // shapes.add(tree);

    // interval = setInterval(addDrop, 1000);
    // addDrop();
    

}

function initialize() {
   engine.go(load);
}

export { initialize };