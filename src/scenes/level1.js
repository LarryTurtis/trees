import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function level1() {
    let width = engine.canvas.width;
    let height = engine.canvas.height;
    let x = 0;
    let y = 0;
    let box = new engine.complex.Box(x, y, width, height, 0);
    box.radius = width;
    box.color = "black";

    engine.patterns.randomSpotsOnCircle(box).forEach(spot => {
        spot.color = "black";
        spot.collidable = false;
        box.addShape(spot);
    });
    let i = 200;
    engine.patterns.polkaDots(box, engine.simples.Circle, 100, 1, 5, "white");
    // shapes.add(box);

    // let semiCircle = new engine.complex.Arch(300, 300, 200, 200, 0, 10);
    // semiCircle.color = "blue";
    // semiCircle.callback = function() {
    //     this.resize(i);
    // }
    // shapes.add(semiCircle);

    let donut = new engine.complex.Macaroni(100, 100, 200, 200, 20, 10);
    donut.color = "black";
    donut.callback = function() {
        // i++;
        // this.resize(i);
    }
    shapes.add(donut);
}

export { level1 };
