import { Sprite } from '../sprite.js'

class ComplexShape extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "ComplexShape";
        this._shape = [];
    }

    addShape(shape) {
        //shape.color = this.color;
        shape.rotate(this.angle, this.center);
        shape.relativeX = (shape.x - this.x) / this.width;
        shape.relativeY = (shape.y - this.y) / this.height;
        shape.relativeWidth = shape.width / this.width;
        shape.relativeHeight = shape.height / this.height;
        this.shape.push(shape);
    }

    removeShape(shape) {
        this.shape.splice(this.shape.indexOf(shape), 1);
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

    get lineColor() {
        return super.lineColor;
    }

    set lineColor(lineColor) {
        super.lineColor = lineColor;
        this.shape.forEach(shape => {
            shape.lineColor = lineColor;
        })
    }

    get collidable() {
        return super.collidable;
    }

    set collidable(collidable) {
        super.collidable = collidable;
        this.shape.forEach(shape => {
            shape.collidable = collidable;
        })
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.shape && this.shape.forEach(shape => {
            shape.rotate(deg, transformOrigin);
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
            shape.x += diffX;
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
            shape.y += diffY;
        })
    }

    get width() {
        return super.width;
    }

    set width(width) {
        let oldwidth = this.width;
        let diffwidth = width - oldwidth;
        super.width = width;
        this.shape.forEach(shape => {
            shape.width = width * shape.relativeWidth;
            shape.x = shape.x + (diffwidth * shape.relativeX);
        })
    }

    get height() {
        return super.height;
    }

    set height(height) {
        let oldheight = this.height;
        let diffheight = height - oldheight;
        super.height = height;
        this.shape.forEach(shape => {
            shape.height = height * shape.relativeHeight;
            shape.y = shape.y + (diffheight * shape.relativeY);
        })
    }

    get angle() {
        return super.angle;
    }

    set angle(angle) {
        let oldAngle = this.angle;
        let diffAngle = angle - this.angle;
        super.angle = angle;
        this.shape && this.shape.length && this.shape.forEach(shape => {
            shape.angle += diffAngle;
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

    wasClicked(mouseX, mouseY) {
        let clicked = false;
        this.shape.forEach(shape => {
            clicked = clicked || shape.wasClicked(mouseX, mouseY);
        });
        return clicked;
    }

}

export { ComplexShape }
