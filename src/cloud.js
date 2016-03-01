import { Sprite } from './sprite.js'


class Cloud extends Sprite {
    constructor(centerX, centerY, size) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(centerX, centerY, size);
    }

    draw(ctx) {

        ctx.lineWidth = this.lineWidth;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.bezierCurveTo(this.x + 10, this.x + 20, this.x + 200, this.x + 100,this.x,this.y);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
        super.draw(ctx);
    }

}

export { Cloud }


