import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Arrow extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Arrow";

        let rectangle = new simples.Rectangle(x, y, width / 2, height);
        let triangle = new simples.Triangle(x + width / 2, y, width / 2, height, angle);

        this.shape = {
            rectangle: rectangle,
            triangle: triangle
        };
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.shape.rectangle.draw(ctx);
        this.shape.triangle.draw(ctx);

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}

export { Arrow }


