import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let i = 0;

function level1() {
    let head = new engine.complex.Head(100, 100, 100, 150, 0, 50, 2);
    head.callback = function() {
        if (i < 50) {
            this.openMouth();
            this.lookLeft();
            this.state = "dilate";
        } else {
            this.closeMouth();
            this.lookDown();
            this.lookRight();
            this.state = "normal";
        }
        i++;
    }
    shapes.add(head);
}

export { level1 };
