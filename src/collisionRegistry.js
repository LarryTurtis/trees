class CollisionRegistry {
    constructor() {
        this._collisions = [];
    }

    get collisions() {
        return this._collisions;
    }

    addCollision(collision) {
        this._collisions.push(collision);
    }

    removeCollision(collision) {
        this._collisions.splice(this._collisions.indexOf(collision), 1);
    }

}


export { CollisionRegistry }