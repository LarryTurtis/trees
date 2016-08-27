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
        this._setAngles();
    }

    animate() {
        // if (!this.collidingWithPlatform) this.fall();
    }

    set x(x) {
        super.x = x;
    }

    set y(y) {
        super.y = y;
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
    }

    set height(height) {
        super.height = height;
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

    _updateBoundaries() {
        super._updateBoundaries();
        this._setAngles();
    }


    trimTop(amount) {

        //main concern with this function is it does not adjust the width as trapezoid scales
        //therefore, we should be careful when collision testing, if that becomes necessary.
        let oldHeight = this.height;
        let oldLeftHypotenuse = this.getSideLength(this.leftAngle + this.angle, oldHeight);
        let oldRightHypotenuse = this.getSideLength(this.rightAngle + this.angle, oldHeight);

        let bottomLeft = trees.copyPoint(this.bottomLeft);
        let bottomRight = trees.copyPoint(this.bottomRight);
        let topRight = trees.copyPoint(this.topRight);
        let topLeft = trees.copyPoint(this.topLeft);

        super.trimTop(amount);

        let newLeftHypotenuse = this.getSideLength(this.leftAngle + this.angle, this.height);
        let newRightHypotenuse = this.getSideLength(this.rightAngle + this.angle, this.height);

        this.topLeft = trees.getPointOnLine(topLeft, oldLeftHypotenuse - newLeftHypotenuse, this.leftAngle + this.angle);
        this.topRight = trees.getPointOnLine(topRight, oldRightHypotenuse - newRightHypotenuse, 180 - this.rightAngle + this.angle);

        this.bottomLeft = bottomLeft;
        this.bottomRight = bottomRight;
    }

    _setAngles() {
        if (this.leftAngle < 90) {

            this._topLeft = this.a;
            this._bottomLeft = trees.getPointOnLine(this.a, this.getSideLength(this.leftAngle, this.height), this.leftAngle + this.angle);

        } else {

            this._topLeft = trees.getPointOnLine(this.d, -this.getSideLength(this.leftAngle, this.height), this.leftAngle + this.angle);
            this._bottomLeft = this.d;
        }

        if (this.rightAngle < 90) {

            this._topRight = this.b;
            this._bottomRight = trees.getPointOnLine(this.b, this.getSideLength(this.rightAngle, this.height), 180 - this.rightAngle + this.angle);

        } else {

            this._topRight = trees.getPointOnLine(this.c, -this.getSideLength(this.rightAngle, this.height), 180 - this.rightAngle + this.angle);
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