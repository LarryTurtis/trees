import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class Arch extends ComplexShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle, thickness);
        this.type = "Arch";

        this._radius = this.width / 2;

        let right = new complex.Macaroni(x + width / 2, y, width / 2, height, 0, thickness);
        let left = new complex.Macaroni(x, y, width / 2, height, 270, thickness);
        this.addShape(right);
        this.addShape(left);
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

export { Arch }
