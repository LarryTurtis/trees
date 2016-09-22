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
    let size = 100;
    let x = 100;
    let y = 100;
    let text = new engine.simples.Text("Testtesttest", x, y, size, "Lato");
    text.color = ["red", "blue", "yellow"];
    shapes.add(text);
}

export { level1 };