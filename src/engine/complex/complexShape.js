import { Sprite } from '../sprite.js'

class ComplexShape extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "ComplexShape";
        this._shape = [];
    }

    addShape(shape) {
        shape.color = this.color;
        shape.updatePoints();
        shape.transformOrigin = this.transformOrigin;
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

    get x() {
        return super.x;
    }

    set x(x) {
        let oldX = this.x;
        let diffX = x - oldX;
        super.x = x;
        this.shape.forEach(shape => {
            shape.transformOrigin = shape.center;
            shape.x += diffX;
            shape.transformOrigin = this.transformOrigin;
        })
    }

    get y() {
        return super.y;
    }

    set y(y) {
        let oldY = this.y;
        let diffY = y - oldY;
        super.y = y;
        this.shape.forEach(shape => {
            shape.transformOrigin = shape.center;
            shape.y += diffY;
            shape.transformOrigin = this.transformOrigin;
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
