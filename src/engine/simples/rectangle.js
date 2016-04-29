import { Sprite } from '../sprite.js'

class Rectangle extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Rectangle";
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
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}

export { Rectangle }
