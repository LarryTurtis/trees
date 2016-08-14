import { engine } from '../engine/engine.js';

function level8() {
    let shapes = engine.shapesRegistry;

    let hose = new engine.complex.Hose(0, 300, 1000, 10, 0, engine.simples.Circle);
    hose.color = "black";
    shapes.add(hose);
    hose.callback = function() {};

    engine.canvas.addEventListener("mouseClick", function(e){
        console.log(e.detail.shape.selectedSection);
        if (e.detail.shape.selectedSection) {
            hose.selectSection(e.detail.shape)
        }
    });

    engine.canvas.addEventListener('mouseMove', function(e) {
        //if (e.detail.direction.up) hose.bend(leftBoundary, rightBoundary, 3);
        //if (e.detail.direction.down) hose.bend(leftBoundary, rightBoundary, -3);
        console.log(e.detail.shape.x)
        hose.selectSection(e.detail.shape);
    });

    engine.canvas.addEventListener('upArrow', function(e) {
        hose.bend(3);
    });
    engine.canvas.addEventListener('downArrow', function(e) {
        hose.bend(-3);
    });

}



export { level8 };