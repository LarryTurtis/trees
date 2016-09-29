import { simples } from '../simples/simples.js';
import { complex } from '../complex/complex.js';
import { ComplexShape } from '../complex/complexShape.js';

class ShoreLine extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "ShoreLine";

        this.water = new simples.Rectangle(x, y, width, height);
        this.water.pathOnly = true;
        this.addShape(this.water);

        this.leftEdge = new complex.YinYang(x, y, height, height);
        this.addShape(this.leftEdge);
        
        this.rightEdge = new complex.YangYin(x + width - height, y, height, height);
        this.addShape(this.rightEdge);

    }

    get waterColor() {
        return this.water.color;
    }

    set waterColor(waterColor) {
        this.water.color = waterColor;
    }

    draw(ctx) {
        ctx.save();
        ctx.beginPath();
        this.water.draw(ctx);
        ctx.clip();
        this.leftEdge.draw(ctx);
        this.rightEdge.draw(ctx);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }

}

export { ShoreLine }