import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';
import { fall } from '../fall.js';
import { slide } from '../slide.js';

let triangle;
let rectangle;

class Arrow extends ComplexShape {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Arrow";
        this.isComponent = isComponent;

        rectangle = new simples.Rectangle(x, y + height / 4, width / 2, height / 2, 0, true);
        triangle = new simples.Triangle(x + width / 4, y + height / 4, width, height / 2, 90, true);
        this.addShape(rectangle);
        this.addShape(triangle);
        this.fall = fall;
        this.slide = slide;
        this.ySpeed = 1;
        this.xSpeed = 0;
    }

    get width() {
        return super.width;
    }

    get height() {
        return super.height;
    }

    set width(width) {
        let oldwidth = this.width;
        let diffwidth = width - oldwidth;
        super.width = width;
        triangle.x = this.getPointOnLine(triangle.origin, diffwidth, this.getAngle(this.a, this.b)).x;
        rectangle.x = this.getPointOnLine(rectangle.origin, diffwidth, this.getAngle(this.a, this.b)).x;
        rectangle.width = width / 2;
    }

    set height(height) {
        let oldheight = this.height;
        let diffheight = height - oldheight;
        super.height = height;
        triangle.height = height / 2;
        rectangle.height = height / 2;
        rectangle.y = this.getPointOnLine(rectangle.origin, diffheight / 4, this.getAngle(this.a, this.d)).y;
    }

    animate() {
        //if (!this.collidingWithPlatform) this.fall();
        this.width++;
        this.height++;
        //this.rotate(1, this.center)
    }

    draw(ctx) {
        super.draw(ctx);

        if (!this.isComponent) ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        if (!this.isComponent) {
            ctx.fill();
            ctx.stroke();
            ctx.closePath();
        }

    }

}

export { Arrow }
