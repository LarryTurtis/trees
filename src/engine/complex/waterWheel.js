import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class WaterWheel extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "WaterWheel";

        let thickness = width / 30;


        let hub = new complex.Circle(x + width / 2 - width / 8, y + width / 2 - width / 8, width / 4, height / 4, 0);
        hub.color = "black";
        let rim = new complex.Donut(x, y, width, height, 0, thickness);
        rim.color = "black";
       // this.addShape(hub);
       // this.addShape(rim);

        let s_angle = 0;

        for (var i = 0; i < 8; i++) {
            let spoke = new simples.Rectangle(this.center.x - thickness / 2, this.center.y, thickness, this.height / 2, 0);
            let container = new complex.Cup(this.x, this.y, 50, 50, 90);

            container.color = trees.setOpacity("white", 0.2);
            container.liquidColor = "blue";
            this.addShape(spoke);
            this.addShape(container);
            spoke.color = "black";
            container.rotate(-s_angle, container.center);
            container.rotate(s_angle, this.center);
            container.level = 50;
            spoke.rotate(s_angle, this.center);
            s_angle += 45;
        }

    }

}

export { WaterWheel }
