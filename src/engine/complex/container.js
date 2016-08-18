import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';

class Container extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Container";
        this.opacity = 0.2;

        this._liquid = {};
        this._containerShape = {};

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

    animate() {
        // if (!this.collidingWithPlatform) this.fall();
    }

}

export { Container }
