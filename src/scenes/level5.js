import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function createDot(x) {
    let dot = new engine.simples.Circle(engine.canvas.width / 2, engine.canvas.height / 2, 1, 1, 0);
    dot.color = "black";
    dot.xSpeed = 16;
    dot.ySpeed = 16;
    dot.collidable = false;
    let expanding = true;
    let done = false;
    dot.callback = function() {

        if (expanding) {
            this.width += this.xSpeed;
            this.height += this.ySpeed;
            this.y -= this.ySpeed / 2;
            this.x -= this.xSpeed / 2;
            if (this.radius > engine.canvas.width) expanding = false;
        }
        if (!expanding) {
            this.width -= this.xSpeed;
            this.height -= this.ySpeed;
            this.y += this.ySpeed / 2;
            this.x += this.xSpeed / 2;
            if (this.width <= dot.xSpeed || this.height <= dot.ySpeed) expanding = true;
        }
        done = true;
        return done;
    }
    shapes.add(dot);
}


function level5() {
    createDot();
}


export { level5 };
