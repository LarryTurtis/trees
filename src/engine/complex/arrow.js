import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Arrow extends ComplexShape {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Arrow";
        this.isComponent = isComponent;

        let rectangle = new simples.Rectangle(x, y + height / 4, width / 2, height / 2, 0, true);
        let triangle = new simples.Triangle(x + width / 4, y + height / 4, width, height / 2, 90, true);
        this.addShape(rectangle);
        this.addShape(triangle);

        rectangle.rotate(this.angle, this.transformOrigin);
        triangle.rotate(this.angle, this.transformOrigin);
    }

    draw(ctx) {
        super.draw(ctx);

        if (!this.isComponent) ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        if (!this.isComponent) {
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

    }

}

export { Arrow }
