import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

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
        this.height++;
        this.x++;
        this.y++;
        this.width++;
        //this.rotate(1, this.transformOrigin);
    }

    draw(ctx) {
        super.draw(ctx);

        if (!this.isComponent) ctx.beginPath();
        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        if (!this.isComponent) {
            ctx.fill();
            //ctx.stroke();
            ctx.closePath();
        }
    }

}

export { Door }
