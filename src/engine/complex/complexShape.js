import { Sprite } from '../sprite.js'

class ComplexShape extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "ComplexShape";
        this._shape = [];
    }

    addShape(shape) {
        shape.color = this.color;
        shape.transformOrigin = this.transformOrigin;
        shape.updatePoints();
        this.shape.push(shape);
    }

    get shape() {
        return this._shape;
    }

    set shape(shape) {
        this._shape = shape;
    }

    get color() {
        return super.color;
    }

    set color(color) {
        super.color = color;
        this.shape.forEach(shape => {
            shape.color = color;
        })
    }

    get transformOrigin() {
        return super.transformOrigin;
    }

    set transformOrigin(transformOrigin) {
        super.transformOrigin = transformOrigin;
        this.shape && this.shape.length && this.shape.forEach(shape => {
            shape.transformOrigin = transformOrigin;
            shape.updatePoints();
        })
    }

    get angle() {
        return super.angle;
    }

    set angle(angle) {
        super.angle = angle;
        this.shape && this.shape.length && this.shape.forEach(shape => {
            shape.angle = shape.relativeAngle + angle;
        })
    }

    //merge all SAT objects into a single array.
    createSATObject() {
        let response = [];
        this.shape.forEach(shape => {
            response = response.concat(shape.createSATObject());
        });
        return response;
    }

}

export { ComplexShape }
