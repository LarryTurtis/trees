import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let Width;
let Height;
let scrollDown = false;
let scrollUp = false;
let max = 0;

let water;
let earth;
let cave;
let caveBackground;
let grass;

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
    createWaterFall();
    createCup();

    shapes.forEach(shape => {
        shape.y -= Height * 2;
    })

    engine.canvas.addEventListener('upArrow', function(e) {
        shapes.forEach(shape => {
            shape.y += 200;
        })
    });
    engine.canvas.addEventListener('downArrow', function(e) {
        shapes.forEach(shape => {
            shape.y -= 200;
        })
    });

}


function createWaterFall() {

    let x = Width.percent(30);
    let y = water.y + water.height.percent(90);
    let pour = new engine.complex.PourComposite(x, y, Width.percent(10), Width.percent(17));
    pour.color = trees.setOpacity(water.color, 0.8);
    //pour.collidable = true;
    shapes.add(pour);
    pour.start();
    pour.activePour.oscillate = true;

}

function createCup() {

    let cup = new engine.complex.Cup(Width.percent(25), cave.y + Width.percent(15), Width.percent(20), Width.percent(10), 85);
    cup.color = trees.setOpacity("white", 0.2);
    cup.liquidColor = water.color;
    cup.thickness = Width.percent(1);
    //cup.collidable = true;
    cup.rotate(15, cup.center);
    cup.level = 10;
    shapes.add(cup);
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

    wheel.callback = function() {
        wheel.rotate(0.5, wheel.center);
        this.shape.forEach(shape => {
            if (shape.type === "Cup" && shape.y > water.y && shape.y < water.y + water.height) {
                shape.fill(1);
            }
        })
    }

}

function createGrassAndWater() {

    water = new engine.complex.Box(0, Height.percent(160), Width, Width.percent(50));
    earth = new engine.complex.Box(0, water.y + water.height, Width, Height.percent(30));
    grass = new engine.complex.Lake(0, Height.percent(160), Width, Width.percent(50));
    caveBackground = new engine.complex.Box(0, earth.y + earth.height, Width, Width.percent(75));
    cave = new engine.complex.Cave(0, earth.y + earth.height, Width, Width.percent(75));

    earth.color = "#190D03";
    water.color = "rgb(0,47,57)";
    grass.color = "rgb(0,74,37)";
    caveBackground.color = "#1A001A";
    cave.color = "#44355B"

    engine.patterns.polkaDots(earth, engine.simples.Circle, 100, 1, 5, "#CC8B79")
    new engine.complex.RockyBorder(earth, Width.percent(3), earth.lines()[2])
    new engine.complex.RockyBorder(grass, Width.percent(2), grass.lines()[2]);

    shapes.add(caveBackground);
    shapes.add(cave);
    shapes.add(earth);
    shapes.add(water);
    shapes.add(grass);


}

export { level0 };
