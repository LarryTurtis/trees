import { Collision } from './collision.js'

let instance = null;

class GlobalCollisionRegistry {
    constructor(canvas) {
        if (!instance) {
            instance = this;
        }

        this._all = {};

        return instance;
    }

    get all() {
        return this._all;
    }

    forEach(callback) {
        Object.keys(this.all).forEach(key => {
            let obj = this._all[key];
            if (obj) {
                callback(obj);
            }
        });
    }

    add(o1, o2, overlap) {
        var existingCollision = this._all[getId(o1, o2)] || this._all[getId(o2, o1)];
        if (!existingCollision) {
            var collision = new Collision(o1, o2, overlap);
            this._all[collision.id] = collision;
            return collision;
        }
        return existingCollision;
    }

    remove(o1, o2) {
        delete this._all[getId(o1, o2)];
        delete this._all[getId(o2, o1)];
    }

}

function getId(o1, o2) {
    return o1.id + "-" + o2.id;
}

export { GlobalCollisionRegistry }
