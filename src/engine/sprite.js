import { Point } from './point.js'
import { scroll } from './animations/scroll.js'

class Sprite {
    constructor(x, y, width, height) {
        this._width = width || 0;
        this._height = height || 0;
        this._x = x || 0;
        this._y = y || 0;
        this._origin = new Point(this.x, this.y);
        this._a = new Point(this.x, this.y);
        this._b = new Point(this.x + this.width, this.y);
        this._c = new Point(this.x + this.width, this.y + this.height);
        this._d = new Point(this.x, this.y + this.height);
        this._boundary = {};
        this._center = new Point(this.x + (this.width / 2), this.y + (this.height / 2));
        this._updatePoints();
        this._lineWidth = 1;
        this._showBoundingBox = false;
        this._color = "transparent";
        this._lineColor = null;
        this._id = null;
        this._collidingWith = null;
        this._collidable = false;
    }

    set x(x) {
        if (typeof(x) !== "number") {
            throw new Error("x must be a number.");
        };
        this._x = x;
        this._updatePoints()
    }

    set y(y) {
        if (typeof(y) !== "number") {
            throw new Error("y must be a number.");
        };
        this._y = y;
        this._updatePoints()
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get center() {
        return this._center;
    }

    set center(center) {
        this._center = center;
    }

    get origin() {
        return this._origin;
    }

    set origin(origin) {
        this._origin = origin;
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
        if (typeof(width) !== "number") {
            throw new Error("width must be a number.");
        };
        let oldWidth = this.width;
        this._width = width;
        let widthDiff = this.width - oldWidth;

        let angle = trees.getAngle(this.a, this.b);
        this.b = trees.getPointOnLine(this.b, widthDiff, angle);
        this.c = trees.getPointOnLine(this.c, widthDiff, angle);

        this.center = trees.getPointOnLine(this.a, trees.getDistance(this.a, this.c) / 2, trees.getAngle(this.a, this.c));
        this._updateBoundaries();

    }

    set height(height) {
        if (typeof(height) !== "number") {
            throw new Error("height must be a number.");
        };
        let oldHeight = this.height;
        this._height = height;
        let heightDiff = this.height - oldHeight;
        let angle = trees.getAngle(this.a, this.d);

        this.c = trees.getPointOnLine(this.c, heightDiff, angle);
        this.d = trees.getPointOnLine(this.d, heightDiff, angle);

        this.center = trees.getPointOnLine(this.a, trees.getDistance(this.a, this.c) / 2, trees.getAngle(this.a, this.c));
        this._updateBoundaries();
    }

    set showBoundingBox(bool) {
        this._showBoundingBox = bool;
    }

    get showBoundingBox() {
        return this._showBoundingBox;
    }

    set collidable(collidable) {
        this._collidable = collidable;
    }

    get collidable() {
        return this._collidable;
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

    rotate(deg, transformOrigin) {
        if (typeof(deg) !== "number" ||
            typeof(transformOrigin.x) !== "number" ||
            typeof(transformOrigin.y) !== "number") {
            throw new Error('Attempted to rotate using non-numeric value');
        }
        this._origin = this.rotate_point(this.origin, transformOrigin, deg);
        this._x = this.origin.x;
        this._y = this.origin.y;
        this.a = this.rotate_point(this.a, transformOrigin, deg);
        this.b = this.rotate_point(this.b, transformOrigin, deg);
        this.c = this.rotate_point(this.c, transformOrigin, deg);
        this.d = this.rotate_point(this.d, transformOrigin, deg);
        this.center = this.rotate_point(this.center, transformOrigin, deg);

        this._updateBoundaries();
    }

    get boundary() {
        return this._boundary;
    }

    set boundary(boundary) {
        this._boundary = boundary;
    }

    get collidingWith() {
        return this._collidingWith;
    }

    set collidingWith(collidingWith) {
        this._collidingWith = collidingWith;
    }

    rotate_point(point, origin, deg) {
        let angle = deg * Math.PI / 180.0;
        let x = Math.cos(angle) * (point.x - origin.x) - Math.sin(angle) * (point.y - origin.y) + origin.x;
        let y = Math.sin(angle) * (point.x - origin.x) + Math.cos(angle) * (point.y - origin.y) + origin.y;
        return new Point(x, y);
    }

    trimTop(amount) {
        if (this.height > 0) {

            amount = this.height - amount > 0 ? amount : this.height;

            this._height -= amount;

            let angle = trees.getAngle(this.a, this.d);
            let newOrigin = trees.getPointOnLine(this.a, amount, angle);

            this.x = newOrigin.x;
            this.y = newOrigin.y;
            this.c = trees.getPointOnLine(this.c, -amount, angle);
            this.d = trees.getPointOnLine(this.d, -amount, angle);

            this.center = trees.getPointOnLine(this.a, trees.getDistance(this.a, this.c) / 2, trees.getAngle(this.a, this.c));
            this._updateBoundaries();
        }
    }

    wasClicked(mouseX, mouseY) {
        if (this.boundary.a.x <= mouseX &&
            this.boundary.b.x >= mouseX &&
            this.boundary.a.y * 0.9 <= mouseY &&
            this.boundary.d.y * 1.1 >= mouseY) {
            return this;
        }
        return null;
    }

    _updatePoints() {

        let oldOrigin = this.origin;
        this.origin = new Point(this.x, this.y);
        let xDiff = this.origin.x - oldOrigin.x;
        let yDiff = this.origin.y - oldOrigin.y;
        this.center = new Point(this.center.x + xDiff, this.center.y + yDiff);

        this.a = new Point(this.a.x + xDiff, this.a.y + yDiff);
        this.b = new Point(this.b.x + xDiff, this.b.y + yDiff);
        this.c = new Point(this.c.x + xDiff, this.c.y + yDiff);
        this.d = new Point(this.d.x + xDiff, this.d.y + yDiff);

        this._updateBoundaries();
    }

    _updateBoundaries() {
        var lowestX = Math.min(this.a.x, this.b.x, this.c.x, this.d.x);
        var highestX = Math.max(this.a.x, this.b.x, this.c.x, this.d.x);
        var lowestY = Math.min(this.a.y, this.b.y, this.c.y, this.d.y);
        var highestY = Math.max(this.a.y, this.b.y, this.c.y, this.d.y);
        var boundaryW = highestX - lowestX;
        var boundaryH = highestY - lowestY;

        this.boundary.a = new Point(lowestX, lowestY);
        this.boundary.b = new Point(lowestX + boundaryW, lowestY);
        this.boundary.c = new Point(lowestX + boundaryW, lowestY + boundaryH);
        this.boundary.d = new Point(lowestX, lowestY + boundaryH);
    }

    draw(ctx) {
        if (this.showBoundingBox) {
            ctx.beginPath();
            ctx.fillStyle = "red";
            ctx.lineWidth = 1;
            let size = 5;
            ctx.rect(this.x - size / 2, this.y - size / 2, size, size);
            ctx.rect(this.a.x - size / 2, this.a.y - size / 2, size, size);
            ctx.rect(this.center.x - size / 2, this.center.y - size / 2, size, size);
            ctx.fill();
            ctx.closePath();

            ctx.fillStyle = "transparent";

            ctx.strokeStyle = "blue";
            ctx.beginPath();
            ctx.yRect(this.boundary);
            ctx.fill();
            ctx.stroke();
            ctx.closePath();

            ctx.strokeStyle = "green";
            ctx.beginPath();
            ctx.yRect({
                a: this.a,
                b: this.b,
                c: this.c,
                d: this.d
            });
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        } else {

            ctx.lineJoin = 'miter';
            ctx.fillStyle = this.color;
            ctx.strokeStyle = this.lineColor;
            ctx.lineWidth = this.lineWidth;
        }

    }
}

export { Sprite }
