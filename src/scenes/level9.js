import { engine } from '../engine/engine.js';

let hose;
let cup;
let testTube;
let erlenmeyer;
let counter = 1;

function level9() {
    let shapes = engine.shapesRegistry;
    hose = createHose();
    cup = createCup();
    erlenmeyer = createErlenmeyer();
    testTube = createTestTube();
    // shapes.add(hose);

    shapes.addToDynamicForeground(cup);
    shapes.addToDynamicForeground(erlenmeyer);
    shapes.addToDynamicForeground(testTube);

    // hose.callback = function() {
    //     if (cup.empty) {
    //         hose.drain();
    //     } else {
    //         hose.fill();
    //     }
    // };

    cup.callback = function() {
        //cup.rotate(1, cup.center);
        //cup.y+= 3
        // if (hose.full && !cup.empty) {
        //    cup.fill(1);
        //     hose.rotate(1, cup.center);
        //     spray.rotate(1, cup.center);
        // }
    }

    // erlenmeyer.callback = function() {
    //     //this.x++;
    //     //this.drain(counter);
    //     //this.fill(counter);
    //     //this.rotate(-1, this.center)
    // }

    shapes.allCanvases.forEach(canvas => {
        canvas.addEventListener('upArrow', function(e) {
            hose.bend(-1);
            erlenmeyer.rotate(-1, erlenmeyer.center)
            cup.rotate(-1, cup.center);
            testTube.levelLine = testTube.y + testTube.height;
            testTube.fill(10);
            console.log(testTube.empty);
        });
        canvas.addEventListener('downArrow', function(e) {
            hose.bend(1);
            erlenmeyer.rotate(1, erlenmeyer.center)
            cup.rotate(1, cup.center)
            testTube.rotate(1, cup.center);
        });
    });

}

function createCup() {
    let cup = new engine.complex.Cup(200, 100, 200, 300, 85);
    cup.color = trees.setOpacity("white", 0.2);
    cup.liquidColor = trees.setOpacity("orange", 0.9);
    cup.level = 90;
    cup.thickness = 10;
    return cup;
}

function createTestTube() {
    let testTube = new engine.complex.TestTube(600, 100, 200, 300);
    testTube.color = trees.setOpacity("white", 0.2);
    testTube.liquidColor = trees.setOpacity("orange", 0.9);
    testTube.level = 50;
    //testTube.thickness = 10;
    testTube.lip.thickness = 20;
    return testTube;
}


function createErlenmeyer() {
    let erlenmeyer = new engine.complex.Erlenmeyer(900, 300, 200, 300, 85);
    erlenmeyer.color = trees.setOpacity("white", 0.2);
    erlenmeyer.liquidColor = trees.setOpacity("orange", 0.9);
    erlenmeyer.level = 90;
    erlenmeyer.thickness = 10;
    return erlenmeyer;
}

function createHose() {

    let hose = new engine.complex.Hose(200, 344, 500, 10);
    hose.rotate(-85, hose.center);
    hose.color = trees.setOpacity("lightPink", 0.3); //trees.randomColor();
    hose.sectionColor = trees.setOpacity("pink", 0.3); //trees.randomColor();

    hose.selectSection(hose.shape[35]);
    hose.bend(110);

    return hose;

}


export { level9 };