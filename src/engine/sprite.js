import { Point } from './point.js'
import { scroll } from './animations/scroll.js'

function randomColor() {
    return '#' + Math.floor(Math.random() * 16777215).toString(16);
}

class Sprite {
    constructor(x, y, width, height, angle) {
        this._width = width;
        this._height = height;
        this._x = x + scroll().x;
        this._y = y + scroll().y;
        this._angle = angle || 0;
        this._origin = new Point(this.x, this.y);
        this._a = new Point(this.x, this.y);
        this._b = new Point(this.x + this.width, this.y);
        this._c = new Point(this.x + this.width, this.y + this.height);
        this._d = new Point(this.x, this.y + this.height);
        this._boundary = {};
        this._center = new Point(this.x + (this.width / 2), this.y + (this.height / 2));
        this.updatePoints();
        this.rotate(this.angle, this.center);
        this._lineWidth = 1;
        this._showBoundingBox = false;
        this._color = "transparent" //randomColor();
        this._lineColor = null;
        this._id = null;
        this._collidingWith = null;
        this._collidable = true;
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
        let oldWidth = this.width;
        this._width = width;
        let widthDiff = this.width - oldWidth;

        let angle = this.getAngle(this.a, this.b);
        this.b = this.getPointOnLine(this.b, widthDiff, angle);
        this.c = this.getPointOnLine(this.c, widthDiff, angle);

        this.rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };

        this.center = this.getPointOnLine(this.a, this.distance(this.a, this.c) / 2, this.getAngle(this.a, this.c));
        this.updateBoundaries();

    }

    set height(height) {
        let oldHeight = this.height;
        this._height = height;
        let heightDiff = this.height - oldHeight;
        let angle = this.getAngle(this.a, this.d);

        this.c = this.getPointOnLine(this.c, heightDiff, angle);
        this.d = this.getPointOnLine(this.d, heightDiff, angle);

        this.rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };

        this.center = this.getPointOnLine(this.a, this.distance(this.a, this.c) / 2, this.getAngle(this.a, this.c));
        this.updateBoundaries();
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

    get angle() {
        return this._angle;
    }

    set angle(angle) {
        this._angle = angle;
    }

    rotate(deg, transformOrigin) {

        this._origin = this.rotate_point(this.origin, transformOrigin, deg);
        this._x = this.origin.x;
        this._y = this.origin.y;
        this.a = this.rotate_point(this.a, transformOrigin, deg);
        this.b = this.rotate_point(this.b, transformOrigin, deg);
        this.c = this.rotate_point(this.c, transformOrigin, deg);
        this.d = this.rotate_point(this.d, transformOrigin, deg);
        this.center = this.rotate_point(this.center, transformOrigin, deg);

        this.rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };

        this.updateBoundaries();
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

    distance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }

    getAngle(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }

    getPointOnLine(firstPoint, width, angle) {
        let secondPointX = firstPoint.x + width * Math.cos(angle * Math.PI / 180);
        let secondPointY = firstPoint.y + width * Math.sin(angle * Math.PI / 180);
        return new Point(secondPointX, secondPointY);
    }

    rotate_point(point, origin, deg) {
        let angle = deg * Math.PI / 180.0;
        let x = Math.cos(angle) * (point.x - origin.x) - Math.sin(angle) * (point.y - origin.y) + origin.x;
        let y = Math.sin(angle) * (point.x - origin.x) + Math.cos(angle) * (point.y - origin.y) + origin.y;
        return new Point(x, y);
    }

    updatePoints() {

        let oldOrigin = this.origin;
        this.origin = new Point(this.x, this.y);
        let xDiff = this.origin.x - oldOrigin.x;
        let yDiff = this.origin.y - oldOrigin.y;

        this.center = new Point(this.center.x + xDiff, this.center.y + yDiff);

        this.a = new Point(this.a.x + xDiff, this.a.y + yDiff);
        this.b = new Point(this.b.x + xDiff, this.b.y + yDiff);
        this.c = new Point(this.c.x + xDiff, this.c.y + yDiff);
        this.d = new Point(this.d.x + xDiff, this.d.y + yDiff);

        this.rect = {
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
            ctx.yRect(this.rect);
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
