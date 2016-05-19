import { complex } from './complex.js';
import { CircularShape } from './circularShape.js';

function isInside(c1, c2) {
    let distance = c1.distance(c1.center, c2.center);
    return distance + c1.radius <= c2.radius;
}

let keepGoingX = true;
let keepGoingY = true;

class Eye extends CircularShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Eye";
        this.eye = new complex.Circle(x, y, width, height);
        this.eye.color = "transparent";
        this.pupil = new complex.Pupil(x + width / 4, y + height / 4, width / 2, height / 2);
        this.addShape(this.eye);
        this.addShape(this.pupil);
    }

    get state() {
        return this._state;
    }

    set state(state) {
        this._state = state;
        this.shape.forEach(shape => {
            shape.state = state;
        })
    }

    lookLeft() {
        if (keepGoingX) this.pupil.x++;
        if (isInside(this.pupil, this.eye)) {
            keepGoingX = true;
        } else {
            keepGoingX = false;
            this.pupil.x--;
        }
    }

    lookRight() {
        if (keepGoingX) this.pupil.x--;
        if (isInside(this.pupil, this.eye)) {
            keepGoingX = true;
        } else {
            keepGoingX = false;
            this.pupil.x++;
        }
    }

    lookUp() {
        if (keepGoingY) this.pupil.y--;
        if (isInside(this.pupil, this.eye)) {
            keepGoingY = true;
        } else {
            keepGoingY = false;
            this.pupil.y++;
        }
    }

    lookDown() {
        if (keepGoingY) this.pupil.y++;
        if (isInside(this.pupil, this.eye)) {
            keepGoingY = true;
        } else {
            keepGoingY = false;
            this.pupil.y--;
        }
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

export { Eye }
