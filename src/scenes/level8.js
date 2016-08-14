import { engine } from '../engine/engine.js';

function level8() {
    let shapes = engine.shapesRegistry;

    let hose = new engine.complex.Hose(0, 300, 1000, 10, 0);
    let dragging = false;

    hose.color = "black";
    shapes.add(hose);
    hose.callback = function() {};

    engine.canvas.addEventListener("mouseClick", function(e) {
        if (e.detail.shape.selectedSection) {
            hose.selectSection(e.detail.shape);
            dragging = true;
        } else {
            dragging = false;
        }
    });

    engine.canvas.addEventListener('mouseMove', function(e) {
        //if (e.detail.direction.up) hose.bend(leftBoundary, rightBoundary, 3);
        //if (e.detail.direction.down) hose.bend(leftBoundary, rightBoundary, -3);
        if (dragging) {
            hose.selectSection(e.detail.shape);
        } else {
            hose.bend(e.detail.direction);
        }
    });

    engine.canvas.addEventListener('upArrow', function(e) {
        hose.bend(-1);
    });
    engine.canvas.addEventListener('downArrow', function(e) {
        hose.bend(1);
    });

}



export { level8 };