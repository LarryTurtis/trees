import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class WaterWheel extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "WaterWheel";

        let thickness = width.percent(3);

        let hub = new complex.Circle(x + width.percent(37.5), y + width.percent(37.5), width.percent(25), height.percent(25));
        hub.color = trees.setOpacity("white", 1);
        let rim = new complex.Donut(x, y, width, height, thickness);
        rim.color = trees.setOpacity("white", 1);
        this.addShape(rim);

        let s_angle = 0;

        let color = ["red", "green", "blue", "yellow", "black", "orange", "purple", "white"];

        for (var i = 0; i < 8; i++) {
            let spoke = new simples.Rectangle(this.center.x - thickness / 2, this.center.y, thickness, height / 2, 0);
            this.addShape(spoke);
            spoke.color = trees.setOpacity(color[i], 0.5);
            spoke.rotate(s_angle, this.center);
            s_angle += 45;
        }
        this.addShape(hub);

        for (var i = 0; i < 8; i++) {
            let container = new complex.Cup(x + width.percent(10), y + height.percent(1), width.percent(16), width.percent(16), 70);
            container.thickness = width.percent(1);
            container.color = trees.setOpacity(color[i], 0.5);
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