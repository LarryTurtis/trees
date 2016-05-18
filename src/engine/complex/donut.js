import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class Donut extends ComplexShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle);
        this.type = "Donut";

        this._radius = this.width / 2;

        let top = new complex.Arch(x, y, width, height / 2, 0, thickness);
        let bottom = new complex.Arch(x, y + height / 2, width, height / 2, 180, thickness);

        this.addShape(top);
        this.addShape(bottom);

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

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.closePath();
    }

}

export { Donut }
