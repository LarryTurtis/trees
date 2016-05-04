import { Sprite } from '../sprite.js'
import { Point } from '../point.js'

class Triangle extends Sprite {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Triangle";
        this.isComponent = isComponent;
        this.ta = new Point(this.d.x, this.d.y);
        this.tb = new Point(this.c.x, this.c.y);
        this.tc = this.getPointOnLine(this.a, this.width / 2, this.angle);
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.ta = this.rotate_point(this.ta, transformOrigin, deg);
        this.tb = this.rotate_point(this.tb, transformOrigin, deg);
        this.tc = this.rotate_point(this.tc, transformOrigin, deg);
    }

    updatePoints() {
        let oldOrigin = this.origin;
        super.updatePoints();

        let xDiff = this.origin.x - oldOrigin.x;
        let yDiff = this.origin.y - oldOrigin.y;
        if (!this.ta) {
            this.ta = new Point(this.d.x, this.d.y);
            this.tb = new Point(this.c.x, this.c.y);
            this.tc = this.getPointOnLine(this.a, this.width / 2, this.angle);
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
        if (!this.isComponent) ctx.beginPath();
        ctx.moveTo(this.ta.x, this.ta.y)
        ctx.lineTo(this.tb.x, this.tb.y)
        ctx.lineTo(this.tc.x, this.tc.y)
        ctx.lineTo(this.ta.x, this.ta.y)
        if (!this.isComponent) {
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

    }

}

export { Triangle }
