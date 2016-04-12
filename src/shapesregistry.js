let instance = null;

class ShapesRegistry {
    constructor(canvas) {
        if (!instance) {
            instance = this;
        }

        this._shapes = {};
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

    get length() {
        return Object.keys(this.shapes).length;
    }

    forEach(callback) {
        Object.keys(this.shapes).forEach(key => {
            let obj = this.shapes[key];
            if (obj) {
                callback(obj);
            }
        });
    }

    add(shape) {
        shape.id = this.shapeId;
        this.shapeId++;
        if (this.length < 25) {
            this._shapes[shape.id] = shape;
        }
    }

    remove(shape) {
        var shapesRegistry = this;
        setTimeout(function() {
            delete shapesRegistry._shapes[shape.id];
        }, 0);
    }

}


export { ShapesRegistry }
