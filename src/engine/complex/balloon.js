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
        
        let basket = new simples.Rectangle(trees.getCenterX(width.percent(15), circle), y + height.percent(140), width.percent(15), height.percent(15));
        let leftString = new simples.Rectangle(trees.getCenterX(width.percent(15), circle)+ width.percent(1), y + height.percent(125), width.percent(1), height.percent(15));
        let rightString = new simples.Rectangle(trees.getCenterX(width.percent(15), circle) + width.percent(13), y + height.percent(125), width.percent(1), height.percent(15));

        this.addShape(circle);
        this.addShape(trapezoid);
        this.addShape(basket);
        this.addShape(leftString);
        this.addShape(rightString);
        
    }

}

export { Balloon }