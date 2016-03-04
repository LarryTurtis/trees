import { Point } from './point.js'

class Curve {
    constructor(cp1, cp2, end) {

        this._cp1 = cp1
        this._cp2 = cp2;
        this._end = end;
    }


    get cp1() {
        return this._cp1;
    }

    get cp2() {
        return this._cp2;
    }

    get end() {
        return this._end;
    }

    set cp1(cp1) {
        this._cp1 = cp1;
    }

    set cp2(cp2) {
        this._cp2 = cp2;
    }

    set end(end) {
        this._end = end;
    }
}

export { Curve }
