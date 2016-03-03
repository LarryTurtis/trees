import { ShapesRegistry } from './shapesregistry.js'

let shapesRegistry = new ShapesRegistry();
let shapes = shapesRegistry.shapes;
CanvasRenderingContext2D.prototype.curve = function(points) {
    this.bezierCurveTo(points.cp1.x, points.cp1.y, points.cp2.x, points.cp2.y, points.end.x, points.end.y);
};

class Canvas {
    constructor() {
        this.element = document.getElementById('main');
        this.ctx = this.element.getContext("2d");
        this.centerX = this.element.width / 2;
        this.centerY = this.element.height / 2;
    }

    setWidth(width) {
        this.element.width = width;
        this.centerX = width / 2;
    }

    setHeight(height) {
        this.element.height = height;
        this.centerY = height / 2;
    }

    removeOffScreenObjects() {
        if (shapes[shapes.length - 1].x > this.element.width) {
            shapesRegistry.removeShape(shapes[shapes.length - 1]);
        }
        if (shapes[shapes.length - 1].y > this.element.height) {
            shapesRegistry.removeShape(shapes[shapes.length - 1]);
        }
    }

    animate(callback) {
        if (shapes.length) {
            this.removeOffScreenObjects();
            this.ctx.clearRect(0, 0, this.element.width, this.element.height);
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
