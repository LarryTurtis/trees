import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Box extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Box";
        let rectangle = new simples.Rectangle(x, y, width, height);
        this.addShape(rectangle);
    }
}

export { Box }