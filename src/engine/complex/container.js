import { ComplexShape } from './complexShape.js';
import { complex } from './complex.js';

class Container extends ComplexShape {
    constructor(x, y, width, height, angle, shape) {
        super(x, y, width, height, angle);
        this.type = "Container";
        this.opacity = 0.2;
        this._liquid = null;
        this._liquidColor = "transparent";
        this._containerShape = new shape(x, y, width, height, angle);
        this.addShape(this._containerShape);
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

    fill(percentage) {
        let height = this.height * percentage;
        let y = this.y + this.height - height;

        let baseTriangleWidth = this.containerShape.b1 - this.containerShape.b2;
        let width = baseTriangleWidth * percentage + this.containerShape.b2;

        let x = this.x + ((this.width - width) / 2);

        if (!this.liquid) {
            this.liquid = new complex.Liquid(x, y, width, height, this.angle, this.containerShape.constructor);
            this.addShape(this.liquid);
            this.liquid.color = this.liquidColor;
        } else {
            this.liquid.x = x;
            this.liquid.y = y;
            this.liquid.width = width;
            this.liquid.height = height;
        }

        this.liquid.shape[0].bottomLeft = this.containerShape.bottomLeft;
        this.liquid.shape[0].bottomRight = this.containerShape.bottomRight;

    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.liquid.draw(ctx);
        this.containerShape.draw(ctx);

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();

    }


}

export { Container }
