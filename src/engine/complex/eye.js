import { complex } from './complex.js';
import { CircularShape } from './circularShape.js';

class Eye extends CircularShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Eye";

        this.eye = new complex.Circle(x, y, width, height);
        this.eye.color = "white";
        this.eye.lineColor = "black";
        this.pupil = new complex.Circle(x + width / 4, y + height / 4, width / 2, height / 2);
        this.pupil.color = "black";

        this.addShape(this.eye);
        this.addShape(this.pupil);
    }

    lookLeft() {
        if (this.pupil.b.x < this.eye.b.x) {
            this.pupil.x++;
        }
    }

    lookRight() {
        if (this.pupil.a.x > this.eye.a.x) {
            this.pupil.x--;
        }
    }

    lookUp() {
        if (this.pupil.a.y > this.eye.a.y) {
            this.pupil.y--;
        }
    }

    lookDown() {
        if (this.pupil.d.y < this.eye.d.y) {
            this.pupil.y++;
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
