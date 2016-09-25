import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class YinYang extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "YinYang";

        this.topWedge = new simples.Wedge(x, y, width.percent(50), width.percent(50));
        this.bottomWedge = new simples.Wedge(x + width.percent(50), y + width.percent(50), width.percent(50), width.percent(50));
        this.bottomWedge.rotate(180, this.bottomWedge.center);

        this.addShape(this.topWedge);
        this.addShape(this.bottomWedge);

    }

    draw(ctx) {
        ctx.beginPath();
        ctx.yMove(this.topWedge.origin);
        ctx.curve(this.topWedge.curve);
        ctx.bezierCurveTo(this.bottomWedge.cp2.x, this.bottomWedge.cp2.y, this.bottomWedge.cp1.x, this.bottomWedge.cp1.y, this.c.x, this.c.y);
        ctx.yLine(this.d);
        ctx.fillStyle = this.color;
        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { YinYang }
