import { Point } from './point.js'
import { GlobalCollisionRegistry } from './globalCollisionRegistry.js'
import { CollisionRegistry } from './collisionRegistry.js'

let globalCollisionRegistry = new GlobalCollisionRegistry();

class Sprite {
    constructor(x, y, width, height, angle) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this._angle = angle || 0
        this.updatePoints(x, y);
        this._centerX = this.x + (this.width / 2);
        this._centerY = this.y + (this.height / 2);
        this._lineWidth = 1;
        this._showBoundingBox = true;
        this._color = "white";
        this._lineColor = "black";
        this.collisions = new CollisionRegistry();
        this._id = null;
    }

    set x(x) {
        this._x = x;
        this.updatePoints(this.x, this.y)
        this.updateCollisions();
    }

    set y(y) {
        this._y = y;
        this.updatePoints(this.x, this.y)
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
        this._a = obj;
    }

    get a() {
        return this._a;
    }

    set b(obj) {
        this._b = obj;
    }

    get b() {
        return this._b;
    }

    set c(obj) {
        this._c = obj;
    }

    get c() {
        return this._c;
    }

    set d(obj) {
        this._d = obj;
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
        this.updatePoints(this.x, this.y)
        this.updateCollisions();
    }

    set height(height) {
        this._height = height;
        this.updatePoints(this.x, this.y)
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
        this.updatePoints(this.x, this.y);
        this.updateCollisions();
    }

    rotate(deg) {
        this.angle = deg;
    }

    getSecondPoint(firstPoint, width, angle) {
        let secondPointX = firstPoint.x + width * Math.cos(angle * Math.PI / 180);
        let secondPointY = firstPoint.y + width * Math.sin(angle * Math.PI / 180);
        return new Point(secondPointX, secondPointY);
    }

    updateCollisions() {
        globalCollisionRegistry.forEach(collision => {
            if (collision.obj !== this) {
                var collisionResult = collision.test(this);
                if (collisionResult) {
                    collisionResult.type = collision.type;
                    collisionResult.obj = collision.obj;
                    if (!this.collisions.all[collision.obj.id]) this.collisions.add(collisionResult);
                } else {

                    //this is weird. should we just update collisions for all objects every frame?
                    collision.obj.collisions.remove(this);
                    this.collisions.remove(collision);
                }
            }
        });
    }

    updatePoints(x, y) {
        this.centerX = this.x + (this.width / 2);
        this.centerY = y + (this.height / 2);

        this.a = new Point(x, y);
        this.b = this.getSecondPoint(this.a, this.width, this.angle);
        this.c = this.getSecondPoint(this.b, this.height, this.angle + 90);
        this.d = this.getSecondPoint(this.c, -this.width, this.angle);
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
