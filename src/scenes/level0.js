import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;

function rand() {
    return Math.floor(Math.random() * 255) + 1;
}

function createCloud() {
    let width = trees.random(50, 300);
    let x = trees.random(1, engine.canvas.width);
    let y = trees.random(1, engine.canvas.height - 600);
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
    let y = 600 - height;
    let mountain = new engine.complex.Mountains(-100, y, width, height, 0);
    mountain.color = "black";
    mountain.collidable = false;
    shapes.add(mountain);

    engine.patterns.polkaDots(mountain, engine.simples.Circle, 100, 1, 5, "yellow");

    mountain.callback = function() {
        this.shape.forEach(shape => {
            if (shape.type === "Circle") {
                shape.x += trees.random(-1, 1);
                shape.y += trees.random(-1, 1);
            }

        })
    }
}

function level0() {
    engine.canvas.element.style.backgroundColor = "pink";
    for (let i = 0; i < 25; i++) {
        createCloud();
    }
    createMountains();

    let shapes = engine.shapesRegistry;

    let wheel = new engine.complex.WaterWheel(300, 300, 600, 600);
    shapes.add(wheel);

    let rect = new engine.complex.Box(0, 600, engine.canvas.width, engine.canvas.height - 600);
    rect.color = "rgb(0,47,57)";
    shapes.add(rect);

    let rect2 = new engine.complex.Box(1200, 600, engine.canvas.width - 1200, engine.canvas.height - 600);
    rect2.color = "rgb(0,74,37)";
    shapes.add(rect2);

    let wedge = new engine.simples.Wedge(1200, 600, engine.canvas.height - 600, engine.canvas.height - 600);
    wedge.color = "rgb(0,47,57)";
    shapes.add(wedge);
    engine.patterns.polkaDots(rect2, engine.simples.Circle, 50, 2, 4, "rgb(0,44,9)");

    wheel.callback = function() {
        this.shape.forEach(shape => {
            if (shape.type === "Cup" && shape.y > 600) {
                shape.fill(1);
            }
        })
    }

    engine.canvas.addEventListener('upArrow', function(e) {
        wheel.rotate(0.5, wheel.center);

    });
    engine.canvas.addEventListener('downArrow', function(e) {
        wheel.rotate(-0.5, wheel.center);
    });

}

export { level0 };