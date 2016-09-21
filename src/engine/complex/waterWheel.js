import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class WaterWheel extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "WaterWheel";

        let thickness = width / 30;


        let hub = new complex.Circle(x + width / 2 - width / 8, y + width / 2 - width / 8, width / 4, height / 4, 0);
        hub.color = trees.setOpacity("white", 0.7);
        let rim = new complex.Donut(x, y, width, height, 0, thickness);
        rim.color = trees.setOpacity("white", 0.7);
        // this.addShape(hub);
        this.addShape(rim);

        let s_angle = 0;

        for (var i = 0; i < 8; i++) {
            let spoke = new simples.Rectangle(this.center.x - thickness / 2, this.center.y, thickness, this.height / 2, 0);
            this.addShape(spoke);
            spoke.color = trees.setOpacity("white", 0.7);
            spoke.rotate(s_angle, this.center);
            s_angle += 45;
        }

        for (var i = 0; i < 8; i++) {
            let container = new complex.Cup(this.x + 25, this.y + 25, 100, 100, 90);
            container.color = trees.setOpacity("white", 0.2);
            container.liquidColor = "rgb(0,47,57)";
            this.addShape(container);
            container.rotate(s_angle, this.center);
            container.rotate(-s_angle, container.center);
            container.rotate(s_angle + 45, container.center);
            container.level = 50;
            s_angle += 45;
        }

    }

}

export { WaterWheel }