import { collisionDetection } from './collisionDetection.js'

class Collision {
    constructor(obj) {
        this._resolved = false;
        this._obj = obj;
    }

    test(obj) {
        return collisionDetection(obj, this.obj);
        // if (obj !== this.obj &&
        //     obj.a.x <= this.obj.b.x &&
        //     obj.b.x >= this.obj.a.x &&
        //     obj.a.y <= this.obj.d.y &&
        //     obj.d.y >= this.obj.a.y) {
        //     return true;
        // } else {
        //     return false;
        // }
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
