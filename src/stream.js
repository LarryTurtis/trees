import { Point } from './point.js'
import { Sprite } from './sprite.js'
import { Curve } from './curve.js'

class Stream extends Sprite {
    constructor(centerX, centerY, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(centerX, centerY, width, height);
        this.gravity = 0;

        let x = centerX - (width / 2);
        let y = centerY - (height / 2);

        let cp1 = new Point(x, y);
        let cp2 = new Point(x + width, y);
        let end = new Point(x + width, y);

        this._curve = new Curve(cp1, cp2, end);
    }

    applyGravity() {
        this.height += this.gravity;
        this.curve.end.y = this.height;
        this.width += this.size;
        this.curve.end.x = this.width;
        this.curve.cp2.x = this.width;
        if (this.curve.end.y > 782) {
            this.hitBottom = true;
        }
    }

    get curve() {
        return this._curve;
    }

    draw(ctx) {
        super.draw(ctx);
        this.applyGravity();
        ctx.yMove(this.a)
        ctx.beginPath();
        ctx.curve(this.curve);
        ctx.stroke();
        //ctx.closePath();

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.rect(this.curve.cp1.x, this.curve.cp1.y, 10, 10);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.rect(this.curve.cp2.x, this.curve.cp2.y, 10, 10);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();
        ctx.fillStyle = "yellow";
        ctx.rect(this.curve.end.x, this.curve.end.y, 10, 10);
        ctx.fill();
        ctx.closePath();

    }

}

export { Stream }
