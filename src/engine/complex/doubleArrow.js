import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class DoubleArrow extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "DoubleArrow";

        let arrow1 = new complex.Arrow(x, y, width, height, this.angle + 180, true);
        let arrow2 = new complex.Arrow(x, y, width, height, this.angle, true);
        arrow1.relativeAngle = this.angle + 180;
        arrow2.relativeAngle = this.angle;
        this.addShape(arrow1);
        this.addShape(arrow2);
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        this.angle++;
        this.shape.forEach(shape => {
            shape.draw(ctx);
        });
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

    }

}

export { DoubleArrow }