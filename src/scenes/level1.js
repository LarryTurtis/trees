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

    engine.patterns.randomSpots(box).forEach(spot => {
        spot.color = "#F8A068";
        spot.collidable = false;
        box.addShape(spot);
    });
    shapes.add(box);
}

export { level1 };