import { Sprite } from '../sprite.js'

class Rectangle extends Sprite {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Rectangle";
        this.isComponent = isComponent;
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