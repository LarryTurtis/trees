import { Sprite } from './sprite.js'

class Platform extends Sprite {
    constructor(centerX, centerY, width, height) {
        super(centerX, centerY, width, height);
        this.type = "Platform";
        this.lineColor = "black";
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.yLine(this.a,this.b);
        ctx.closePath();
        ctx.stroke();
    }

}

export { Platform }
