import { Sprite } from '../sprite.js'
import { Point } from '../point.js'

class Triangle extends Sprite {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Triangle";
        this.isComponent = isComponent;
    }

    createSATObject() {
        return [new SAT.Polygon(new SAT.Vector(0, 0), [
            new SAT.Vector(this.a.x, this.a.y),
            new SAT.Vector(this.b.x, this.b.y),
            new SAT.Vector(this.c.x, this.c.y),
        ])];
    }

    draw(ctx) {
        super.draw(ctx);

        let a = new Point(this.c.x, this.c.y);
        let b = this.getPointOnLine(this.a, this.width / 2, this.angle);
        let c = new Point(this.d.x, this.d.y);

        if (!this.isComponent) ctx.beginPath();
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.lineTo(a.x, a.y)
        ctx.fill();
        if (!this.isComponent) {
            ctx.stroke();
            ctx.closePath();
        }

    }

}

export { Triangle }
