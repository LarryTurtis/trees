import { simples } from '../simples/simples.js';
import { Border } from './border.js';

class RockyBorder extends Border {
    constructor(container, thickness, edgeLine) {
        super(container, thickness, edgeLine);
        this.type = "RockyBorder";
        let numberOfRocks = Math.floor((this.width / thickness) * 2);
        let current = trees.copyPoint(edgeLine.start);

        let angle = trees.getAngle(edgeLine.start, edgeLine.end);
        let orientation = trees.orientation(edgeLine);
        let currentLength = 0;

        if (orientation === "I") {
            current.y -= thickness.percent(50);
        } else if (orientation === "II") {
            current.x -= thickness.percent(50);
            current.y -= thickness;
        } else if (orientation === "III") {
            current.x -= thickness;
            current.y -= thickness.percent(50);
        } else if (orientation === "IV") {
            current.x -= thickness.percent(50);
            current.y -= thickness.percent(50);
        }

        for (let i = 0; i < numberOfRocks; i++) {
            let rock = new simples.Polygon(current.x, current.y, thickness, thickness, trees.random(3, 6));
            rock.rotate(trees.random(0, 180), rock.center);
            rock.color = container.color;
            container.addShape(rock);
            current = trees.getPointOnLine(current, thickness.percent(50), angle);
            currentLength += thickness.percent(50);
        }

    }

}

export { RockyBorder }
