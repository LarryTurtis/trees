import { Point } from '../../point.js';
import { Line } from '../../line.js';

class Drop extends Line {
    constructor(origin, width) {
        let start = new Point(origin.x, origin.y);
        let end = new Point(origin.x + width, origin.y);
        super(start, end);
        this.type = "Drop";
    }

    get y() {
        return this.start.y;
    }

    set y(y) {
        this.start.y = y;
        this.end.y = y;
    }

    get x() {
        return this.start.x;
    }

    set x(x) {
        let width = this.width;
        this.start.x = x;
        this.end.x = x + width;
    }

    get width() {
        return this.end.x - this.start.x;
    }

    set width(width) {
        this.end.x = this.start.x + width;
    }
}

export { Drop }