import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';
import { fall } from '../fall.js';
import { slide } from '../slide.js';
let i = 0;
class Arrow extends ComplexShape {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Arrow";
        this.isComponent = isComponent;

        let rectangle = new simples.Rectangle(x, y + height / 4, width / 2, height / 2, 0, true);
        let triangle = new simples.Triangle(x + width / 4, y + height / 4, width, height / 2, 90, true);
        this.addShape(rectangle);
        this.addShape(triangle);
        this.fall = fall;
        this.slide = slide;
        this.ySpeed = 1;
        this.xSpeed = 0;
    }

    animate() {
        if (i < 300) {
            this.width++;
            this.height++;
        } else {
            this.rotate(1, this.center)
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

export { Arrow }
