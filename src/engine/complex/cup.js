import { simples } from '../simples/simples.js';
import { Point } from '../point.js';
import { Container } from './container.js';
import { complex } from './complex.js';

class Cup extends Container {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Cup";

        let shape = new complex.CupShape(x, y, width, height, angle);
        this.containerShape = shape;
        this.addShape(shape);

    }

    fill(percentage) {

        let height = this.height * percentage;
        let y = this.y + this.height - height;

        let baseTriangleWidth = this.containerShape.b1 - this.containerShape.b2;
        let width = baseTriangleWidth * percentage + this.containerShape.b2;

        let x = this.x + ((this.width - width) / 2);

        if (!this.liquid.x) {
            let liquid = new complex.CupShape(x, y, width, height);
            this.liquid = liquid;
            liquid.color = this.liquidColor;
            this.addShape(liquid);
        }

        this.liquid.x = x;
        this.liquid.y = y;
        this.liquid.width = width;
        this.liquid.height = height;

        this.liquid.bottomLeft = this.containerShape.bottomLeft;
        this.liquid.bottomRight = this.containerShape.bottomRight;

    }

    draw(ctx) {
        super.draw(ctx);
        this.shape.forEach(shape => {
            shape.draw(ctx);
        });
    }

}

export { Cup }
