import { simples } from '../simples/simples.js';
import { Container } from './container.js';

class Cup extends Container {
    constructor(x, y, width, height, taper) {
        super(x, y, width, height);
        this.type = "Cup";
        this.taper = taper;
        let shape = new simples.Trapezoid(x, y, width, height, taper, taper);
        this.opening = shape.lines()[0];
        this.addShape(shape);
    }
}

export { Cup }
