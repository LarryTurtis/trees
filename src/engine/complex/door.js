import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';
let i = 0;
let circle, rectangle;

class Door extends ComplexShape {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Door";
        this.isComponent = isComponent;

        circle = new simples.Circle(x, y, width, height / 4, 0, true);
        rectangle = new simples.Rectangle(x, y + circle.height / 2, width, height * 0.75, 0, true);
        this.addShape(circle);
        this.addShape(rectangle);
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        rectangle.y = circle.y + circle.height / 2;
    }

    animate() {
        if (i < 300 || i > 600) {
            this.rotate(1, this.center);
            this.width++
            this.height++
        } else {
            this.width--
            this.height--
            this.x--;
        }
        i++;
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

export { Door }
