import { Sprite } from '../sprite.js'
import { Curve } from '../curve.js'
import { Point } from '../point.js'

class Meniscus extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Meniscus";
    }

}

export { Meniscus }