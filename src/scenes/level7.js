import { engine } from '../engine/engine.js';

function level7() {
    let shapes = engine.shapesRegistry;

    let wheel = new engine.complex.Wheel(300,300,300,300);
    wheel.color = "black";
    shapes.add(wheel);
    wheel.callback = function() {
        this.rotate(1, this.center);
        this.x += 2;
    }
}


export { level7 };