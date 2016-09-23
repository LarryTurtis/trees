import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let Width;
let Height;

function level1() {

    Width = engine.canvas.width;
    Height = engine.canvas.height;
    engine.canvas.element.style.backgroundColor = "pink";

    createText();
    createBalloon();
}

function createBalloon() {

    for (let i = 0; i < 50; i++) {

        let size = Width.percent(trees.random(0, 5));
        let x = Width.percent(trees.random(0, 95));
        let y = Height.percent(trees.random(0, 100));

        let balloon = new engine.complex.Balloon(x, y, size, size);

        balloon.color = trees.randomColor();
        balloon.callback = function() {
            this.y -= size / 10;
        }

        shapes.add(balloon);

    }

}

function createText() {
    let size = Width.percent(5);
    let x = Width.percent(3);
    let y = Height.percent(3);

    let text = new engine.simples.Text("Gary K", x, y, size, "Bungee Shade");

    text.color = ["rgb(0,47,57)"];

    shapes.add(text);

}


export { level1 };
