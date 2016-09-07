class Line {
    constructor(start, end) {
        this._start = start;
        this._end = end;
    }
    get start() {
        return this._start;
    }

    get end() {
        return this._end;
    }

    set start(start) {
        this._start = start;
    }

    set end(end) {
        this._end = end;
    }
}

export { Line }
