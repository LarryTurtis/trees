import { engine } from '../engine/engine.js';

let hose;

function level9() {
    let shapes = engine.shapesRegistry;

    shapes.add(createHose());
    shapes.add(createContainer());

    let dragging = false;
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

function createContainer() {
    let container = new engine.complex.Container(300, 300, 200, 300, 0, engine.complex.Cup);
    let counter = 1;
    container.color = "white";
    // container.lineColor = "black";
    container.liquidColor = trees.setOpacity("orange", 0.9);
    container.fill(counter);
    container.callback = function() {
        counter -= 0.001;
        if (counter > 0) container.fill(counter);
    }

    return container;
}

function createHose() {

    hose = new engine.complex.Hose(200, 340, 500, 10, -85);

    hose.color = "lightPink" //trees.randomColor();
    hose.sectionColor = "pink" //trees.randomColor();

    let randSection = trees.random(1, hose.length);
    let randBend = trees.posNeg() * trees.random(1, 180);
    let randSectionLength = trees.random(5, hose.length - randSection);
    let sectionLengthCounter = 1;

    let sectionCounter = 0;
    let bendCounter = 0;
    let bendCounterInc = randBend < 0 ? -1 : 1;
    let sectionCounterInc = 1;
    let sectionLengthInc = 1;

    hose.selectSection(hose.shape[35]);
    hose.bend(110)

    hose.callback = function() {
    };
    return hose;
}



export { level9 };
