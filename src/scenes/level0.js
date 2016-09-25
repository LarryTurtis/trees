import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let Width;
let Height;
let scrollDown = false;
let scrollUp = false;
let max = 0;

let water;

function level0() {

    Width = engine.canvas.width;
    Height = engine.canvas.height;
    engine.canvas.element.style.backgroundColor = "pink";

    for (let i = 0; i < 10; i++) {
        createStripedBalloon();
    }

    for (let i = 0; i < 50; i++) {
        createCloud();
    }

    createMountains();
    createWheel();
    createGrassAndWater();
    createRockWall();

    shapes.forEach(shape => {
        shape.y -= Height;
    })

    engine.canvas.addEventListener('upArrow', function(e) {
        shapes.forEach(shape => {
            shape.y += 10;
        })
    });
    engine.canvas.addEventListener('downArrow', function(e) {
        shapes.forEach(shape => {
            shape.y -= 10;
        })
    });

}


function createRockWall() {

    // rockyBorder = new engine.complex.RockyBorder(0, Height.percent(160), Width.percent(5), Width.percent(20));
    // rockyBorder.color = "#190D03";
    // shapes.add(rockyBorder);

}

function createStripedBalloon() {
    let size = Width.percent(trees.random(1, 5));
    let x = Width.percent(trees.random(0, 95));
    let y = Height.percent(trees.random(0, 100));

    let balloon = new engine.complex.StripedBalloon(x, y, size, size);
    balloon.stripeWidth = balloon.width.percent(trees.random(1, 20));
    balloon.stripeSpacing = balloon.width.percent(trees.random(1, 20));

    balloon.stripeColor = function() {
        let arr = [];
        for (let i = 0; i < trees.random(1, 25); i++) {
            arr.push(trees.randomColor());
        }
        return arr;
    }();

    balloon.orientation = ["vertical", "diagonal", "horizontal"][trees.random(0, 2)];
    balloon.color = trees.randomColor();
    balloon.callback = function() {
        this.y -= size / 50;
    }
    shapes.add(balloon);
}

function createCloud() {
    let width = Width.percent(trees.random(2, 15));
    let x = Width.percent(trees.random(1, 100));
    let y = Height.percent(trees.random(0, 160));
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
    let y = Height.percent(160) - height;
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
    let y = Height.percent(160) - height / 2;

    let wheel = new engine.complex.WaterWheel(x, y, width, height);
    shapes.add(wheel);

    // wheel.callback = function() {
    //     wheel.rotate(0.5, wheel.center);
    //     this.shape.forEach(shape => {
    //         if (shape.type === "Cup" && shape.y > Height.percent(60) && shape.y < Height.percent(70)) {
    //             shape.fill(1);
    //         }
    //     })
    // }

}

function createGrassAndWater() {

    let earth = new engine.complex.Box(0, Height.percent(200), Width, Height.percent(30));
    earth.color = "#190D03";
    shapes.add(earth);
    engine.patterns.polkaDots(earth, engine.simples.Circle, 100, 1, 5, "#CC8B79")
    new engine.complex.RockyBorder(earth, Width.percent(3), earth.lines()[2])

    let grass = new engine.complex.Box(0, Height.percent(160), Width, Width.percent(27));
    grass.color = "rgb(0,74,37)";
    shapes.add(grass);

    new engine.complex.RockyBorder(grass, Width.percent(3), grass.lines()[2]);

    let color = "rgb(0,47,57)";

    water = new engine.complex.Box(0, Height.percent(160), Width.percent(79.9), Width.percent(19.9));
    water.color = color;
    shapes.add(water);

    let rectangle = new engine.complex.Box(0, water.y + water.height.percent(99), Width.percent(55), Width.percent(5.1));
    rectangle.color = color;
    shapes.add(rectangle);

    let wedge = new engine.simples.Wedge(Width.percent(60), water.y + water.height.percent(99), Width.percent(5.1), Width.percent(5.1));
    wedge.rotate(90, wedge.a);
    wedge.color = color;
    shapes.add(wedge);

    wedge = new engine.simples.Wedge(Width.percent(80), Height.percent(160), Width.percent(20), Width.percent(20));
    wedge.rotate(-90, wedge.d)
    wedge.color = "rgb(0,74,37)";
    shapes.add(wedge);

}

export { level0 };