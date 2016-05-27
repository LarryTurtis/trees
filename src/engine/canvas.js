import { ShapesRegistry } from './shapesregistry.js'
import { updateCollisions } from './collisions/collisionDetection.js'
import { collisionHandler } from './collisions/collisionHandler.js'
import { Point } from './point.js'

let shapesRegistry = new ShapesRegistry();
let now;
let then = Date.now();
let delta;


CanvasRenderingContext2D.prototype.curve = function(points) {
    if (points) {
        this.bezierCurveTo(points.cp1.x, points.cp1.y, points.cp2.x, points.cp2.y, points.end.x, points.end.y);
    }
};

CanvasRenderingContext2D.prototype.yLine = function(a) {
    this.lineTo(a.x, a.y);
};

CanvasRenderingContext2D.prototype.yRect = function(rect) {
    this.yMove(rect.a);
    this.yLine(rect.b);
    this.yLine(rect.c);
    this.yLine(rect.d);
    this.yLine(rect.a);
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
        this._center = new Point(this.element.width / 2, this.element.height / 2);
        this._width = this.element.width;
        this._height = this.element.height;
        this._fps = 60;
        this.interval = 1000 / this._fps;
        this.blur = false;

    }

    set width(width) {
        this.element.width = width;
        this._width = width;
        this._center = new Point(width / 2, this._center.y);
    }

    set height(height) {
        this.element.height = height;
        this._height = height;
        this._center = new Point(this._center.x, height / 2);
    }

    get width() {
        return this._width;
    }

    get fps() {
        return this._fps;
    }

    set fps(fps) {
        this._fps = fps;
        this.interval = 1000 / fps;
    }

    get height() {
        return this._height;
    }

    get center() {
        return this._center;
    }

    animate(callback) {
        requestAnimationFrame(() => {
            this.animate(callback);
        });

        now = Date.now();
        delta = now - then;

        if (delta > this.interval) {
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

            then = now - (delta % this.interval);

            // ... Code for Drawing the Frame ...
            if (shapesRegistry.length) {
                if (!this.blur) this.ctx.clearRect(0, 0, this.width, this.height);

                shapesRegistry.forEach(shape => {
                    let collisions = [];
                    if (shape.x > this.width || shape.x + shape.width < 0) {
                        shapesRegistry.remove(shape);
                    }
                    if (shape.y > this.height || shape.y + shape.height < 0) {
                        shapesRegistry.remove(shape);
                    }

                    if (shape.animate) {
                        shape.animate();
                    }

                    if (shape.collidable) {
                        collisions = updateCollisions(shape);
                        if (collisions.length) {
                            collisions.forEach(collisionHandler);
                        }
                    }

                    shape.draw(this.ctx);
                });

                callback();
            }


        }


    }


};

export { Canvas }
