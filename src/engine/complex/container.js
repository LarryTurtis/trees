import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';

class Container extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Container";
        this.opacity = 0.2;

        this._liquid = {};
        this._containerShape = {};

        this._full = false;
        this._empty = false;

        this._liquidColor = "transparent";
    }

    set color(color) {
        super.color = trees.setOpacity(color, this.opacity);
    }

    get color() {
        return super.color
    }

    get liquid() {
        return this._liquid;
    }

    set liquid(liquid) {
        this._liquid = liquid;
    }

    get full() {
        return this._full;
    }

    set full(full) {
        this._full = full;
    }

    get empty() {
        return this._empty;
    }

    set empty(empty) {
        this._empty = empty;
    }

    get liquidColor() {
        return this._liquidColor;
    }

    set liquidColor(liquidColor) {
        this._liquid.color = liquidColor;
        this._liquidColor = liquidColor;
    }

    get containerShape() {
        return this._containerShape;
    }

    set containerShape(containerShape) {
        this._containerShape = containerShape;
    }

    fill(amount) {

        if (this.liquid.height <= 0) {
            this.empty = true;
        }

        if (this.liquid.height >= this.height) {
            this.full = true;
        }

    }


    animate() {
        // if (!this.collidingWithPlatform) this.fall();
    }

}

export { Container }