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

        this.setAngles();
    }

    animate() {
        // if (!this.collidingWithPlatform) this.fall();
    }

    set x(x) {
        super.x = x;
        this.setAngles();
    }

    set y(y) {
        super.y = y;
        this.setAngles();
    }

    get x() {
        return super.x;
    }

    get y() {
        return super.y;
    }

    get width() {
        return super.width;
    }

    get height() {
        return super.height;
    }

    set width(width) {
        super.width = width;
        this.setAngles();
    }

    set height(height) {
        super.height = height;
        this.setAngles();
    }

    get area() {
        return 0.5 * (this.b1 + this.b2) * this.height;
    }

    get b1() {
        return this.topRight.x - this.topLeft.x;
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

    getSideLength(angle) {
        let radians = trees.degToRad(180 - angle);
        return this.height / Math.sin(radians);
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.setAngles();
    }

    trimTop(amount) {

        //currently only works if trapezoid is isoceles.
        //we need to determine whether leftAngle is acute or obtuse
        //and then handle the repositioning of x by finding the difference between old
        //hypotenuse and new hypotenuse, accordingly.

        //we may also need to determine the width differently when one angle is acute
        //and the other obtuse. 

        //this should be broken up in to several functions

        let oldHeight = this.height;
        let oldb1 = this.b1;

        super.trimTop(amount);
        let percentage = this.height / oldHeight;
        let baseWidthDiff = Math.abs(oldb1 - this.b2);

        let width = baseWidthDiff * percentage + Math.min(this.b1, this.b2);

        this.x = this.x + ((this.width - width) / 2);
        this.width = width;
    }

    setAngles() {
        if (this.leftAngle < 90) {

            this._topLeft = this.a;
            this._bottomLeft = this.getPointOnLine(this.a, this.getSideLength(this.leftAngle), this.leftAngle + this.angle);

        } else {

            this._topLeft = this.getPointOnLine(this.d, -this.getSideLength(this.leftAngle), this.leftAngle + this.angle);
            this._bottomLeft = this.d;
        }

        if (this.rightAngle < 90) {

            this._topRight = this.b;
            this._bottomRight = this.getPointOnLine(this.b, this.getSideLength(this.rightAngle), 180 - this.rightAngle + this.angle);

        } else {

            this._topRight = this.getPointOnLine(this.c, -this.getSideLength(this.rightAngle), 180 - this.rightAngle + this.angle);
            this._bottomRight = this.c;
        }

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
