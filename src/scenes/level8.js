import { engine } from '../engine/engine.js';

function level8() {
    let shapes = engine.shapesRegistry;

    let leftBoundary = 0;
    let rightBoundary = 10;

    let hose = new engine.complex.Hose(0, 300, 800, 30, 0, engine.simples.Rectangle);
    hose.color = "black";
    shapes.add(hose);
    hose.callback = function() {};

    engine.canvas.addEventListener('leftArrow', function(e) {
        if (leftBoundary > 0) {
            leftBoundary--;
            rightBoundary--;
            hose.selectSection(leftBoundary, rightBoundary);
        }
    });
    engine.canvas.addEventListener('rightArrow', function(e) {
        if (rightBoundary < hose.length) {
            leftBoundary++;
            rightBoundary++;
            hose.selectSection(leftBoundary, rightBoundary);
        }
    });

    engine.canvas.addEventListener('upArrow', function(e) {
        hose.bend(leftBoundary, rightBoundary, 3);
    });
    engine.canvas.addEventListener('downArrow', function(e) {
        hose.bend(leftBoundary, rightBoundary, -3);
    });
}


export { level8 };