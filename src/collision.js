class Collision {
    constructor(obj) {
        this._resolved = false;
        this._obj = obj;
    }

    test(obj) {
        if (obj !== this.obj &&
            obj.x <= this.obj.x + this.obj.width &&
            obj.x + obj.width >= this.obj.x &&
            obj.y <= this.obj.y + this.obj.height &&
            obj.height + obj.y >= this.obj.y) {
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

export {
    Collision
}
