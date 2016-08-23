import { Wedge } from '../simples/wedge.js';
import { ThickShape } from './thickShape.js';

class Macaroni extends ThickShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle, thickness);
        this.type = "Macaroni";

        this.outer = new Wedge(x, y, width, height);
        this.inner = new Wedge(x, y + thickness, width - thickness, height - thickness);
        this.addShape(this.inner);
        this.addShape(this.outer);
    }

    get width() {
        return super.width;
    }

    set width(width) {
        let oldWidth = this.width;
        super.width = width;
        let widthDiff = this.width - oldWidth;
        this.thickness = this.thickness + (widthDiff * this.relativeThickness);

        this.inner.y = trees.getPointOnLine(this.outer.origin, this.thickness, trees.getAngle(this.a, this.d)).y;
        this.inner.x = trees.getPointOnLine(this.outer.origin, this.thickness, trees.getAngle(this.a, this.d)).x;
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();
        ctx.yMove(this.a);
        ctx.curve(this.outer.curve);
        ctx.yLine(this.inner.c);
        ctx.curve(this.inner.getReverseCurve());
        ctx.yLine(this.a)
        ctx.closePath();
        ctx.fill();
        if (this.lineColor) ctx.stroke();
    }

}

export { Macaroni }
