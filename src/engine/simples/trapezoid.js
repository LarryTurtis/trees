import { Point } from "../point.js";
import { Line } from "../line.js";
import { Sprite } from "../sprite.js";

class Trapezoid extends Sprite {
  constructor(x, y, width, height, leftAngle, rightAngle) {
    super(x, y, width, height);
    this.type = "Trapezoid";

    if (typeof leftAngle !== "number") {
      throw new Error("No angle for trapezoid was supplied.");
    }

    if (typeof rightAngle !== "number") {
      rightAngle = leftAngle;
    }

    //left angle is the degree of the top left corner.
    //right angle is the degree of the top right corner.

    this._leftAngle = leftAngle;
    this._rightAngle = rightAngle;
    this._setAngles();

    if (
      this.topLeft.x > this.topRight.x ||
      this.bottomLeft.x > this.bottomRight.x ||
      this.topLeft.y > this.bottomLeft.y ||
      this.topRight.y > this.bottomRight.y
    ) {
      throw new Error("Parameters do not define trapezoid.");
    }
    //this.showBoundingBox = true;
  }

  animate() {
    // if (!this.collidingWithPlatform) this.fall();
  }

  set x(x) {
    let oldX = this.x;
    let diffX = x - oldX;
    super.x = x;
    this.topLeft.x += diffX;
    this.topRight.x += diffX;
    this.bottomLeft.x += diffX;
    this.bottomRight.x += diffX;
  }

  set y(y) {
    let oldY = this.y;
    let diffY = y - oldY;
    super.y = y;
    this.topLeft.y += diffY;
    this.topRight.y += diffY;
    this.bottomLeft.y += diffY;
    this.bottomRight.y += diffY;
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

  flipVertical() {
    this.rotate(90, this.center);
  }

  lines() {
    return [
      new Line(this.topLeft, this.topRight),
      new Line(this.topRight, this.bottomRight),
      new Line(this.bottomRight, this.bottomLeft),
      new Line(this.bottomLeft, this.topLeft),
    ];
  }

  getSideLength(angle, height) {
    let radians = trees.degToRad(180 - angle);
    return height / Math.sin(radians);
  }

  rotate(deg, transformOrigin) {
    super.rotate(deg, transformOrigin);
    if (this.topLeft) {
      this.topLeft = trees.rotatePoint(this.topLeft, transformOrigin, deg);
      this.topRight = trees.rotatePoint(this.topRight, transformOrigin, deg);
      this.bottomLeft = trees.rotatePoint(
        this.bottomLeft,
        transformOrigin,
        deg
      );
      this.bottomRight = trees.rotatePoint(
        this.bottomRight,
        transformOrigin,
        deg
      );
    }
  }

  trimTop(amount) {
    //main concern with this function is it does not adjust the width as trapezoid scales
    //therefore, we should be careful when collision testing, if that becomes necessary.
    let oldHeight = this.height;
    let oldLeftHypotenuse = this.getSideLength(this.leftAngle, oldHeight);
    let oldRightHypotenuse = this.getSideLength(this.rightAngle, oldHeight);

    let bottomLeft = trees.copyPoint(this.bottomLeft);
    let bottomRight = trees.copyPoint(this.bottomRight);
    let topRight = trees.copyPoint(this.topRight);
    let topLeft = trees.copyPoint(this.topLeft);

    super.trimTop(amount);

    let newLeftHypotenuse = this.getSideLength(this.leftAngle, this.height);
    let newRightHypotenuse = this.getSideLength(this.rightAngle, this.height);

    this.topLeft = trees.getPointOnLine(
      topLeft,
      oldLeftHypotenuse - newLeftHypotenuse,
      trees.getAngle(this.topLeft, this.bottomLeft)
    );
    this.topRight = trees.getPointOnLine(
      topRight,
      oldRightHypotenuse - newRightHypotenuse,
      trees.getAngle(this.topRight, this.bottomRight)
    );

    this.bottomLeft = bottomLeft;
    this.bottomRight = bottomRight;
  }

  growTop(amount) {
    this.trimTop(-amount);
  }

  _setAngles() {
    if (this.leftAngle < 90) {
      this._topLeft = this.a;
      this._bottomLeft = trees.getPointOnLine(
        this.a,
        this.getSideLength(this.leftAngle, this.height),
        this.leftAngle
      );
    } else {
      this._topLeft = trees.getPointOnLine(
        this.d,
        -this.getSideLength(this.leftAngle, this.height),
        this.leftAngle
      );
      this._bottomLeft = this.d;
    }

    if (this.rightAngle < 90) {
      this._topRight = this.b;
      this._bottomRight = trees.getPointOnLine(
        this.b,
        this.getSideLength(this.rightAngle, this.height),
        180 - this.rightAngle
      );
    } else {
      this._topRight = trees.getPointOnLine(
        this.c,
        -this.getSideLength(this.rightAngle, this.height),
        180 - this.rightAngle
      );
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

    if (!this.pathOnly) ctx.fill();
    if (!this.pathOnly && this.lineColor) ctx.stroke();
    ctx.closePath();
  }
}

export { Trapezoid };
