import { Point } from './point.js'
import { Sprite } from './sprite.js'

class Marble extends Sprite {
    constructor(x, y, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height);
        this.type = "Marble";
        this.gravity = 1;
        this.size = 1;
    }

    applyGravity() {
        this.y += this.gravity;
        this.x += this.size;
    }

    draw(ctx) {

        var marble = this;
        super.draw(ctx);

        if (!this.hasCollisions) {
            marble.applyGravity();
        }

        let rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };

        ctx.beginPath();
        ctx.yRect(rect);
        ctx.stroke();
        ctx.closePath();
    }

}

export { Marble }
