import { Sprite } from '../sprite.js'
import { Point } from '../point.js'

class Triangle extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Triangle";
        this.ta = new Point(this.d.x, this.d.y);
        this.tb = new Point(this.c.x, this.c.y);
        this.tc = trees.getPointOnLine(this.a, this.width / 2, trees.getAngle(this.a, this.b));
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.ta = trees.rotatePoint(this.ta, transformOrigin, deg);
        this.tb = trees.rotatePoint(this.tb, transformOrigin, deg);
        this.tc = trees.rotatePoint(this.tc, transformOrigin, deg);
    }

    get width() {
        return super.width;
    }

    set width(width) {
        super.width = width;
        this.tb = new Point(this.c.x, this.c.y);
        this.tc = trees.getPointOnLine(this.a, trees.getDistance(this.a, this.b) / 2, trees.getAngle(this.a, this.b));
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        this.ta = new Point(this.d.x, this.d.y);
        this.tb = new Point(this.c.x, this.c.y);
    }

    _updatePoints() {
        let oldOrigin = this.origin;
        super._updatePoints();

        let xDiff = this.origin.x - oldOrigin.x;
        let yDiff = this.origin.y - oldOrigin.y;
        if (!this.ta) {
            this.ta = new Point(this.d.x, this.d.y);
            this.tb = new Point(this.c.x, this.c.y);
            this.tc = trees.getPointOnLine(this.a, this.width / 2, trees.getAngle(this.a, this.b));
        }
        this.ta = new Point(this.ta.x + xDiff, this.ta.y + yDiff);
        this.tb = new Point(this.tb.x + xDiff, this.tb.y + yDiff);
        this.tc = new Point(this.tc.x + xDiff, this.tc.y + yDiff);

    }

    createSATObject() {
        return [new SAT.Polygon(new SAT.Vector(this.x, this.y), [
            new SAT.Vector(this.ta.x - this.x, this.ta.y - this.y),
            new SAT.Vector(this.tc.x - this.x, this.tc.y - this.y),
            new SAT.Vector(this.tb.x - this.x, this.tb.y - this.y),
        ])];
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.moveTo(this.ta.x, this.ta.y)
        ctx.lineTo(this.tb.x, this.tb.y)
        ctx.lineTo(this.tc.x, this.tc.y)
        ctx.lineTo(this.ta.x, this.ta.y)
        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Triangle }