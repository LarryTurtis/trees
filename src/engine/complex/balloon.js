import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Balloon extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Balloon";

        this.circle = new simples.Circle(x, y, width, height);
        this.circle.startAngle = 0.835;
        this.circle.endAngle = 0.165;
        this.trapezoid = new simples.Trapezoid(trees.getCenterX(width.percent(86), this.circle), y + height.percent(75), width.percent(86), height.percent(50), 55);
        this.height = this.circle.height + this.trapezoid.height;
        this.circle.pathOnly = true;
        this.trapezoid.pathOnly = true;

        this.addShape(this.circle);
        this.addShape(this.trapezoid);
    }

    draw(ctx) {
        ctx.beginPath();
        ctx.arc(this.circle.center.x, this.circle.center.y, this.circle.radius, this.circle.startAngle, this.circle.endAngle);
        ctx.yLine(this.trapezoid.bottomRight);
        ctx.yLine(this.trapezoid.bottomLeft);
        ctx.yLine(this.trapezoid.topLeft);
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.lineColor;
        if (!this.pathOnly) ctx.fill();
        if (!this.pathOnly && this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Balloon }