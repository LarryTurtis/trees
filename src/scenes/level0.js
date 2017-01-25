import { engine } from '../engine/engine.js';

let shapes = engine.shapesRegistry;
let Width;
let Height;

let skyHeight;
let lakeHeight;
let earthHeight;
let caveHeight;

const BROWN = "#190D03";
const BLUE = "rgb(0,47,57)";
const GREEN = "rgb(0,74,37)";
const DARKPURPLE = "#1A001A";
const LIGHTPURPLE = "#44355B";
const PINK = "pink";
const FONTPRIMARY = "BungeeShade";
const WHITE = "white";
const BLACK = "black";
const GRAY = "gray";
const YELLOW = "yellow";
const OLIVE = "#666633";

function level0() {

    Width = shapes.staticBackgroundCanvas.width;
    Height = shapes.staticBackgroundCanvas.height;
    shapes.staticBackgroundCanvas.element.style.backgroundColor = DARKPURPLE;

    Clouds();
    StripedBalloons();
}

function StripedBalloons() {
    for (let i = 0; i < 5; i++) {

        let size = Width.percent(trees.random(2,5));
        let x = Width.percent(trees.random(0, 95));
        let y = Height.percent(trees.random(0, 95));

        let balloon = new engine.client.StripedBalloon(x, y, size, size);
        balloon.stripeWidth = balloon.width.percent(trees.random(1, 20));
        balloon.stripeSpacing = balloon.width.percent(trees.random(1, 20));

        balloon.stripeColor = function() {
            let arr = [];
            for (let i = 0; i < trees.random(1, 25); i++) {
                arr.push(trees.randomColor());
            }
            return arr;
        }();

        balloon.stripeOrientation = ["vertical", "diagonal", "horizontal"][trees.random(0, 2)];
        balloon.color = trees.randomColor();
        shapes.addToDynamicBackground(balloon);
    }
}

function Clouds() {
    for (let i = 0; i < 10; i++) {
        let width = Width.percent(trees.random(2, 15));
        let x = trees.random(0, Width);
        let y = trees.random(0, Height);
        let height = width / 4
        let cloud = new engine.client.Cloud(x, y, width, height);
        let opacity = 1 - width / 300;
        cloud.color = trees.setOpacity(WHITE, opacity);
        shapes.addToStaticForeground(cloud);
    }
}




export { level0 };