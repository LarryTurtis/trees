import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';
import { fall } from '../animations/fall.js';
import { slide } from '../animations/slide.js';

class Box extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Box";
        let rectangle = new simples.Rectangle(x, y, width, height);
        this.fall = fall;
        this.slide = slide;
        this.ySpeed = 1;
        this.xSpeed = 1;
        this.addShape(rectangle);
    }
}

export { Box }