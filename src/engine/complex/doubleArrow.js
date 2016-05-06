import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class DoubleArrow extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "DoubleArrow";

        let arrow1 = new complex.Arrow(x, y, width / 2, height / 2, 0);
        let arrow2 = new complex.Arrow(x + width / 2, y, width / 2, height / 2, 180);
        this.addShape(arrow1);
        this.addShape(arrow2);
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

export { DoubleArrow }
