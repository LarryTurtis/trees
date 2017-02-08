import { engine } from '../engine/engine.js';
let shapes = engine.shapesRegistry;

function level8() {

    for (let i = 0; i < 20; i++) {
        shapes.addToDynamicBackground(createHose());
    }

}

function createHose() {

    let randomX = trees.random(0, shapes.staticBackgroundCanvas.width);
    let randomY = trees.random(0, shapes.staticBackgroundCanvas.height);
    let randomWidth = trees.random(5, shapes.staticBackgroundCanvas.width / 2);
    let randomHeight = randomWidth / trees.random(2, 100);
    let randomAngle = trees.random(0, 360);

    let hose = new engine.complex.Hose(randomX, randomY, 700, 10, randomAngle);

    hose.color = "brown" //trees.randomColor();
    hose.sectionColor = "tan" //trees.randomColor();

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