import { engine } from '../engine/engine.js';


function level8() {
    let shapes = engine.shapesRegistry;

    for (let i = 0; i < 20; i++) {
        shapes.add(createHose());
    }


    // let dragging = false;
    // engine.canvas.addEventListener("mouseClick", function(e) {
    //     if (e.detail.shape.selectedSection) {
    //         dragging = true;
    //     } else {
    //         dragging = false;
    //     }
    // });

    // engine.canvas.addEventListener('mouseMove', function(e) {
    //     //if (e.detail.direction.up) hose.bend(leftBoundary, rightBoundary, 3);
    //     //if (e.detail.direction.down) hose.bend(leftBoundary, rightBoundary, -3);
    //     if (dragging) {
    //         hose.selectSection(e.detail.shape);
    //     } else {
    //         if (!e.detail.shape || !e.detail.shape.wasClicked()) {
    //             console.log(e.detail);
    //             if (e.detail.mouse.y > e.detail.shape.y && hose.sectionAngle < 180) {
    //                 hose.bend(1);
    //             } else {
    //                 hose.bend(-1);
    //             }
    //         }
    //     }
    // });

    // engine.canvas.addEventListener('upArrow', function(e) {
    //     hose.bend(-3);
    // });
    // engine.canvas.addEventListener('downArrow', function(e) {
    //     hose.bend(3);
    // });

    // engine.canvas.addEventListener('leftArrow', function(e) {
    //     // hose.sectionLength--;
    //     // let selected = hose.selectedSection[0];
    //     // hose.selectSection(selected);
    // });
    // engine.canvas.addEventListener('rightArrow', function(e) {
    //     //hose.sectionLength++;
    //     //let selected = hose.selectedSection[0];
    //     // hose.selectSection(selected);
    // });

}

function createHose() {

    let randomX = trees.random(0, engine.canvas.width);
    let randomY = trees.random(0, engine.canvas.height);
    let randomWidth = trees.random(5, engine.canvas.width / 2);
    let randomHeight = randomWidth / trees.random(2, 100);
    let randomAngle = trees.random(0, 360);

    let hose = new engine.complex.Hose(randomX, randomY, 700, 10, randomAngle);

    hose.color = "brown"//trees.randomColor();
    hose.sectionColor = "tan"//trees.randomColor();

    let randSection = trees.random(1, hose.length);
    let randBend = trees.posNeg() * trees.random(1, 180);
    let randSectionLength = trees.random(5, hose.length - randSection);
    let sectionLengthCounter = 1;

    let sectionCounter = 0;
    let bendCounter = 0;
    let bendCounterInc = randBend < 0 ? -1 : 1;
    let sectionCounterInc = 1;
    let sectionLengthInc = 1;


    hose.callback = function() {
        if (sectionCounter !== randSection && sectionLengthCounter !== randSectionLength) {

            if (sectionCounter !== randSection) {
                hose.selectSection(hose.shape[sectionCounter]);
                sectionCounter += sectionCounterInc;
            }

            if (sectionLengthCounter !== randSectionLength) {
                hose.sectionLength = sectionLengthCounter;
                sectionLengthCounter += sectionLengthInc;
            }

        } else {
            if (bendCounter !== randBend) {
                hose.bend(bendCounterInc);
                bendCounter += bendCounterInc;
            } else {
                randSection = trees.random(1, hose.length);
                randBend = trees.posNeg() * trees.random(1, 180);
                randSectionLength = trees.random(5, hose.length - randSection);

                bendCounterInc = randBend < 0 ? -1 : 1;
                sectionCounterInc = randSection > sectionCounter ? 1 : -1;
                sectionLengthInc = randSectionLength > sectionLengthCounter ? 1 : -1;
                bendCounter = 0;
            }
        }

    };
    return hose;
}



export { level8 };