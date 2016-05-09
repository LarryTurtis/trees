import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Tree extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Tree";

        let rectangle = new simples.Rectangle(this.center.x - this.width / 8, y + height / 4, this.width / 4, this.height * 0.75, 0);
        let triangle1 = new simples.Triangle(x, y + height / 2, width, height / 4, 0);
        let triangle2 = new simples.Triangle(x, y + height / 4, width, height / 4, 0);
        let triangle3 = new simples.Triangle(x, y, width, height / 4, 0);

        this.addShape(triangle1);
        this.addShape(triangle2);
        this.addShape(triangle3);
        this.addShape(rectangle);
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.fill();
        ctx.stroke();
        ctx.closePath();

    }

}

export { Tree }