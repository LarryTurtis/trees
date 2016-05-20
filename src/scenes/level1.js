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
    let i = 0;
    engine.patterns.polkaDots(box, engine.simples.Circle, 100, 1, 5, "white");
    // shapes.add(box);

    let eye = new engine.complex.Head(100, 100, 100, 150, 0, 50, 2);
    eye.callback = function() {
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
    shapes.add(eye);
    console.log(eye);
}

export { level1 };
