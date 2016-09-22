import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let Width;
let Height;

function level0() {

    Width = engine.canvas.width;
    Height = engine.canvas.height;
    engine.canvas.element.style.backgroundColor = "pink";

    for (let i = 0; i < 25; i++) {
        createCloud();
    }

    createMountains();
    createWheel();
    createGrass();
    createWater();

}

function createCloud() {
    let width = Width.percent(trees.random(2, 15));
    let x = Width.percent(trees.random(1, 100));
    let y = Height.percent(trees.random(1, 50));
    let height = width / 4
    let cloud = new engine.complex.Cloud(x, y, width, height);
    let opacity = 1 - width / 300;
    cloud.color = "rgba(0,0,0, " + opacity + ")";
    cloud.xSpeed = height / 1000;
    cloud.callback = function() {
        this.x += this.xSpeed;
    }
    shapes.add(cloud);
}

function createMountains() {
    let width = Width.percent(103);
    let height = width / 10
    let y = Height.percent(60) - height;
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

function createWheel() {

    let width = Width.percent(32.3);
    let height = width;
    let x = Width.percent(15);
    let y = Height.percent(60) - height / 2;

    let wheel = new engine.complex.WaterWheel(x, y, width, height);
    shapes.add(wheel);

    wheel.callback = function() {
        this.shape.forEach(shape => {
            if (shape.type === "Cup" && shape.y > Height.percent(60)) {
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

function createWater() {

    let color = "rgb(0,47,57)";

    let rect = new engine.complex.Box(0, Height.percent(60), Width.percent(60.1), Height.percent(40));
    let wedge = new engine.simples.Wedge(Width.percent(60), Height.percent(60), Height.percent(40), Height.percent(40));

    rect.color = color;
    wedge.color = color;

    shapes.add(rect);
    shapes.add(wedge);

}

function createGrass() {
    let grass = new engine.complex.Box(Width.percent(60), Height.percent(60), Width.percent(40), Height.percent(40));
    grass.color = "rgb(0,74,37)";
    shapes.add(grass);
    engine.patterns.polkaDots(grass, engine.simples.Circle, 50, 2, 4, "rgb(0,44,9)");
}

export { level0 };