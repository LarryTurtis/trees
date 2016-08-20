import { simples } from '../simples/simples.js';
import { Point } from '../point.js';
import { Sprite } from '../sprite.js';

class Trapezoid extends Sprite {
    constructor(x, y, width, height, angle, leftAngle, rightAngle) {
        super(x, y, width, height, angle);
        this.type = "Trapezoid";

        //left angle is the degree of the top left corner.
        //right angle is the degree of the top right corner.

        this._leftAngle = leftAngle;
        this._rightAngle = rightAngle;


        if (leftAngle < 90) {

            let radians = (180 - leftAngle) * (Math.PI / 180);
            let hypotenuse = this.height / Math.sin(radians);

            this._topLeft = this.a;
            this._bottomLeft = this.getPointOnLine(this.a, hypotenuse, leftAngle);

        } else {

            let radians = (180 - leftAngle) * (Math.PI / 180);
            let hypotenuse = this.height / Math.sin(radians);
            console.log(hypotenuse);
            this._topLeft = this.getPointOnLine(this.d, -hypotenuse, leftAngle);
            this._bottomLeft = this.d;
        }

        if (rightAngle < 90) {

            let radians = (180 - rightAngle) * (Math.PI / 180);
            let hypotenuse = this.height / Math.sin(radians);

            this._topRight = this.b;
            this._bottomRight = this.getPointOnLine(this.b, this.height, rightAngle);
        } else {

            let radians = (180 - rightAngle) * (Math.PI / 180);
            let hypotenuse = this.height / Math.sin(radians);

            this._topRight = this.getPointOnLine(this.c, -hypotenuse, 180 - rightAngle);
            this._bottomRight = this.c;
        }

        if (this.topLeft.x > this.topRight.x || 
            this.bottomLeft.x > this.bottomRight.x ||
            this.topLeft.y > this.bottomLeft.y ||
            this.topRight.y > this.bottomRight.y) {
            console.error("This trapezoid height/width ratio is incorrect.")
        }
    }

    animate() {
        // if (!this.collidingWithPlatform) this.fall();
    }

    set x(x) {
        super.x = x;
        this.bottomLeft = new Point(this.d.x + this.width / 10, this.d.y);
        this.bottomRight = new Point(this.c.x - this.width / 10, this.c.y);

    }

    set y(y) {
        super.y = y;
        this.bottomLeft = new Point(this.d.x + this.width / 10, this.d.y);
        this.bottomRight = new Point(this.c.x - this.width / 10, this.c.y);

    }

    get x() {
        return super.x;
    }

    get y() {
        return super.y;
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

    get topLeft() {
        return this._topLeft;
    }

    set topLeft(topLeft) {
        this._topLeft = topLeft;
    }

    get topRight() {
        return this._topRight;
    }

    set topRight(topRight) {
        this._topRight = topRight;
    }

    get leftAngle() {
        return this._leftAngle;
    }

    set leftAngle(leftAngle) {
        this._leftAngle = leftAngle;
    }

    get rightAngle() {
        return this._rightAngle;
    }

    set rightAngle(rightAngle) {
        this._rightAngle = rightAngle;
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();
        ctx.yMove(this.topLeft);
        ctx.yLine(this.bottomLeft);
        ctx.yLine(this.bottomRight);
        ctx.yLine(this.topRight);
        ctx.yLine(this.topLeft);

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Trapezoid }
