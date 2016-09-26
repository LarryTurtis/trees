import { Point } from '../point.js';
import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Crystal extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.type = "Crystal";

        let horizontalLine = trees.random(this.height.percent(10), this.height.percent(50));
        let verticalLine1 = trees.random(0, this.width / 2);
        let verticalLine2 = trees.random(verticalLine1, this.width);


        let top = new Point(this.center.x, this.y);
        let bottom = new Point(this.center.x, this.y + this.height);
        let left = new Point(this.x, this.y + horizontalLine);
        let centerLeft = new Point(this.x + verticalLine1, this.y + horizontalLine);
        let centerRight = new Point(this.x + verticalLine2, this.y + horizontalLine);
        let right = new Point(this.x + this.width, this.y + horizontalLine);

        this.triangle1 = new simples.Triangle(x, y, width, height);
        this.triangle2 = new simples.Triangle(x, y, width, height);
        this.triangle3 = new simples.Triangle(x, y, width, height);
        this.triangle4 = new simples.Triangle(x, y, width, height);
        this.triangle5 = new simples.Triangle(x, y, width, height);
        this.triangle6 = new simples.Triangle(x, y, width, height);

        this.triangle1.points = [left, top, centerLeft];
        this.triangle2.points = [centerLeft, top, centerRight];
        this.triangle3.points = [centerRight, top, right];
        this.triangle4.points = [left, bottom, centerLeft];
        this.triangle5.points = [centerLeft, bottom, centerRight];
        this.triangle6.points = [centerRight, bottom, right];

        this.addShape(this.triangle1);
        this.addShape(this.triangle2);
        this.addShape(this.triangle3);
        this.addShape(this.triangle4);
        this.addShape(this.triangle5);
        this.addShape(this.triangle6);

    }

    get color() {
        return super.color;
    }

    set color(color) {
        super.color = color;
        this.shape.forEach(shape => {
            shape.color = trees.shadeColor(this.color, trees.random(-50, 50) / 100);
        })
    }

}

export { Crystal }