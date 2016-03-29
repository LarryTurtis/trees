let instance = null;

class ShapesRegistry {
    constructor(canvas) {
        if (!instance) {
            instance = this;
        }

        this._shapes = [];

        return instance;
    }

    get shapes() {
        return this._shapes;
    }

    addShape(shape) {
        if (this._shapes.length < 2) {
            this._shapes.push(shape);
        }
    }

    removeShape(shape) {
        this._shapes.splice(this._shapes.indexOf(shape), 1);
    }

}


export { ShapesRegistry }
