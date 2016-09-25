import { simples } from '../simples/simples.js';
import { Border } from './border.js';

class ScallopedBorder extends Border {
    constructor(container, thickness, edgeLine, location) {
        super(container, thickness, edgeLine, location);
        this.type = "ScallopedBorder";
        let number = Math.floor((this.width / thickness));
        let current = trees.copyPoint(edgeLine.start);

        let angle = trees.getAngle(edgeLine.start, edgeLine.end);

        for (let i = 0; i < number; i++) {
            let rock = new simples.Circle(current.x, current.y, thickness, thickness);

            //keeps rock aligned to middle of line.
            rock.rotate(angle - 45, rock.a)
            rock.color = container.color;
            rock.startAngle = 0;
            rock.endAngle = 1;
            container.addShape(rock);
            current = trees.getPointOnLine(current, thickness, angle);
        }

    }

}

export { ScallopedBorder }
