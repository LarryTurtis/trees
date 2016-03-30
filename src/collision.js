class Collision {
    constructor(obj) {
        this._resolved = false;
        this._obj = obj;
    }

    test(x, y, width, height) {
        if (x <= this.obj.x + this.obj.width &&
            x + width >= this.obj.x &&
            y <= this.obj.y + this.obj.height &&
            height + y >= this.obj.y) {
            return true;
        } else {
            return false;
        }
    }

    get obj() {
        return this._obj;
    }

    get resolved() {
        return this._resolved;
    }

    set obj(obj) {
        this._obj = obj;
    }

    set resolved(resolved) {
        this._resolved = resolved;
    }
}

export { Collision }
