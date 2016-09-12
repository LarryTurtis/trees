import { ComplexShape } from './complexShape.js'

class Drop extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Drop";
        this.head = null;
        this.body = null;
        this.tail = null;
    }

    thin() {

    }

    thicken() {

    }

    fall() {

    }

    splash() {

    }

}

export { Drop }