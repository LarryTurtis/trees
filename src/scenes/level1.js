import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let Width;
let Height;

function level1() {

    Width = engine.canvas.width;
    Height = engine.canvas.height;
    engine.canvas.element.style.backgroundColor = "pink";

    createText();

}

function createText() {
    let size = Width.percent(10);
    let x = Width.percent(3);
    let y = Height.percent(3);

    let text = new engine.simples.Text("Gary Kertis", x, y, size, "Droid Sans Mono");
    let rect = new engine.simples.Rectangle(x, y, text.getWidth, size);

    rect.color = "rgb(208,79,51)";
    // rect.lineColor = "rgb(0,47,57)";
    // rect.lineWidth = 3;

    text.color =["rgb(0,47,57)"];

    // text.callback = function() {
    //     // text.size += 0.5;
    // };

    shapes.add(rect);
    shapes.add(text);
}


export { level1 };
