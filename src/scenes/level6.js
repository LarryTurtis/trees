import { engine } from '../engine/engine.js';

function level6() {
    let shapes = engine.shapesRegistry;

    let width = 50;
    let offsetFactor = width * -.12;
    let wOffset = 0;
    let hOffset = 0;
    let start = 0;

    let extraRows = width / -offsetFactor;

    let hexRows = shapes.staticBackgroundCanvas.height / width + extraRows;
    let hexColumns = shapes.staticBackgroundCanvas.width / width + extraRows;

    for (let n = 0; n < hexRows; n++) {

        wOffset = 0;
        hOffset += offsetFactor * 2;

        for (let i = 0; i < hexColumns; i++) {

            wOffset += offsetFactor;

            start = n % 2 ? width / 2 + offsetFactor / 2 : 0;

            let hex = new engine.simples.Polygon(i * width + wOffset - start, n * width + hOffset, width, width, 6);
            hex.color = trees.randomColor();
            //hex.lineColor = "black";
            hex.ySpeed = 3;
            shapes.addToDynamicBackground(hex);
        }
    }

    let length = shapes.length;
    engine.timer = setInterval(dropHex, 10)

    function dropHex() {
        let id = trees.random(0, length - 1);
        let shape = shapes.shapes[id];
        if (shape && !shape.called) {
            shape.callback = function() {
                this.y -= this.ySpeed;
                this.ySpeed *= 1.01;
                this.rotate(1, this.center);
            }
            shape.called = true;
        }
    }
}


export { level6 };