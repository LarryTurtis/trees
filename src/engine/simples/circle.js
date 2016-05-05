import { Sprite } from '../sprite.js';

class Circle extends Sprite {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Circle";
        this.isComponent = isComponent;
        this._radius = Math.min(width, height) / 2;
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
        this.radius = Math.min(this.width, this.height) / 2;
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        this.radius = Math.min(this.width, this.height) / 2;
    }


    createSATObject() {
        return [new SAT.Circle(new SAT.Vector(this.center.x, this.center.y), this.width / 2)];
    }

    draw(ctx) {
        super.draw(ctx);

        if (!this.isComponent) ctx.beginPath();

        ctx.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI)

        ctx.fill();
        if (!this.isComponent) {
            ctx.stroke();
            ctx.closePath();
        }
    }

}

export { Circle }
