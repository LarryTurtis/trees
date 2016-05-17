import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class SemiCircle extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "SemiCircle";

        this._radius = this.width / 2;

        this.right = new simples.Wedge(x + width / 2, y, width / 2, height);
        this.left = new simples.Wedge(x, y, width / 2, height, 270);
        this.addShape(this.left);
        this.addShape(this.right);
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
