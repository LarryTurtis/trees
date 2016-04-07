import { Collision } from './collision.js'

class CollisionRegistry {
    constructor(canvas) {
        this._collisions = {};
    }

    get all() {
        return this._collisions;
    }

    forEach(callback) {
        Object.keys(this.all).forEach(key => {
            let obj = this._collisions[key];
            if (obj) {
                callback(obj);
            }
        });
    }

    get length() {
        return Object.keys(this.all).length;
    }

    getLowestCollision() {
        var sortable = [];
        for (var shape in this.all)
            sortable.push(this.all[shape])
        sortable.sort((a, b) => {
            return b.obj.y - a.obj.y
        });
        return sortable[0];
    }

    add(shape) {
        this._collisions[shape.obj.id] = shape;
    }

    remove(shape) {
        var id = shape.obj && shape.obj.id || shape.id;
        delete this._collisions[id];
    }

}


export { CollisionRegistry }
