import {
    Sprite
}
from './sprite.js'
import {
    Curve
}
from './curve.js'

class Spurt extends Sprite {
    constructor(centerX, centerY, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(centerX, centerY, width, height);

        this.right = new Curve(this.a, this.b, this.c);
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.yMove(this.d)
        ctx.curve(this.right);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

    }

}

export {
    Spurt
}
