class Collision {
    constructor(x1,x2,y1,y2) {
        this._resolved = true;
        this._x1 = x1;
        this._y1 = y1;
        this._x2 = x2;
        this._y2 = y2;
    }

    test(x,y) {
        x = Math.floor(x);
        y = Math.floor(y);
        if (x >= this._x1 && x <= this._x2 && y >= this._y1 && y <= this._y2) {
            this.resolved = false;
            return true;
        }
    }

    get x1() {
        return this._x1;
    }

    get y1() {
        return this._y1;
    }

    get x2() {
        return this._x2;
    }

    get y2() {
        return this._y2;
    }

    get resolved() {
        return this._resolved;
    }

    set x1(x) {
        this._x1 = x;
    }

    set y1(y) {
        this._y1 = y;
    }

    set x2(x) {
        this._x2 = x;
    }

    set y2(y) {
        this._y2 = y;
    }

    set resolved(resolved) {
        this._resolved = resolved;
    }
}

export { Collision }
