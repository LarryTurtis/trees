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
    let i = 100;
    engine.patterns.polkaDots(box, engine.simples.Circle, 100, 1, 5, "white");
    // shapes.add(box);

    let eye = new engine.complex.RoundedRectangle(100, 100, 100, 150, 0, 50, 2);
    eye.color = "black";
    eye.callback = function() {
        //this.resize(i);
        i++;
    }
    shapes.add(eye);
    console.log(eye);
}

export { level1 };
