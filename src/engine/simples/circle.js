import { Sprite } from '../sprite.js';

class Circle extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Circle";
        this._radius = width / 2;
        this.startAngle = 0;
        this.endAngle = 2;
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

    get startAngle() {
        return this._startAngle;
    }

    set startAngle(startAngle) {
        this._startAngle = startAngle * Math.PI;
        //this.radius = height/2;
    }

    get endAngle() {
        return this._endAngle;
    }

    set endAngle(endAngle) {
        this._endAngle = endAngle * Math.PI;
        //this.radius = height/2;
    }

    createSATObject() {
        return [new SAT.Circle(new SAT.Vector(this.center.x, this.center.y), this.width / 2)];
    }

    draw(ctx) {
        ctx = ctx || this.canvas && this.canvas.ctx;

        super.draw(ctx);

        ctx.beginPath();

        ctx.arc(this.center.x, this.center.y, this.radius, this.startAngle, this.endAngle)

        if (!this.pathOnly) ctx.fill();
        if (!this.pathOnly && this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Circle }