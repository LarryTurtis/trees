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


    updatePoints() {
        super.updatePoints();
        this.ta = new Point(this.d.x, this.d.y);
        this.tb = new Point(this.c.x, this.c.y);
        this.tc = this.getPointOnLine(this.a, this.width / 2, this.angle);
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
