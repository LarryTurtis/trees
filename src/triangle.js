import {Sprite} from './sprite.js'

class Triangle extends Sprite {
    constructor(x, y, size) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, size);
        this.color = "red";
    }

    draw(ctx) {
        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y + this.h)
        ctx.lineTo(this.x + this.w / 2, this.y)
        ctx.lineTo(this.x + this.w, this.y + this.h)
        ctx.lineTo(this.x, this.y + this.h)
        ctx.fill();
        ctx.closePath();
        super.draw(ctx);
    }

}

export {Triangle}