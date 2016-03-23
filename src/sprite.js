import { Point } from './point.js'
import { CollisionRegistry } from './collisionRegistry.js'

class Sprite {
    constructor(x, y, width, height) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this._a = new Point(x, y);
        this._b = new Point(x + width, y)
        this._c = new Point(x + width, y + height);
        this._d = new Point(x, y + height);
        this._lineWidth = 2;
        this._showBoundingBox = false;
        this._color = "black";
        this._lineColor = "black";
        this.collisionRegistry = new CollisionRegistry();
        this._hasCollisions = false;

    }

    set x(x) {
        this._x = x;
    }

    set y(y) {
        this._y = y;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
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

    get hasCollisions() {
        return this._hasCollisions;
    }

    set width(width) {
        this._width = width;
        this._b.x = width;
        this._c.x = width;
        this._hasCollisions = false;
        this.collisionRegistry.collisions.forEach(collision => {
            this._hasCollisions = this._hasCollisions || collision.test(this._x, this._y, this._width, this.height)
        });
    }

    set height(height) {
        this._height = height;
        this._c.y = height;
        this._d.y = height;
        this._hasCollisions = false;
        this.collisionRegistry.collisions.forEach(collision => {
            this._hasCollisions = this._hasCollisions || collision.test(this._x, this._y, this._width, this.height)
        });
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


    draw(ctx) {

        let rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        }

        if (this._showBoundingBox) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = "none";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.yRect(rect);
            ctx.stroke();
            ctx.closePath();
        }
        ctx.fillStyle = this._color;
        ctx.strokeStyle = this._lineColor;
        ctx.lineWidth = this._lineWidth;
    }
}
export { Sprite }
