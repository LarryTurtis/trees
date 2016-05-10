import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Door extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Door";

        let circle = new simples.Circle(x, y, width, width, 0);
        let rectangle = new simples.Rectangle(x, y + (width / 2), width, height - width / 2, 0);
        this.addShape(circle);
        this.addShape(rectangle);
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

export { Door }