import { simples } from '../simples/simples.js';
import { Border } from './border.js';

class RockyBorder extends Border {
    constructor(container, thickness, edgeLine, location) {
        super(container, thickness, edgeLine, location);
        this.type = "RockyBorder";
        let numberOfRocks = Math.floor((this.width / thickness) * 2);
        let current = trees.copyPoint(edgeLine.start);

        let angle = trees.getAngle(edgeLine.start, edgeLine.end);

        for (let i = 0; i < numberOfRocks; i++) {
            let rock = new simples.Polygon(current.x, current.y, thickness, thickness, trees.random(3, 6));

            //keeps rock aligned to middle of line.
            rock.rotate(angle - 45, rock.a)

            rock.rotate(trees.random(0, 180), rock.center);
            rock.color = container.color;
            container.addShape(rock);
            current = trees.getPointOnLine(current, thickness.percent(50), angle);
        }

    }

}

export { RockyBorder }
