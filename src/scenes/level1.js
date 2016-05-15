import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function level1() {
    engine.canvas.element.style.backgroundColor = "black";
    let width = engine.canvas.width / 20;
    let height = width;
    let x = engine.canvas.center.x - width/2;
    let y = engine.canvas.center.y - height/2;
    let box = new engine.simples.Rectangle(x, y, width, height, 0);
    box.fall = engine.animations.fall;
    box.color = "white";

    box.callback = function() {
        this.fall();
    }
    shapes.add(box);
}

export { level1 };
