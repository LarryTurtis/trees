import { simples } from '../simples/simples.js';
import { CircularShape } from './circularShape.js';

class Circle extends CircularShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Circle";

        this.topRight = new simples.Wedge(x + width / 2, y, width / 2, height / 2);
        this.topLeft = new simples.Wedge(x, y, width / 2, height / 2, 270);
        this.topLeft.rotate(270, this.topLeft.center);
        this.bottomRight = new simples.Wedge(x + width / 2, y + height / 2, width / 2, height / 2, 90);
        this.bottomRight.rotate(90, this.bottomRight.center);
        this.bottomLeft = new simples.Wedge(x, y + height / 2, width / 2, height / 2, 180);
        this.bottomLeft.rotate(180, this.bottomLeft.center);


        this.addShape(this.topRight);
        this.addShape(this.topLeft);
        this.addShape(this.bottomRight);
        this.addShape(this.bottomLeft);

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

export { Circle }
