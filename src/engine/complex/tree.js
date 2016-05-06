import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Tree extends ComplexShape {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Tree";
        this.isComponent = isComponent;

        let rectangle = new simples.Rectangle(this.center.x - this.width / 8, y + height / 4, this.width / 4, this.height * 0.75, 0, true);
        let triangle1 = new simples.Triangle(x, y + height / 2, width, height / 4, 0, true);
        let triangle2 = new simples.Triangle(x, y + height / 4, width, height / 4, 0, true);
        let triangle3 = new simples.Triangle(x, y, width, height / 4, 0, true);

        this.addShape(rectangle);
        this.addShape(triangle1);
        this.addShape(triangle2);
        this.addShape(triangle3);
    }

    animate() {
        this.width++;
        this.height++;
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

export { Tree }
