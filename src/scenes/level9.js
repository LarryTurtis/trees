import { engine } from '../engine/engine.js';

let hose;
let cup;
let erlenmeyer;
let counter = 0.9;

function level9() {
    let shapes = engine.shapesRegistry;
    hose = createHose();
    cup = createCup();
    erlenmeyer = createErlenmeyer();

    shapes.add(hose);
    shapes.add(erlenmeyer);
    shapes.add(cup);
    shapes.add(createSpray());

    hose.callback = function() {
        if (cup.empty) {
            hose.drain();
        } else {
            hose.fill();
        }
    };

    cup.callback = function() {
        if (hose.full && !cup.empty) {
            counter -= 0.001;
            cup.fill(counter);
        }
    }

    erlenmeyer.callback = function() {
        this.trimTop(-1);
    }

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

function createSpray() {
    let spray = new engine.complex.Spray(hose.tip.x, hose.tip.y, 150, 150, 0, 25);
    spray.color = trees.setOpacity("orange", 0.9);
    spray.callback = function() {
        if (hose.full) this.spray();
    }
    return spray;
}

function createCup() {
    let cup = new engine.complex.Cup(300, 300, 200, 300, 0, 94);
    cup.color = "white";
    // cup.lineColor = "black";
    cup.liquidColor = trees.setOpacity("orange", 0.9);
    cup.fill(counter);
    return cup;
}

function createErlenmeyer() {
    let erlenmeyer = new engine.simples.Trapezoid(300, 300, 200, 300, 10, 95, 95);
    erlenmeyer.color = "white";
    // erlenmeyer.lineColor = "black";
    // erlenmeyer.liquidColor = trees.setOpacity("orange", 0.9);

    // erlenmeyer.fill(counter);
    return erlenmeyer;
}

function createHose() {

    let hose = new engine.complex.Hose(200, 344, 500, 10, -85);

    hose.color = trees.setOpacity("lightPink", 0.3); //trees.randomColor();
    hose.sectionColor = trees.setOpacity("pink", 0.3); //trees.randomColor();

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
    hose.bend(110);

    return hose;

}


export { level9 };
