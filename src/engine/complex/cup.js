import { simples } from '../simples/simples.js';
import { Point } from '../point.js';
import { ComplexShape } from './complexShape.js';

class Cup extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Cup";
        this._bottomLeft = new Point(this.d.x + this.width / 10, this.d.y);
        this._bottomRight = new Point(this.c.x - this.width / 10, this.c.y);
    }

    animate() {
        // if (!this.collidingWithPlatform) this.fall();
    }

    get area() {
        return 0.5 * (this.b1 + this.b2) * this.height;
    }

    get b1() {
        return this.b.x - this.a.x;
    }

    get b2() {
        return this.bottomRight.x - this.bottomLeft.x;
    }

    get bottomLeft() {
        return this._bottomLeft;
    }

    set bottomLeft(bottomLeft) {
        this._bottomLeft = bottomLeft;
    }

    get bottomRight() {
        return this._bottomRight;
    }

    set bottomRight(bottomRight) {
        this._bottomRight = bottomRight;
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        ctx.yMove(this.a);
        ctx.yLine(this.bottomLeft);
        ctx.yLine(this.bottomRight);
        ctx.yLine(this.b);
        ctx.yLine(this.a);

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();

    }

}

export { Cup }
