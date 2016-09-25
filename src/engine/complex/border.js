import { Sprite } from '../sprite.js';

class Border extends Sprite {
    constructor(container, thickness, edgeLine, location) {

        if (!container.addShape) {
            throw new Error("Supplied container cannot receive a border. Most likely cause is that it is not a subclass of complexShape.")
        }
        let startingPoint = trees.copyPoint(edgeLine.start);
        let length = trees.getDistance(edgeLine.start, edgeLine.end);

        super(startingPoint.x, startingPoint.y, length, thickness);

        this.type = "Border";

    }
}

export { Border }
