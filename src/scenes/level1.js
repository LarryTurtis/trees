import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let Width;
let Height;

function level1() {

    Width = engine.canvas.width;
    Height = engine.canvas.height;
    engine.canvas.element.style.backgroundColor = "pink";

    createText();
    setInterval(() => {
        //createBalloon();
        createStripedBalloon();
    }, 1000);

    createRockWall();
}

function createRockWall() {
    let width = Width.percent(5);
    let height = Height;
    let x = 30;
    let y = 30;

    let rockyBorder = new engine.complex.RockyBorder(x, y, width, height);

    rockyBorder.color = trees.randomColor();
    shapes.add(rockyBorder);
}

function createBalloon() {
    let size = Width.percent(trees.random(1, 25));
    let x = Width.percent(trees.random(0, 95));
    let y = Height + size;

    let balloon = new engine.complex.HotAirBalloon(x, y, size, size);

    balloon.color = trees.randomColor();
    balloon.callback = function() {
        this.y -= size / 50;
    }
    shapes.add(balloon);
}

function createStripedBalloon() {
    let size = Width.percent(trees.random(1, 15));
    let x = Width.percent(trees.random(0, 95));
    let y = Height + size;

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

function createText() {
    let size = Width.percent(5);
    let x = Width.percent(3);
    let y = Height.percent(3);

    let text = new engine.simples.Text("Gary K", x, y, size, "Lato");

    text.color = ["rgb(0,47,57)"];

    shapes.add(text);

}


export { level1 };