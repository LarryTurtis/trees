import { Sprite } from '../sprite.js'
import { Curve } from '../curve.js'
import { Point } from '../point.js'

class Meniscus extends Sprite {
    constructor(x, y, width, height, end) {
        super(x, y, width, height, end);

        if (!end) {
            throw new Error("Attempted to create meniscus without endpoint");
        }

        this.type = "Meniscus";
        this._cp1;
        this._cp2;
        this._overhang;
        this._end = end;
        this._factor = 0.5;
        this._overhangWidth = width * this._factor;
        if (end.x < x) {
            this._cp1 = new Point(x - this.width / 2, this.y);
            this._cp2 = new Point(x - this.width, this.y);
            this._overhang = new Point(this._end.x - this._overhangWidth, this._end.y);
        } else {
            this._cp1 = new Point(x + this.width / 2, this.y);
            this._cp2 = new Point(x + this.width, this.y);
            this._overhang = new Point(this._end.x + this._overhangWidth, this._end.y);
        }

        this._curve = new Curve(this._cp1, this._cp2, this._overhang);
    }

    get factor() {
        return this._factor;
    }

    set factor(factor) {
        this._factor = factor;
    }

    get overhangWidth() {
        return this._overhangWidth;
    }

    set overhangWidth(overhangWidth) {
        this._overhangWidth = overhangWidth;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.yMove(this.origin);
        ctx.curve(this._curve);
        ctx.yLine(this._end);
        ctx.yLine(this.origin);
        ctx.closePath();
        ctx.fill();
    }

}

export { Meniscus }
