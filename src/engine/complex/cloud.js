import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class Cloud extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Cloud";

        let maxSize = this.width / 2;
        let previousCircle;
        let circleX;
        let moreCircles = true;


        while (moreCircles) {

            //the x of the circle should overlap the right edge of the previous circle by 25%
            circleX = previousCircle ? previousCircle.b.x - previousCircle.width / 4 : this.x;

            //the max size of any circle should be 50% of the width. Min size is 25%
            let size = Math.floor(Math.random() * (maxSize - maxSize / 4)) + maxSize / 4;

            //create the circle.
            let circle = new simples.SemiCircle(circleX, this.d.y - size / 2, size, size);
            this.addShape(circle);
            previousCircle = circle;

            //if the circle's right edge exceeds the width of the cloud, move it over.
            //otherwise add another circle.
            if (circle.b.x > this.b.x) {
                circle.x = this.b.x - circle.width;
                moreCircles = false;
            }
        }
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

export { Cloud }
