import { Point } from './point.js'
import { CollisionRegistry } from './collisionRegistry.js'

class Sprite {
    constructor(x, y, width, height) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this._centerX = this.x + (this.width / 2);
        this._centerY = this.y + (this.height / 2);
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
        this._a.x = x;
        this._b.x = x + this._width;
        this._c.x = x + this._width;
        this._d.x = x;
        this._centerX = x + (this.width / 2);
        this._hasCollisions = false;
        this.collisionRegistry.collisions.forEach(collision => {
            this._hasCollisions = this._hasCollisions || collision.test(this._x, this._y, this._width, this.height)
        });
    }

    set y(y) {
        this._y = y;
        this._a.y = y;
        this._b.y = y;
        this._c.y = y + this._height;
        this._d.y = y + this._height;
        this._centerY = y + (this.height / 2);
        this._hasCollisions = false;
        this.collisionRegistry.collisions.forEach(collision => {
            this._hasCollisions = this._hasCollisions || collision.test(this._x, this._y, this._width, this.height)
        });
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

    get centerY() {
        return this._centerY;
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
        this._b.x = this._x + width;
        this._c.x = this._x + width;
        this._centerX = this.x + (width / 2);
        this._hasCollisions = false;
        this.collisionRegistry.collisions.forEach(collision => {
            this._hasCollisions = this._hasCollisions || collision.test(this._x, this._y, this._width, this.height)
        });
    }

    set height(height) {
        this._height = height;
        this._c.y = this._y + height;
        this._d.y = this._y + height;
        this._hasCollisions = false;
        this._centerY = this.y + (height / 2);
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
