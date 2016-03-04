import { Sprite } from './sprite.js'
import { Curve } from './curve.js'

class Spurt extends Sprite {
    constructor(centerX, centerY, width, height, spurtWidth) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(centerX, centerY, width, height);
        this.gravity = 0;
        this.spurtWidth = spurtWidth;
        this.right = new Curve([this.x, this.y], [this.x, this.y + this.h], [this.x - this.w, this.y + this.h]);
        this.left = new Curve([this.x + this.SpurtWidth + this.w, this.y + this.h], [this.x + this.spurtWidth, this.y + this.h], [this.x + this.spurtWidth, this.y])
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.moveTo(this.x, this.y)
        ctx.beginPath();
        ctx.curve(this.right);
        //ctx.lineTo(this.left.cp1.x, this.left.cp1.y)
        //ctx.curve(this.left);
        //ctx.lineTo(this.right.cp1.x, this.right.cp1.y)
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }

}

export { Spurt }
