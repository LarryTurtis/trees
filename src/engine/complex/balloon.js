import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Balloon extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Balloon";

        let circle = new simples.Circle(x, y, width, height);
        circle.startAngle = 0.75;
        circle.endAngle = 0.25;

        let trapezoid = new simples.Trapezoid(trees.getCenterX(width.percent(86), circle), y + height.percent(75), width.percent(86), height.percent(50), 55);
        this.basket = new simples.Rectangle(trees.getCenterX(width.percent(15), circle), y + height.percent(140), width.percent(15), height.percent(15));
        
        this.leftString = new simples.Rectangle(trees.getCenterX(width.percent(15), circle)+ width.percent(1), y + height.percent(125), width.percent(1), height.percent(15));
        this.rightString = new simples.Rectangle(trees.getCenterX(width.percent(15), circle) + width.percent(13), y + height.percent(125), width.percent(1), height.percent(15));

        this.addShape(circle);
        this.addShape(trapezoid);
        this.addShape(this.leftString);
        this.addShape(this.basket);
        this.addShape(this.rightString);

    }

    get color() {
        return super.color;
    }

    set color(color) {
        super.color = color;
        this.leftString.color = "black";
        this.rightString.color = "black";
        this.basket.color = "white";
    }

}

export { Balloon }