import { Sprite } from '../sprite.js';
import { Point } from '../point.js';

class Polygon extends Sprite {
    constructor(x, y, width, height, angle, sides) {
        super(x, y, width, height, angle);
        this.type = "Polygon";
        this._sides = sides;
        this._points = [];
        this._radius = this.width / 2;
        this.updatePolygon();
    }

    get sides() {
        return this._sides;
    }

    set sides(sides) {
        this._sides = sides;
        this.updatePolygon();
    }

    get points() {
        return this._points;
    }

    set points(points) {
        this._points = points;
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        this._radius = radius;
    }

    get width() {
        return super.width
    }

    set width(width) {
        super.width = width;
        this._radius = width / 2;
        this.updatePolygon();
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.points = this.points.map(point => {
            return this.rotate_point(point, transformOrigin, deg);
        })
    }

    updatePoints() {
        let oldOrigin = this.origin;
        super.updatePoints();
        if (!this.points) this.updatePolygon();

        let xDiff = this.origin.x - oldOrigin.x;
        let yDiff = this.origin.y - oldOrigin.y;

        this.points = this.points.map(point => {
            return new Point(point.x + xDiff, point.y + yDiff);
        });
    }

    updatePolygon() {
        this._points = [];

        let startingPoint = this.getPointOnLine(this.a, this.width / 2, this.getAngle(this.a, this.b));
        let a = Math.acos((startingPoint.x - this.center.x) / this.radius);

        for (let i = 0; i < this.sides; i++) {
            let x = this.center.x + this.radius * Math.cos(a + 2 * Math.PI * i / this.sides);
            let y = this.center.y + this.radius * Math.sin(a + 2 * Math.PI * i / this.sides);
            this._points[i] = new Point(x, y);
        }

    }

    createSATObject() {

        return [new SAT.Polygon(new SAT.Vector(this.x, this.y), [
            new SAT.Vector(this.a.x - this.x, this.a.y - this.y),
            new SAT.Vector(this.b.x - this.x, this.b.y - this.y),
            new SAT.Vector(this.c.x - this.x, this.c.y - this.y),
            new SAT.Vector(this.d.x - this.x, this.d.y - this.y)
        ])];
    }

    draw(ctx) {
        super.draw(ctx);
        let rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };

        if (this.points.length) {
            ctx.beginPath();
            ctx.yMove(this.points[0]);

            this.points.forEach((point, index) => {
                ctx.yLine(point);
            })
            ctx.yLine(this.points[0]);

            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }
    }

}

export { Polygon }
