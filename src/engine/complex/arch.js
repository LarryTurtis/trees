import { complex } from './complex.js';
import { ThickShape } from './thickShape.js';

class Arch extends ThickShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle, thickness);
        this.type = "Arch";

        let right = new complex.Macaroni(x + width / 2, y, width / 2, height, 0, thickness);
        let left = new complex.Macaroni(x, y, width / 2, height, 270, thickness);
        this.addShape(right);
        this.addShape(left);
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.closePath();
    }

}

export { Arch }
