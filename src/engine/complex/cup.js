import { simples } from '../simples/simples.js';
import { ContainerComposite } from './containerComposite.js';
import { Container } from './container.js';
import { Line } from '../line.js';

class Cup extends ContainerComposite {
    constructor(x, y, width, height, taper) {
        super(x, y, width, height);
        this.type = "Cup";
        this.taper = taper;
        let shape = new simples.Trapezoid(x, y, width, height, 70, 110);
        this.addShape(shape);
    }
}

export { Cup }
