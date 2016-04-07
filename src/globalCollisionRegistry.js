import { Collision } from './collision.js'

let instance = null;

class GlobalCollisionRegistry {
    constructor(canvas) {
        if (!instance) {
            instance = this;
        }

        this._collisions = {};

        return instance;
    }

    get collisions() {
        return this._collisions;
    }

    forEach(callback) {
        Object.keys(this.collisions).forEach(key => {
            let obj = this._collisions[key];
            if (obj) {
                callback(obj);
            }
        });
    }

    add(shape) {
        var collision = new Collision(shape);
        this._collisions[shape.id] = collision;
    }

    remove(id) {
        delete this._collisions[id];
    }

}


export { GlobalCollisionRegistry }
