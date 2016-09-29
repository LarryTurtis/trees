import { simples } from '../simples/simples.js';
import { complex } from '../complex/complex.js';
import { ComplexShape } from '../complex/complexShape.js';

class Wheel extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Wheel";

        let thickness = width / 30;


        let hub = new complex.Circle(x + width / 2 - width / 8, y + width / 2 - width / 8, width / 4, height / 4, 0);
        let rim = new complex.Donut(x, y, width, height, 0, thickness);

        this.addShape(hub);
        this.addShape(rim);

        let s_angle = 0;

        for (var i = 0; i < 8; i++) {
            let spoke = new simples.Rectangle(this.center.x - thickness / 2, this.center.y, thickness, this.height / 2, 0);
            this.addShape(spoke);
            spoke.rotate(s_angle, this.center);
            s_angle += 45;
        }

    }
    
}

export { Wheel }
