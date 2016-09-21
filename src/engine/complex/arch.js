import { complex } from './complex.js';
import { ThickShape } from './thickShape.js';

class Arch extends ThickShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle, thickness);
        this.type = "Arch";

        this.right = new complex.Macaroni(x + width / 2, y, width / 2, height, 0, thickness);
        this.left = new complex.Macaroni(x, y, width / 2, height, 270, thickness);
        this.left.rotate(270, this.left.center);
        this.addShape(this.right);
        this.addShape(this.left);
    }

}

export { Arch }
