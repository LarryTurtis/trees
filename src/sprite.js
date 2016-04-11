import { Point } from './point.js'

class Sprite {
    constructor(x, y, width, height, angle) {
        this._width = width;
        this._height = height;
        this._x = x;
        this._y = y;
        this._boundary = {};
        this._angle = angle || 0
        this.updatePoints(x, y);
        this._centerX = this.x + (this.width / 2);
        this._centerY = this.y + (this.height / 2);
        this._lineWidth = 1;
        this._showBoundingBox = true;
        this._color = "white";
        this._lineColor = "black";
        this._id = null;
        this._collidingWith = null;
    }

    set x(x) {
        this._x = x;
        this.updatePoints(this.x, this.y)
    }

    set y(y) {
        this._y = y;
        this.updatePoints(this.x, this.y)
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
    }

    set height(height) {
        this._height = height;
        this.updatePoints(this.x, this.y)
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

    updatePoints(x, y) {
        this.centerX = this.x + (this.width / 2);
        this.centerY = y + (this.height / 2);


        this.a = new Point(x, y);
        this.b = this.getPointOnLine(this.a, this.width, this.angle);
        this.c = this.getPointOnLine(this.b, this.height, this.angle + 90);
        this.d = this.getPointOnLine(this.c, -this.width, this.angle);

        this.rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };

        this.updateBoundaries(x, y);
    }

    updateBoundaries(x, y) {
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

        if (this._showBoundingBox) {
            ctx.strokeStyle = "black";
            ctx.fillStyle = "transparent";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.yRect(this.rect);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();

            ctx.strokeStyle = "blue";
            ctx.fillStyle = "transparent";
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.yRect(this.boundary);
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
