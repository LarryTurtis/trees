import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function rand() {
    return Math.floor(Math.random() * 255) + 1;
}

function createSpiral(x) {
    let spiral = new engine.simples.Circle(engine.canvas.width / 2, engine.canvas.height / 2, 1, 1, 0);
    spiral.color = "black";
    spiral.xSpeed = 6;
    spiral.ySpeed = 6;
    spiral.collidable = false;
    spiral.callback = function() {

        if (spiral.go && this.radius < engine.canvas.width) {
            this.width += this.xSpeed;
            this.height += this.ySpeed;
            this.y -= this.ySpeed / 2;
            this.x -= this.xSpeed / 2;
        } 
        if (!spiral.go && this.width > 1 && this.height > 1) {
            this.width -= this.xSpeed;
            this.height -= this.ySpeed;
            this.y += this.ySpeed / 2;
            this.x += this.xSpeed / 2;
        }
    }
    shapes.add(spiral);
}


function spiral() {
    createSpiral();
}


export { spiral };
