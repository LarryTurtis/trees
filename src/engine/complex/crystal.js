import { Point } from '../point.js';
import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Crystal extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);

        this.type = "Crystal";

        let horizontalLine = trees.random(0, this.height / 2);
        let verticalLine1 = trees.random(0, this.width / 2);
        let verticalLine2 = trees.random(verticalLine1, this.width);


        let top = new Point(this.center.x, this.y);
        let bottom = new Point(this.center.x, this.y + this.height);
        let left = new Point(this.x, this.y + horizontalLine);
        let centerLeft = new Point(this.x + verticalLine1, this.y + horizontalLine);
        let centerRight = new Point(this.x + verticalLine2, this.y + horizontalLine);
        let right = new Point(this.x + this.width, this.y + horizontalLine);

        let triangle1 = new simples.Triangle(x, y, width, height);
        let triangle2 = new simples.Triangle(x, y, width, height);
        let triangle3 = new simples.Triangle(x, y, width, height);
        let triangle4 = new simples.Triangle(x, y, width, height);
        let triangle5 = new simples.Triangle(x, y, width, height);
        let triangle6 = new simples.Triangle(x, y, width, height);

        triangle1.points = [left, top, centerLeft];
        triangle2.points = [centerLeft, top, centerRight];
        triangle3.points = [centerRight, top, right];
        triangle4.points = [left, bottom, centerLeft];
        triangle5.points = [centerLeft, bottom, centerRight];
        triangle6.points = [centerRight, bottom, right];

        this.addShape(triangle1);
        this.addShape(triangle2);
        this.addShape(triangle3);
        this.addShape(triangle4);
        this.addShape(triangle5);
        this.addShape(triangle6);

    }

    get color() {
        return super.color;
    }

    set color(color) {
        super.color = color;
        this.shape.forEach(shape => {
            shape.color = trees.shadeColor(this.color, trees.random(-50, 50)/100);
        })
    }

}

export { Crystal }