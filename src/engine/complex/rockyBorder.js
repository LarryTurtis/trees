import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class RockyBorder extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "RockyBorder";

        let numberOfRocks = (height / width) * 2;
        let currentY = y;

        for (let i = 0; i < numberOfRocks; i++) {
            let rock = new simples.Polygon(x, currentY, width, width, trees.random(3,6));
            rock.rotate(trees.random(0, 180), rock.center);
            this.addShape(rock);
            currentY += width.percent(50);
        }

        let backingRectangle = new simples.Rectangle(x, y, width / 2, height);
        this.addShape(backingRectangle);

    }

}

export { RockyBorder }