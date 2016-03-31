import {
    ShapesRegistry
}
from './shapesregistry.js'

let shapesRegistry = new ShapesRegistry();
let shapes = shapesRegistry.shapes;

let fps = 60;
let now;
let then = Date.now();
let interval = 1000 / fps;
let delta;


CanvasRenderingContext2D.prototype.curve = function(points) {
    if (points) {
        this.bezierCurveTo(points.cp1.x, points.cp1.y, points.cp2.x, points.cp2.y, points.end.x, points.end.y);
    }
};

CanvasRenderingContext2D.prototype.yLine = function(a, b) {
    this.moveTo(a.x, a.y);
    this.lineTo(b.x, b.y);
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
CanvasRenderingContext2D.prototype.yArc = function(arc) {
    this.arc(arc.x, arc.y, arc.r, arc.sAngle, arc.eAngle);
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

        requestAnimationFrame(() => {
            this.animate(callback);
        });

        now = Date.now();
        delta = now - then;

        if (delta > interval) {
            // update time stuffs

            // Just `then = now` is not enough.
            // Lets say we set fps at 10 which means
            // each frame must take 100ms
            // Now frame executes in 16ms (60fps) so
            // the loop iterates 7 times (16*7 = 112ms) until
            // delta > interval === true
            // Eventually this lowers down the FPS as
            // 112*10 = 1120ms (NOT 1000ms).
            // So we have to get rid of that extra 12ms
            // by subtracting delta (112) % interval (100).
            // Hope that makes sense.

            then = now - (delta % interval);

            // ... Code for Drawing the Frame ...

            if (shapes.length) {
                this.removeOffScreenObjects();
                this.ctx.clearRect(0, 0, this.width, this.height);
                shapes.forEach(shape => {
                    if (!shape.removed) shape.draw(this.ctx);
                });
                callback();
            }
        }

    }


};

export {
    Canvas
}
