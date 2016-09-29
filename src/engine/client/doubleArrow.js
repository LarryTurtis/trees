import { complex } from '../complex/complex.js';
import { simples } from '../simples/simples.js';
import { ComplexShape } from '../complex/complexShape.js';

class DoubleArrow extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "DoubleArrow";

        let arrow1 = new complex.Arrow(x, y, width / 2, height / 2, 0);
        let arrow2 = new complex.Arrow(x + width / 2, y, width / 2, height / 2, 180);
        let nonagon = new simples.Polygon(x, y+height/2, width /2, height/2, 0, 9)
        this.addShape(arrow1);
        this.addShape(arrow2);
        this.addShape(nonagon);
    }

    draw(ctx) {
        this.rotate(1, this.center)
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

export { DoubleArrow }
