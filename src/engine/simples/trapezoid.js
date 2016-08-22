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
        this.originalHeight = height;
        this.setAngles();
        this.originalB1 = this.b1;
        this.originalB2 = this.b2;
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

    getSideLength(angle, height) {
        let radians = trees.degToRad(180 - angle);
        return height / Math.sin(radians);
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
        let oldHypotenuse = this.getSideLength(this.leftAngle, oldHeight);
        let bottomLeft = trees.copyPoint(this.bottomLeft);
        let bottomRight = trees.copyPoint(this.bottomRight);
        let b1 = this.b1;
        let b2 = this.b2;
        let smallerBase = Math.min(this.b1, this.b2);

        super.trimTop(amount);
        let oldBaseWidth = Math.abs(this.b2 - this.b1);

        let newHypotenuse = this.getSideLength(this.leftAngle, this.height);

        if (this.leftAngle < 90) {
            this.x = this.getPointOnLine(this.topLeft, oldHypotenuse - newHypotenuse, this.leftAngle).x;
        }
        if (this.rightAngle < 90 && this.originalB1 <= this.originalB2) {
        
            this.width = ((this.height / this.originalHeight) * this.originalB1) +
            (((this.originalHeight - this.height) / this.originalHeight) * this.originalB2);
            //this.x += 1;
            //this.bottomLeft = bottomLeft;
            //this.bottomRight = bottomRight;
        }
    }

    setAngles() {
        if (this.leftAngle < 90) {

            this._topLeft = this.a;
            this._bottomLeft = this.getPointOnLine(this.a, this.getSideLength(this.leftAngle, this.height), this.leftAngle + this.angle);

        } else {

            this._topLeft = this.getPointOnLine(this.d, -this.getSideLength(this.leftAngle, this.height), this.leftAngle + this.angle);
            this._bottomLeft = this.d;
        }

        if (this.rightAngle < 90) {

            this._topRight = this.b;
            this._bottomRight = this.getPointOnLine(this.b, this.getSideLength(this.rightAngle, this.height), 180 - this.rightAngle + this.angle);

        } else {

            this._topRight = this.getPointOnLine(this.c, -this.getSideLength(this.rightAngle, this.height), 180 - this.rightAngle + this.angle);
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
