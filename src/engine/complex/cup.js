import { simples } from '../simples/simples.js';
import { Point } from '../point.js';
import { ComplexShape } from './complexShape.js';
import { Container } from './container.js';
import { complex } from './complex.js';

class Cup extends ComplexShape {
    constructor(x, y, width, height, angle, taper) {
        super(x, y, width, height, angle);
        this.type = "Cup";
        this.taper = taper;
        let shape = new simples.Trapezoid(x, y, width, height, angle, taper, taper);
        return new Container(shape);
    }
}

export { Cup }
