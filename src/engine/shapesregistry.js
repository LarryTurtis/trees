import { Canvas } from './canvas.js';

let instance = null;

class ShapesRegistry {
    constructor() {
        if (!instance) {
            instance = this;
            this._shapes = {};
            this._dynamicShapes = [];
            this._staticShapes = [];
            this._shapeId = 0;
            this._maxShapes = 1000000;
            this._fps = 60;
            this._interval = 1000 / this._fps;
            this.blur = false;
            this._staticBackgroundCanvas = new Canvas("staticBackgroundCanvas");
            this._staticForegroundCanvas = new Canvas("staticForegroundCanvas");
            this._dynamicBackgroundCanvas = new Canvas("dynamicBackgroundCanvas");
            this._dynamicForegroundCanvas = new Canvas("dynamicForegroundCanvas");
        }
        return instance;
    }

    get staticBackgroundCanvas() {
        return this._staticBackgroundCanvas;
    }

    set staticBackgroundCanvas(staticBackgroundCanvas) {
        this._staticBackgroundCanvas = staticBackgroundCanvas;
    }

    get dynamicBackgroundCanvas() {
        return this._dynamicBackgroundCanvas;
    }

    set dynamicBackgroundCanvas(dynamicBackgroundCanvas) {
        this._dynamicBackgroundCanvas = dynamicBackgroundCanvas;
    }

    get staticForegroundCanvas() {
        return this._staticForegroundCanvas;
    }

    set staticForegroundCanvas(staticForegroundCanvas) {
        this._staticForegroundCanvas = staticForegroundCanvas;
    }

    get dynamicForegroundCanvas() {
        return this._dynamicForegroundCanvas;
    }

    set dynamicForegroundCanvas(dynamicForegroundCanvas) {
        this._dynamicBackgroundCanvas = dynamicBackgroundCanvas;
    }

    get allCanvases() {
        return [this.staticBackgroundCanvas, this.dynamicBackgroundCanvas, this.staticForegroundCanvas, this.dynamicForegroundCanvas];
    }

    get shapes() {
        return this._shapes;
    }

    set shapes(shapes) {
        this._shapes = shapes;
    }

    get dynamicShapes() {
        return this._dynamicShapes;
    }

    set dynamicShapes(dynamicShapes) {
        this._dynamicShapes = dynamicShapes;
    }

    get staticShapes() {
        return this._staticShapes;
    }

    set staticShapes(staticShapes) {
        this._staticShapes = staticShapes;
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

    addToStaticBackground(shape) {
        this.add(shape);
        this.staticShapes.push(shape);
        shape.canvas = this.staticBackgroundCanvas;
    }

    addToStaticForeground(shape) {
        this.add(shape);
        this.staticShapes.push(shape);
        shape.canvas = this.staticForegroundCanvas;
    }

    addToDynamicBackground(shape) {
        this.add(shape);
        this.dynamicShapes.push(shape);
        shape.canvas = this.dynamicBackgroundCanvas;
    }

    addToDynamicForeground(shape) {
        this.add(shape);
        this.dynamicShapes.push(shape);
        shape.canvas = this.dynamicForegroundCanvas;
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
        if (!shape.canvas) shape.canvas = this.staticBackgroundCanvas;
    }

    remove(shape) {
        var shapesRegistry = this;
        setTimeout(function() {
            delete shapesRegistry._shapes[shape.id];
        }, 0);
    }

    reset() {
        this.shapeId = 0;
        this.shapes = {};
    }

}


export { ShapesRegistry }