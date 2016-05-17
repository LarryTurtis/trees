import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

//basically same rules as clouds.
class Gear extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Gear";
    }

    draw(ctx) {
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

export { Gear }
