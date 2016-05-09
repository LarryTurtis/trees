import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';
import { fall } from '../animations/fall.js';
import { slide } from '../animations/slide.js';

class Box extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Box";
        let rectangle = new simples.Rectangle(x, y, width, height, angle);
        this.fall = fall;
        this.slide = slide;
        this.ySpeed = 1;
        this.xSpeed = 1;
        this.addShape(rectangle);
    }

    animate() {
       if (!this.collidingWithPlatform) this.fall();
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

export { Box }