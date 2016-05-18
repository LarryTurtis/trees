import { simples } from '../simples/simples.js';
import { CircularShape } from './circularShape.js';

class Circle extends CircularShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Circle";

        this.topRight = new simples.Wedge(x + width / 2, y, width / 2, height / 2, 0);
        this.topLeft = new simples.Wedge(x, y, width / 2, height / 2, 270);
        this.bottomRight = new simples.Wedge(x + width / 2, y + height / 2, width / 2, height / 2, 90);
        this.bottomLeft = new simples.Wedge(x, y + height / 2, width / 2, height / 2, 180);

        this.addShape(this.topRight);
        this.addShape(this.topLeft);
        this.addShape(this.bottomRight);
        this.addShape(this.bottomLeft);

    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();
        ctx.moveTo(this.topLeft.a.x, this.topLeft.a.y);
        ctx.curve(this.topLeft.curve);
        ctx.curve(this.topRight.curve);
        ctx.curve(this.bottomRight.curve);
        ctx.curve(this.bottomLeft.curve);
        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Circle }
