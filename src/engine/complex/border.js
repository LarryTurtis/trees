import { Sprite } from '../sprite.js';

class Border extends Sprite {
    constructor(container, thickness, edgeLine) {

        if (!container.addShape) {
            throw new Error("Supplied container cannot receive a border. Most likely cause is that it is not a subclass of complexShape.")
        }
        let length = trees.getDistance(edgeLine.start, edgeLine.end);

        let x = edgeLine.start.x;
        let y = edgeLine.start.y;


        super(x, y, length, thickness);

        this.type = "Border";
    }
}

export { Border }
