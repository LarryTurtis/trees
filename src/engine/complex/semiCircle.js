import { simples } from '../simples/simples.js';
import { CircularShape } from './circularShape.js';

class SemiCircle extends CircularShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "SemiCircle";
        
        this.right = new simples.Wedge(x + width / 2, y, width / 2, height);
        this.left = new simples.Wedge(x, y, width / 2, height, 270);
        this.left.rotate(270, this.left.center);
        this.addShape(this.left);
        this.addShape(this.right);
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();
        ctx.yMove(this.d);
        ctx.curve(this.left.curve);
        ctx.curve(this.right.curve);
        ctx.yLine(this.d);
        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { SemiCircle }
