import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Macaroni extends ComplexShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle);
        this.type = "Macaroni";

        this._radius = this.width / 2;

        this.outer = new simples.Wedge(x, y, width, height);
        this.inner = new simples.Wedge(x, y + thickness, width - thickness, height - thickness);

        this.addShape(this.inner);
        this.addShape(this.outer);
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        this._radius = radius;
    }

    get width() {
        return super.width;
    }

    set width(width) {
        super.width = width;
        this.radius = width / 2;
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        //this.radius = height/2;
    }

    createSATObject() {
        return [new SAT.Circle(new SAT.Vector(this.center.x, this.center.y), this.radius)];
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();
        ctx.yMove(this.origin);
        ctx.curve(this.outer.curve);
        ctx.yLine(this.inner.c);
        ctx.curve(this.inner.getReverseCurve());
        ctx.yLine(this.origin)
        ctx.closePath();
        ctx.fill();
        if (this.lineColor) ctx.stroke();
    }

}

export { Macaroni }
