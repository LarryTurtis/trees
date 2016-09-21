import { Line } from '../line.js';
import { Point } from '../point.js';

const START = 0;
const END = 2000;

class LevelLine extends Line {
    constructor(y) {

        if (typeof y !== "number") {
            throw new Error("LevelLine cannot be created without a valid y position");
        }

        let start = new Point(START, y);
        let end = new Point(END, y);
        super(start, end);
    }

    get y() {
        return this.start.y;
    }

    set y(y) {
        this.start.y = y;
        this.end.y = y;
    }

    rotate(deg, transformOrigin) {
        this.start = trees.rotatePoint(this.start, transformOrigin, deg);
        this.end = trees.rotatePoint(this.end, transformOrigin, deg);
    }
    
}

export { LevelLine }