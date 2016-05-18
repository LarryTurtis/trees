import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Circle extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Circle";

        this._radius = this.width / 2;

        this.topRight = new simples.Wedge(x + width / 2, y, width / 2, height / 2, 0);
        this.topLeft = new simples.Wedge(x, y, width / 2, height / 2, 270);
        this.bottomRight = new simples.Wedge(x + width / 2, y + height / 2, width / 2, height / 2, 90);
        this.bottomLeft = new simples.Wedge(x, y + height / 2, width / 2, height / 2, 180);

        this.addShape(this.topRight);
        this.addShape(this.topLeft);
        this.addShape(this.bottomRight);
        this.addShape(this.bottomLeft);

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
        ctx.moveTo(this.topLeft.a.x, this.topLeft.a.y);
        ctx.curve(this.topLeft.curve);
        ctx.curve(this.topRight.curve);
        ctx.curve(this.bottomRight.curve);
        ctx.curve(this.bottomLeft.curve);
        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Circle }
