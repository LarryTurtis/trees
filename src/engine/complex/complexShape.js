import { Sprite } from '../sprite.js'

class ComplexShape extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "ComplexShape";
    }

}

export { ComplexShape }


