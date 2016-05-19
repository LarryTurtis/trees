import { RoundedRectangle } from './roundedRectangle.js';
import { ComplexShape } from './complexShape.js';

class Head extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Head";
        this.mouthOpen = false;
        this.top = new RoundedRectangle(x, y, width, height * .75, 0, width / 2, 2);
        this.bottom = new RoundedRectangle(x, y + height * .75, width, height * .25, 180, width / 2, 2);
        this.addShape(this.top);
        this.addShape(this.bottom);
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

        ctx.beginPath();
        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Head }
