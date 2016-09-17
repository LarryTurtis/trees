import { engine } from '../engine/engine.js';

let hose;
let cup;
let spray;
let erlenmeyer;
let counter = 1;

function level9() {
    let shapes = engine.shapesRegistry;
    hose = createHose();
    cup = createCup();
    erlenmeyer = createErlenmeyer();

   // shapes.add(hose);

    shapes.add(cup);
    shapes.add(erlenmeyer);
   // shapes.add(createSpray());

    hose.callback = function() {
        if (cup.empty) {
            hose.drain();
        } else {
            hose.fill();
        }
    };

    cup.callback = function() {
        //    cup.rotate(1, cup.center);
        // if (hose.full && !cup.empty) {
        //    cup.fill(1);
        //     hose.rotate(1, cup.center);
        //     spray.rotate(1, cup.center);
        // }
    }

    erlenmeyer.callback = function() {
        //this.drain(counter);
        //this.fill(counter);
        //this.rotate(1, this.center)
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
        hose.bend(-1);
        //erlenmeyer.rotate(-1, erlenmeyer.center)
        cup.rotate(-1, cup.center)
    });
    engine.canvas.addEventListener('downArrow', function(e) {
        hose.bend(1);
        //erlenmeyer.rotate(1, erlenmeyer.center)
        cup.rotate(1, cup.center)
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
    spray = new engine.complex.Spray(hose.tip.x, hose.tip.y, 150, 150, 0, 25);
    spray.color = trees.setOpacity("orange", 0.9);
    spray.callback = function() {
        if (hose.full) this.spray();
        spray.x++;
        spray.y++;
    }
    return spray;
}

function createCup() {
    let cup = new engine.complex.Cup(200, 100, 200, 300, 85);
    cup.color = trees.setOpacity("white", 0.2);
    cup.liquidColor = trees.setOpacity("orange", 0.9);
    cup.liquidLevel = 210;
    return cup;
}

function createErlenmeyer() {
    let erlenmeyer = new engine.complex.Cup(400, 500, 200, 300, 85);
    erlenmeyer.color = trees.setOpacity("white", 0.2);
    erlenmeyer.liquidColor = trees.setOpacity("orange", 0.9);
    erlenmeyer.liquidLevel = 500;
    erlenmeyer.rotate(10, erlenmeyer.center)
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
