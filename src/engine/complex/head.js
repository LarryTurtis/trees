import { polkaDots } from '../patterns/polkaDots.js';
import { Triangle } from '../simples/triangle.js';
import { Eye } from './eye.js';
import { Rectangle } from '../simples/rectangle.js';
import { SemiCircle } from './semiCircle.js';
import { RoundedRectangle } from './roundedRectangle.js';
import { ComplexShape } from './complexShape.js';

class Head extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Head";
        this.mouthOpen = false;
        this.top = new RoundedRectangle(x, y, width, height * .75, 0, width / 4, 2);
        this.bottom = new RoundedRectangle(x, y + height * .75, width, height * .25, 180, width / 4, 2);
        this.leftEar = new SemiCircle(this.x - this.width / 4, this.center.y, this.width / 4, this.width / 8, 270);
        this.rightEar = new SemiCircle(this.x + this.width, this.center.y, this.width / 4, this.width / 8, 90);
        this.addShape(this.top);
        this.addShape(this.bottom);
        this.addShape(this.leftEar);
        this.addShape(this.rightEar);
        this.color = "grey";
        this.lineColor = "grey";

        this._state = "normal";

        //polkaDots(this.bottom, Rectangle, 1000, 1, 3, "rgba(0,0,0,0.5");

        this.nose = new Triangle(this.center.x - this.width / 16, this.center.y, this.width / 8, this.height / 8);
        this.nose.color = "rgba(0,0,0,0.5)";
        this.addShape(this.nose);

        this.leftEye = new Eye(this.center.x - this.width / 4 - this.width / 8, this.center.y - this.width / 4, this.width / 4, this.width / 4);
        this.rightEye = new Eye(this.center.x + this.width / 4 - this.width / 8, this.center.y - this.width / 4, this.width / 4, this.width / 4);
        this.addShape(this.leftEye);
        this.addShape(this.rightEye);
        this.leftEye.lineColor = "transparent";
        this.rightEye.lineColor = "transparent";
    }

    lookLeft() {
        this.leftEye.lookLeft();
        this.rightEye.lookLeft();
    }

    lookRight() {
        this.leftEye.lookRight();
        this.rightEye.lookRight();
    }

    lookUp() {
        this.leftEye.lookUp();
        this.rightEye.lookUp();
    }

    lookDown() {
        this.leftEye.lookDown();
        this.rightEye.lookDown();
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
        this.leftEye.pupil.state = state;
        this.rightEye.pupil.state = state;
    }



    openMouth() {
        if (this.bottom.d.y < this.top.d.y + this.bottom.height / 2) {
            this.bottom.y++;
            this.bottom.rotate(1, this.bottom.c);
        }
    }

    closeMouth() {
        if (this.bottom.d.y >= this.top.d.y) {
            this.bottom.y--;
            this.bottom.rotate(-1, this.bottom.c);
        }
    }

    draw(ctx) {
        super.draw(ctx);
        this.shape.forEach(shape => {
            shape.draw(ctx);
        });
    }

}

export { Head }