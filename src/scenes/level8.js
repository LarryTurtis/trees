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
            if (!e.detail.shape || !e.detail.shape.wasClicked()) {
                console.log(e.detail);
                if (e.detail.mouse.y > e.detail.shape.y && hose.sectionAngle < 180) {
                    hose.bend(1);
                } else {
                    hose.bend(-1);
                }
            }
        }
    });

    engine.canvas.addEventListener('upArrow', function(e) {
        hose.bend(-3);
    });
    engine.canvas.addEventListener('downArrow', function(e) {
        hose.bend(3);
    });

    engine.canvas.addEventListener('leftArrow', function(e) {
        // hose.sectionLength--;
        // let selected = hose.selectedSection[0];
        // hose.selectSection(selected);
    });
    engine.canvas.addEventListener('rightArrow', function(e) {
        //hose.sectionLength++;
        //let selected = hose.selectedSection[0];
        // hose.selectSection(selected);
    });

}



export { level8 };