import { simples } from '../simples/simples.js';
import { complex } from '../complex/complex.js';
import { ComplexShape } from '../complex/complexShape.js';
import { patterns } from '../patterns/patterns.js';

class Mushroom extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Mushroom";

        let stem = new simples.Rectangle(this.center.x - this.width / 10, y + height / 4, this.width / 5, this.height * 0.75);
        stem.color = "#F8A068";
        let cap = new complex.SemiCircle(x, y, width, width / 2);
        let circle = new simples.Circle(x, y, width, width);
        cap.color = "#AF001E";
        let rectangle = new simples.Rectangle(x, y + width / 2, width, height / 8);
        rectangle.color = "#AF001E";
        this.addShape(stem);
        this.addShape(cap);

        for (let i = 0; i < 5; i++) {
            let v_width = width / 5;
            let v_height = v_width / 2;
            let veil = new complex.SemiCircle(x + i * v_width, rectangle.d.y, v_width, v_height);
            veil.rotate(180, veil.center);
            veil.color = "#FFFCC4";
            this.addShape(veil);
        }
        this.addShape(rectangle);
        patterns.randomSpotsOnCircle(circle).forEach(spot => {
            //make sure it is above the semicircle.
            if (spot.y + spot.height < rectangle.d.y) {
                spot.color = "#F8A068";
                spot.collidable = false;
                this.addShape(spot);
            }
        });
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
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

export { Mushroom }
