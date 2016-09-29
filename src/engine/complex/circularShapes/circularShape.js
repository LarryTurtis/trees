import { simples } from '../../simples/simples.js';
import { ComplexShape } from '../complexShape.js';

class CircularShape extends ComplexShape {
    constructor(x, y, width, height, thickness) {
        super(x, y, width, height);
        this.type = "CircularShape";
        this._radius = this.width / 2;
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

}

export { CircularShape }
