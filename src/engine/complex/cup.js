import { simples } from '../simples/simples.js';
import { Point } from '../point.js';
import { Container } from './container.js';
import { complex } from './complex.js';

class Cup extends Container {
    constructor(x, y, width, height, angle, taper) {
        super(x, y, width, height, angle);
        this.type = "Cup";
        this.taper = taper;
        let shape = new simples.Trapezoid(x, y, width, height, angle, taper, taper);
        this.containerShape = shape;
        this.addShape(shape);

    }

    fill(amount) {

        super.fill(amount);

        if (!this.liquid.x) {
            let liquid = new simples.Trapezoid(this.x, this.y, this.width, this.height, this.angle, this.taper, this.taper);
            this.liquid = liquid;
            liquid.color = this.liquidColor;
            this.addShape(liquid);
        }

        this.liquid.trimTop(amount);


    }

    draw(ctx) {
        super.draw(ctx);
        this.shape.forEach(shape => {
            shape.draw(ctx);
        });
    }

}

export { Cup }
