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

    createSATObject() {
        return [new SAT.Polygon(new SAT.Vector(0, 0), [
            new SAT.Vector(this.end.x, this.end.y),
            new SAT.Vector(this.start.x, this.start.y),
        ])];
    }

}

export { Line }