import {
    CollisionRegistry
}
from './collisionRegistry.js'

let instance = null;
let collisionRegistry = new CollisionRegistry();

class ShapesRegistry {
    constructor(canvas) {
        if (!instance) {
            instance = this;
        }

        this._shapes = [];
        this._shapeId = 0;
        return instance;
    }

    get shapes() {
        return this._shapes;
    }

    get shapeId() {
        return this._shapeId;
    }

    set shapeId(id) {
        this._shapeId = id;
    }

    add(shape) {
        shape.id = this.shapeId;
        this.shapeId++;
        if (this._shapes.length < 5) {
            this._shapes.push(shape);
            collisionRegistry.add(shape)
        }
    }

    remove(shape) {
        collisionRegistry.remove(shape.id);
        this._shapes.splice(this._shapes.indexOf(shape), 1);
    }

}


export {
    ShapesRegistry
}
