import { Point } from './point.js'
import { scroll } from './scroll.js'

function randomColor() {
    return '#'+Math.floor(Math.random()*16777215).toString(16);
}

class Sprite {
    constructor(x, y, width, height, angle) {
        this._width = width;
        this._height = height;
        this._x = x + scroll().x;
        this._y = y + scroll().y;
        this._origin = new Point(this.x, this.y);
        this._boundary = {};
        this._center = new Point(this.x + (this.width / 2), this.y + (this.height / 2));
        this._transformOrigin = new Point(this.x + (this.width / 2), this.y + (this.height / 2));
        this._angle = angle || 0
        this.updatePoints();
        this._lineWidth = 2;
        this._showBoundingBox = false;
        this._color = "white"//randomColor();
        this._lineColor = "black";
        this._id = null;
        this._collidingWith = null;
    }

    set x(x) {
        this._x = x;
        this.updatePoints()
    }

    set y(y) {
        this._y = y;
        this.updatePoints()
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

    get transformOrigin() {
        return this._transformOrigin;
    }

    set transformOrigin(transformOrigin) {
        this._transformOrigin = transformOrigin;
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
        this._width = width;
        this.updatePoints()
    }

    set height(height) {
        this._height = height;
        this.updatePoints()
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
        this.updatePoints();
    }

    rotate(deg) {
        this.angle = deg;
    }

    get rect() {
        return this._rect;
    }

    set rect(rect) {
        this._rect = rect;
    }

    get rotatedRect() {
        return this._rotatedRect;
    }

    set rotatedRect(rotatedRect) {
        this._rotatedRect = rotatedRect;
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

    getPointOnLine(firstPoint, width, angle) {
        let secondPointX = firstPoint.x + width * Math.cos(angle * Math.PI / 180);
        let secondPointY = firstPoint.y + width * Math.sin(angle * Math.PI / 180);
        return new Point(secondPointX, secondPointY);
    }

    rotate_point(point, origin) {
        let angle = this.angle * Math.PI / 180.0;
        let x = Math.cos(angle) * (point.x - origin.x) - Math.sin(angle) * (point.y - origin.y) + origin.x;
        let y = Math.sin(angle) * (point.x - origin.x) + Math.cos(angle) * (point.y - origin.y) + origin.y;
        return new Point(x, y);
    }

    updatePoints() {

        //we need to preserve the old origin to see how much it's changed
        let oldOrigin = this.origin || new Point(this.x, this.y);

        this.origin = new Point(this.x, this.y);
        this.center = new Point(this.x + (this.width / 2), this.y + (this.height / 2));

        //now that we have a new origin, find the change so we can apply it to the arbitrary point, transformOrigin.
        //the user can set transformOrigin to anything, so we need to change it regardless of where it is.
        let xDiff = this.origin.x - oldOrigin.x;
        let yDiff = this.origin.y - oldOrigin.y;

        this.transformOrigin = new Point(this.transformOrigin.x + xDiff, this.transformOrigin.y + yDiff);

        let a = new Point(this.x, this.y);
        let b = new Point(this.x + this.width, this.y);
        let c = new Point(this.x + this.width, this.y + this.height);
        let d = new Point(this.x, this.y + this.height);

        this.rect = {
            a: a,
            b: b,
            c: c,
            d: d
        };

        this.a = this.rotate_point(a, this.transformOrigin);
        this.b = this.rotate_point(b, this.transformOrigin);
        this.c = this.rotate_point(c, this.transformOrigin);
        this.d = this.rotate_point(d, this.transformOrigin);

        this.rotatedRect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };

        this.updateBoundaries();
    }

    updateBoundaries() {
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
            ctx.strokeStyle = "black";
            ctx.fillStyle = "transparent";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.yRect(this.rotatedRect);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            ctx.strokeStyle = "blue";
            ctx.fillStyle = "transparent";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.yRect(this.boundary);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            ctx.strokeStyle = "green";
            ctx.fillStyle = "transparent";
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.yRect(this.rect);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        ctx.lineJoin = 'miter';
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.lineColor;
        ctx.lineWidth = this.lineWidth;
    }
}

export {
    Sprite
}
