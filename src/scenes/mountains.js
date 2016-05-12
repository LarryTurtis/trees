import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function mountains() {
    let width = engine.canvas.width + 100;
    let height = width / 10
    let y = engine.canvas.height - height;
    let mountain = new engine.complex.Mountains(-100, y, width, height, 0);
    mountain.color = "black";
    mountain.collidable = false;
    shapes.add(mountain);
}


export { mountains };
