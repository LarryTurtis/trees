import { Sprite } from './sprite.js'


class Triangle extends Sprite {
    constructor(centerX, centerY, size) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(centerX, centerY, size);
    }

    draw(ctx) {

        var a = {
            x: this.x,
            y: this.y + this.h
        };

        var b = {
            x: this.x + this.w / 2,
            y: this.y
        };

        var c = {
            x: this.x + this.w,
            y: this.y + this.h
        };

        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y)
        ctx.lineTo(b.x, b.y)
        ctx.lineTo(c.x, c.y)
        ctx.lineTo(a.x, a.y)
        ctx.fill();
        ctx.closePath();
        super.draw(ctx);
    }

}

export { Triangle }


