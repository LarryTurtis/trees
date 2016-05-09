import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Mushroom extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Mushroom";

        let stem = new simples.Rectangle(this.center.x - this.width / 8, y + height / 4, this.width / 4, this.height * 0.75, 0);
        stem.color = "#F8A068";
        let cap = new simples.SemiCircle(x, y - height / 4, width, height, 0);
        cap.color = "#AF001E";
        let rectangle = new simples.Rectangle(x, y + height / 4, width, height / 8, 0);
        rectangle.color = "#AF001E";
        this.addShape(stem);
        this.addShape(cap);

        for (let i = 0; i < 5; i++) {
            let v_width = width / 5;
            let v_height = height / 10;
            let veil = new simples.Circle(x + i * v_width, rectangle.d.y - v_height / 2, v_width, v_height);
            veil.color = "#FFFCC4";
            this.addShape(veil);
        }
        this.addShape(rectangle);

        let spot_xlocation = cap.center.x
        let spot_ylocation = cap.center.y - cap.height / 4;

        let spot = new simples.Circle(spot_xlocation, spot_ylocation, cap.width / 3, cap.height / 3);
        spot.color = "#F8A068";
        this.addShape(spot);
    }

    draw(ctx) {
        this.width++;
        this.height++;
        super.draw(ctx);

        ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.fill();
        ctx.stroke();
        ctx.closePath();

    }

}

export { Mushroom }
