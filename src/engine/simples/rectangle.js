import { Sprite } from '../sprite.js'

class Rectangle extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Rectangle";
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

        ctx.beginPath();
        ctx.yMove(this.a);
        ctx.yRect(rect);
        if (!this.pathOnly) ctx.fill();
        if (!this.pathOnly && this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Rectangle }