import { collisionDetection } from './collisionDetection.js'

class Collision {
    constructor(o1, o2, overlap) {
        this._resolved = false;
        this._o1 = o1;
        this._o2 = o2;
        this._id = getId(o1, o2);
        this._overlap = overlap;
    }

    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    get o1() {
        return this._o1;
    }

    set o1(o1) {
        this._o1 = o1;
    }

    get o2() {
        return this._o2;
    }

    set o2(o2) {
        this._o2 = o2;
    }

    get overlap() {
        return this._overlap;
    }

    set overlap(overlap) {
        this._overlap = overlap;
    }

    get resolved() {
        return this._resolved;
    }

    set resolved(resolved) {
        this._resolved = resolved;
    }
}

function getId(o1, o2) {
    return o1.id + "-" + o2.id;
}


export {
    Collision
}
