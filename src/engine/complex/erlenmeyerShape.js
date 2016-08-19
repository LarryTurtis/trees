import { simples } from '../simples/simples.js';
import { Curve } from '../curve.js';
import { Point } from '../point.js';
import { ComplexShape } from './complexShape.js';

class ErlenmeyerShape extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "ErlenmeyerShape";
        this.lip = new simples.Rectangle(this.x + this.width / 4, this.y, this.width / 2, this.height / 20);

        let neckWidth = this.width / 2.5;

        this.neck = new simples.Rectangle(trees.getCenterX(neckWidth, this), this.y + this.lip.height, neckWidth, this.height / 4);
        this.addShape(this.lip);
        this.addShape(this.neck);

        this._bottomLeft1 = new Point(this.d.x, this.d.y * 0.90);
        this._bottomLeft2 = new Point(this.d.x + this.width / 5, this.d.y);

        this._bottomRight1 = new Point(this.c.x, this.c.y * 0.90);
        this._bottomRight2 = new Point(this.c.x - this.width / 5, this.c.y);

        this._leftCurve = new Curve(this.d, this.d, this.bottomLeft2);
        this._rightCurve = new Curve(this.c, this.c, this.bottomRight1);
    }

    animate() {
        // if (!this.collidingWithPlatform) this.fall();
    }

    set x(x) {
        super.x = x;
        this.bottomLeft1 = new Point(this.d.x + this.width / 10, this.d.y);
        this.bottomRight1 = new Point(this.c.x - this.width / 10, this.c.y);

    }

    set y(y) {
        super.y = y;
        this.bottomLeft1 = new Point(this.d.x + this.width / 10, this.d.y);
        this.bottomRight1 = new Point(this.c.x - this.width / 10, this.c.y);

    }

    get x() {
        return super.x;
    }

    get y() {
        return super.y;
    }

    get bottomLeft1() {
        return this._bottomLeft1;
    }

    set bottomLeft1(bottomLeft1) {
        this._bottomLeft1 = bottomLeft1;
    }

    get bottomRight1() {
        return this._bottomRight1;
    }

    set bottomRight1(bottomRight1) {
        this._bottomRight1 = bottomRight1;
    }

    get bottomLeft2() {
        return this._bottomLeft2;
    }

    set bottomLeft2(bottomLeft2) {
        this._bottomLeft2 = bottomLeft2;
    }

    get bottomRight2() {
        return this._bottomRight2;
    }

    set bottomRight2(bottomRight2) {
        this._bottomRight2 = bottomRight2;
    }

    get leftCurve() {
        return this._leftCurve;
    }

    set leftCurve(leftCurve) {
        this._leftCurve = leftCurve;
    }

    get rightCurve() {
        return this._rightCurve;
    }

    set rightCurve(rightCurve) {
        this._rightCurve = rightCurve;
    }

    draw(ctx) {
        super.draw(ctx);

        this.lip.draw(ctx);
        this.neck.draw(ctx);
        ctx.beginPath();
        ctx.yMove(this.neck.d);
        ctx.yLine(this.bottomLeft1);
        ctx.curve(this.leftCurve);
        ctx.yLine(this.bottomRight2);
        ctx.curve(this.rightCurve);
        ctx.yLine(this.neck.c);
        ctx.yLine(this.neck.d);

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { ErlenmeyerShape }
