import { Rectangle } from '../simples/Rectangle.js';
import { Circle } from './Circle.js';
import { ComplexShape } from './complexShape.js';

class RoundedRectangle extends ComplexShape {
    constructor(x, y, width, height, angle, borderRadius, corners) {
        super(x, y, width, height, angle);
        this.type = "RoundedRectangle";
        borderRadius = borderRadius || 1;

        this.addShape(new Rectangle(x + borderRadius / 2, y, width - borderRadius, height, 0));
        this.addShape(new Rectangle(x, y + borderRadius / 2, width, height - borderRadius, 0));

        if (corners > 0) {
            this.addShape(new Circle(x, y, borderRadius, borderRadius, 0));
        } else {
            this.addShape(new Rectangle(x, y, borderRadius / 2, borderRadius / 2, 0));
        }
        if (corners > 1) {
            this.addShape(new Circle(x + width - borderRadius, y, borderRadius, borderRadius, 0));
        } else {
            this.addShape(new Rectangle(x + width - borderRadius / 2, y, borderRadius / 2, borderRadius / 2, 0));
        }

        if (corners > 2) {
            this.addShape(new Circle(x, y + height - borderRadius, borderRadius, borderRadius, 0));
        } else {
            this.addShape(new Rectangle(x, y + height - borderRadius / 2, borderRadius / 2, borderRadius / 2, 0));
        }

        if (corners > 3) {
            this.addShape(new Circle(x + width - borderRadius, y + height - borderRadius, borderRadius, borderRadius, 0));
        } else {
            this.addShape(new Rectangle(x + width - borderRadius / 2, y + height - borderRadius / 2, borderRadius / 2, borderRadius / 2, 0));
        }

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

export { RoundedRectangle }
