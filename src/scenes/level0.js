import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function rand() {
    return Math.floor(Math.random() * 255) + 1;
}

function createCloud() {
    let width = trees.random(50, 300);
    let x = trees.random(1, engine.canvas.width);
    let y = trees.random(1, engine.canvas.height);
    let height = width / 4
    let cloud = new engine.complex.Cloud(x, y, width, height, 0);
    let opacity = 1 - width / 300;
    cloud.color = "rgba(0,0,0, " + opacity + ")";
    cloud.xSpeed = height / 1000;
    cloud.ySpeed = 3;
    cloud.collidable = false;
    cloud.callback = function() {
        this.x += this.xSpeed;
    }
    shapes.add(cloud);
}

function createMountains() {
    let width = engine.canvas.width + 100;
    let height = width / 10
    let y = engine.canvas.height - height;
    let mountain = new engine.complex.Mountains(-100, y, width, height, 0);
    mountain.color = "black";
    mountain.collidable = false;
    shapes.add(mountain);
    console.log(shapes);
}

function level0() {
    engine.canvas.element.style.backgroundColor = "transparent";
    for (let i = 0; i < 25; i++) {
        createCloud();
    }
    createMountains();
}

export { level0 };
