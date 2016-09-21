import { complex } from './complex.js';
import { ThickShape } from './thickShape.js';

class Donut extends ThickShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle, thickness);
        this.type = "Donut";

        let top = new complex.Arch(x, y, width, height / 2, 0, thickness);
        let bottom = new complex.Arch(x, y + height / 2, width, height / 2, 180, thickness);
        bottom.rotate(180, bottom.center);
        this.addShape(top);
        this.addShape(bottom);

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

export { Donut }
