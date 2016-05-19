import { complex } from './complex.js';
import { CircularShape } from './circularShape.js';

class Pupil extends CircularShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Pupil";
        this.pupilAngle = 0;
        this._state = "normal";

        let pupil = new complex.Circle(x, y, width, height);
        this.addShape(pupil);
        //pupil.color = "black";
        pupil.bottomRight.color = "black";
        pupil.bottomLeft.color = "black";
        pupil.topRight.color = "transparent";
        pupil.topLeft.color = "transparent";
        this.showBoundingBox = true;
    }

    get state() {
        return this._state;
    }

    set state(state) {
        console.log(state);
        this._state = state;
        this[state]();
    }

    suspicious() {
        console.log('rotate', this.pupilAngle);
        this.shape[0].topRight.color = "transparent";
        this.shape[0].topLeft.color = "transparent";
        if (this.pupilAngle < 30) {
            this.rotate(-1, this.center);
            this.pupilAngle++;
        }
    }

    normal() {
        this.shape[0].topRight.color = "transparent";
        this.shape[0].topLeft.color = "transparent";
        if (this.pupilAngle > 0) {
            this.rotate(1, this.center);
            this.pupilAngle--;
        }
    }

    dilate() {
        this.shape[0].topRight.color = "black";
        this.shape[0].topLeft.color = "black";
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.closePath();
    }
}

export { Pupil }
