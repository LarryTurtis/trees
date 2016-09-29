import { complex } from '../complex.js';
import { ThickShape } from './thickShape.js';

class Donut extends ThickShape {
    constructor(x, y, width, height, thickness) {
        super(x, y, width, height, thickness);
        this.type = "Donut";

        let top = new complex.Arch(x, y, width, height / 2, thickness);
        let bottom = new complex.Arch(x, y + height / 2, width, height / 2, thickness);
        bottom.rotate(180, bottom.center);
        this.addShape(top);
        this.addShape(bottom);

    }

    rotate() {
        
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
