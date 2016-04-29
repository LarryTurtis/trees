import { Sprite } from './sprite.js'
import { Point } from './point.js'

class Triangle extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Triangle";
    }

    draw(ctx) {
        super.draw(ctx);

        let a = new Point(this.x, this.y + this.height);
        let b = new Point(this.x + this.width / 2, this.y);
        let c = new Point(this.x + this.width, this.y + this.height);

        ctx.beginPath();
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.lineTo(a.x, a.y)
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}

export { Triangle }


