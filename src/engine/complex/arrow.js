import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Arrow extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Arrow";

        let rectangle = new simples.Rectangle(x, y + height / 4, width / 2, height / 2, 0);
        let triangle = new simples.Triangle(x + width / 4, y + height / 4, width, height / 2, 90);
        this.addShape(rectangle);
        this.addShape(triangle);
    }


    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();

    }

}

export { Arrow }