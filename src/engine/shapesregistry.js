let instance = null;

class ShapesRegistry {
    constructor(canvas) {
        if (!instance) {
            instance = this;
        }

        this._shapes = {};
        this._shapeId = 0;
        this._maxShapes = 1000000;
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

    get maxShapes() {
        return this._maxShapes;
    }

    set maxShapes(n) {
        this._maxShapes = n;
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
        if (this.length < this.maxShapes) {
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
