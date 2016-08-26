import { simples } from '../simples/simples.js';
import { ContainerComposite } from './containerComposite.js';
import { Container } from './container.js';

class Cup extends ContainerComposite {
    constructor(x, y, width, height, angle, taper) {
        super(x, y, width, height, angle);
        this.type = "Cup";
        this.taper = taper;
        let shape = new simples.Trapezoid(x, y, width, height, angle, taper, taper);
        this.addShape(shape);
    }
}

export { Cup }
