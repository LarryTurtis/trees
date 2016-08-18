import { ComplexShape } from './complexShape.js';

class Liquid extends ComplexShape {
    constructor(x, y, width, height, angle, Shape) {
        super(x, y, width, height, angle);
        this.type = "Liquid";
        let shape = new Shape(x, y, width, height, angle);
        this.addShape(shape);
    }


    animate() {
        // if (!this.collidingWithPlatform) this.fall();
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

export { Liquid }
