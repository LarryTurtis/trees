import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let i = 200;
function level2() {
    let box = new engine.complex.Donut(200, 200, 200, 200, 0, 50);
    box.color = "black"
    // box.rotate(250, box.center);
    // box.resize(300)
    box.callback = function() {
        i++;
        this.resize(i)
        //this.rotate(1, this.center);
    }
    shapes.add(box);
}

export { level2 };
