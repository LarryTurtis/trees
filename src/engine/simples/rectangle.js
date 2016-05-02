import { Sprite } from '../sprite.js'

class Rectangle extends Sprite {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Rectangle";
        this.isComponent = isComponent;
    }

    createSATObject() {
        return [new SAT.Polygon(new SAT.Vector(0, 0), [
            new SAT.Vector(this.d.x, this.d.y),
            new SAT.Vector(this.c.x, this.c.y),
            new SAT.Vector(this.b.x, this.b.y),
            new SAT.Vector(this.a.x, this.a.y)
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

        if (!this.isComponent) ctx.beginPath();
        ctx.yMove(this.a);
        ctx.yRect(rect);
        ctx.fill();
        if (!this.isComponent) {
            ctx.stroke();
            ctx.closePath();
        }
    }

}

export { Rectangle }
