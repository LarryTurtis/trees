import {
    Point
}
from './point.js'
import {
    CollisionRegistry
}
from './collisionRegistry.js'

let collisionRegistry = new CollisionRegistry();

class Sprite {
    constructor(x, y, width, height, angle) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this._centerX = this.x + (this.width / 2);
        this._centerY = this.y + (this.height / 2);
        this._angle = angle || 0;
        this._a = new Point(x, y);
        this._b = this.getSecondPoint(this.a, width, this.angle);
        this._c = this.getSecondPoint(this.b, height, this.angle + 90);
        this._d = this.getSecondPoint(this.c, -width, this.angle);
        this._lineWidth = 1;
        this._showBoundingBox = false;
        this._color = "white";
        this._lineColor = "black";
        this.collisions = [];
        this._id = null;
    }

    set x(x) {
        this._x = x;
        this.a.x = x;
        this.b.x = this.getSecondPoint(this.a, this.width, this.angle).x;
        this.c.x = this.getSecondPoint(this.b, this.height, this.angle + 90).x;
        this.d.x = this.getSecondPoint(this.c, -this.width, this.angle).x;
        this.centerX = x + (this.width / 2);
        this.updateCollisions();
    }

    set y(y) {
        this._y = y;
        this.a.y = y;
        this.b.y = this.getSecondPoint(this.a, this.width, this.angle).y;
        this.c.y = this.getSecondPoint(this.b, this.height, this.angle + 90).y;
        this.d.y = this.getSecondPoint(this.c, -this.width, this.angle).y;
        this.centerY = y + (this.height / 2);
        this.updateCollisions();
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get centerX() {
        return this._centerX;
    }

    set centerX(centerX) {
        this._centerX = centerX;
    }

    get centerY() {
        return this._centerY;
    }

    set centerY(centerY) {
        this._centerY = centerY;
    }

    set id(id) {
        this._id = id;
    }

    set a(obj) {
        this._a.x = obj.x;
        this._a.y = obj.y;
    }

    get a() {
        return this._a;
    }

    set b(obj) {
        this._b.x = obj.x;
        this._b.y = obj.y;
    }

    get b() {
        return this._b;
    }

    set c(obj) {
        this._c.x = obj.x;
        this._c.y = obj.y;
    }

    get c() {
        return this._c;
    }

    set d(obj) {
        this._d.x = obj.x;
        this._d.y = obj.y;
    }

    get d() {
        return this._d;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get id() {
        return this._id;
    }

    set width(width) {
        this._width = width;
        this.b.x = this.getSecondPoint(this.a, width, this.angle).x;
        this.d.x = this.getSecondPoint(this.c, -width, this.angle).x;
        this.centerX = this.x + (width / 2);
        this.updateCollisions();
    }

    set height(height) {
        this._height = height;
        this.c.x = this.getSecondPoint(this.b, height, this.angle + 90).x;
        this.centerY = this.y + (height / 2);
        this.updateCollisions();
    }

    set showBoundingBox(bool) {
        this._showBoundingBox = bool;
    }

    get showBoundingBox() {
        return this._showBoundingBox;
    }

    set color(color) {
        this._color = color;
    }

    get color() {
        return this._color;
    }

    set lineColor(color) {
        this._lineColor = color
    }

    get lineColor() {
        return this._lineColor;
    }

    set lineWidth(width) {
        this._lineWidth = width
    }

    get lineWidth() {
        return this._lineWidth;
    }

    get angle() {
        return this._angle;
    }

    set angle(angle) {
        this._angle = angle;
    }

    getSecondPoint(firstPoint, width, angle) {
        let secondPointX = firstPoint.x + width * Math.cos(angle * Math.PI / 180);
        let secondPointY = firstPoint.y + width * Math.sin(angle * Math.PI / 180);
        return new Point(secondPointX, secondPointY);
    }

    updateCollisions() {
        // this.collisions = [];
        collisionRegistry.forEach(collision => {
            var collisionResult = collision.test(this);
            if (collisionResult) {
                collision.point = collisionResult;
                this.collisions.push(collision);
            }
        });
        this.collisions.sort(function(a, b) {
            return a.obj.y - b.obj.y;
        })
    }

    draw(ctx) {

        let rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        }

        if (this._showBoundingBox) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = "transparent";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.yRect(rect);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
    }
}
export {
    Sprite
}
