import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

//basically same rules as clouds.
class Mountains extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Mountains";

        let maxSize = height;
        let previoustriangle;
        let triangleX;
        let moretriangles = true;


        while (moretriangles) {

            //the x of the triangle should overlap the right edge of the previous triangle by 25%
            let overlap = Math.floor(Math.random() * 3) + 1;
            triangleX = previoustriangle ? previoustriangle.b.x - (previoustriangle.width / overlap) : this.x;

            //the max size of any triangle should be 1/5 of the width. Min size is 1/10 of that.
            let size = Math.floor(Math.random() * (maxSize - maxSize / 10)) + maxSize / 10;

            //create the triangle.
            let triangle = new simples.Triangle(triangleX, this.d.y - size, size, size);
            
            this.addShape(triangle);
            previoustriangle = triangle;

            //if the triangle's right edge exceeds the width of the Mountains, move it over.
            //otherwise add another triangle.
            if (triangle.b.x > this.b.x) {
                triangle.x = this.b.x - triangle.width;
                moretriangles = false;
            }
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

export { Mountains }
