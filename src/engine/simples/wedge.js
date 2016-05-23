import { Point } from '../point.js';
import { Sprite } from '../sprite.js';
import { Curve } from '../curve.js';

function getBezierDistance(n) {
    return (n / 2) * 0.552284749831;
}

class Wedge extends Sprite {
    constructor(x, y, width, height, angle) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height, angle);

    }

    updatePoints() {
        let oldOrigin = this.origin;
        super.updatePoints();

        let xDiff = this.origin.x - oldOrigin.x;
        let yDiff = this.origin.y - oldOrigin.y;
        if (!this.cp1) {
            this._cp1 = new Point(this.x + getBezierDistance(this.width * 2), this.y);
            this._cp2 = new Point(this.b.x, this.c.y - getBezierDistance(this.height * 2));
            this._end = new Point(this.c.x, this.c.y);
        }
        this.cp1 = new Point(this.cp1.x + xDiff, this.cp1.y + yDiff);
        this.cp2 = new Point(this.cp2.x + xDiff, this.cp2.y + yDiff);
        this.end = new Point(this.end.x + xDiff, this.end.y + yDiff);

        this._curve = new Curve(this._cp1, this._cp2, this._end);
    }

    get width() {
        return super.width;
    }

    set width(width) {
        super.width = width;
        this.cp1 = this.getPointOnLine(this.a, getBezierDistance(this.width * 2), this.getAngle(this.a, this.b));
        this.cp2 = this.getPointOnLine(this.c, getBezierDistance(-this.height * 2), this.getAngle(this.b, this.c));
        this.end = new Point(this.c.x, this.c.y);
        this._curve = new Curve(this._cp1, this._cp2, this._end);
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        this.cp1 = this.getPointOnLine(this.a, getBezierDistance(this.width * 2), this.getAngle(this.a, this.b));
        this.cp2 = this.getPointOnLine(this.c, getBezierDistance(-this.height * 2), this.getAngle(this.b, this.c));
        this.end = new Point(this.c.x, this.c.y);
        this._curve = new Curve(this._cp1, this._cp2, this._end);
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.cp1 = this.rotate_point(this.cp1, transformOrigin, deg);
        this.cp2 = this.rotate_point(this.cp2, transformOrigin, deg);
        this.end = this.rotate_point(this.end, transformOrigin, deg);
        this.curve = new Curve(this.cp1, this.cp2, this.end);
    }

    getReverseCurve() {
        return new Curve(this.cp2, this.cp1, this.a);
    }

    get cp1() {
        return this._cp1;
    }

    set cp1(cp1) {
        this._cp1 = cp1;
    }

    get cp2() {
        return this._cp2;
    }

    set cp2(cp2) {
        this._cp2 = cp2;
    }

    get end() {
        return this._end;
    }

    set end(end) {
        this._end = end;
    }

    get curve() {
        return this._curve;
    }

    set curve(curve) {
        this._curve = curve;
    }

    createSATObject() {
        return [];
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.yMove(this.origin);
        ctx.curve(this.curve);
        ctx.yLine(this.d);
        ctx.yLine(this.a);
        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Wedge }
