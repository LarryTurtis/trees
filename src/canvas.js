import { ShapesRegistry } from './shapesregistry.js'

let shapesRegistry = new ShapesRegistry();
let shapes = shapesRegistry.shapes;
CanvasRenderingContext2D.prototype.curve = function(points) {
    this.bezierCurveTo(points.cp1.x, points.cp1.y, points.cp2.x, points.cp2.y, points.end.x, points.end.y);
};

CanvasRenderingContext2D.prototype.yLine = function(a,b) {
    this.lineTo(a.x, a.y, b.x, b.y);
};
CanvasRenderingContext2D.prototype.yRect = function(rect) {
    this.yLine(rect.a, rect.b);
    this.yLine(rect.b, rect.c);
    this.yLine(rect.c, rect.d);
    this.yLine(rect.d, rect.a);
};
CanvasRenderingContext2D.prototype.yMove = function(point) {
    this.moveTo(point.x, point.y);
};

class Canvas {
    constructor() {
        this.element = document.getElementById('main');
        this.ctx = this.element.getContext("2d");
        this._centerX = this.element.width / 2;
        this._centerY = this.element.height / 2;
        this._width = this.element.width;
        this._height = this.element.height;
    }

    set width(width) {
        this.element.width = width;
        this._width = width;
        this._centerX = width / 2;
    }

    set height(height) {
        this.element.height = height;
        this._height = height;
        this._centerY = height / 2;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get centerX() {
        return this._centerX;
    }

    get centerY() {
        return this._centerY;
    }

    removeOffScreenObjects() {
        if (shapes[shapes.length - 1].x > this.width) {
            shapesRegistry.removeShape(shapes[shapes.length - 1]);
        }
        if (shapes[shapes.length - 1].y > this.height) {
            shapesRegistry.removeShape(shapes[shapes.length - 1]);
        }
    }

    animate(callback) {
        if (shapes.length) {
            this.removeOffScreenObjects();
            this.ctx.clearRect(0, 0, this.width, this.height);
            callback();
            shapes.forEach(shape => {
                shape.draw(this.ctx);
            });
        }

        requestAnimationFrame(() => {
            this.animate(callback);
        });
    }


};

export { Canvas }
