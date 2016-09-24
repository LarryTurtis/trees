import { ShapesRegistry } from './shapesregistry.js'
import { updateCollisions } from './collisions/collisionDetection.js'
import { collisionHandler } from './collisions/collisionHandler.js'
import { Point } from './point.js'

let shapesRegistry = new ShapesRegistry();
let now;
let then = Date.now();
let delta;
let instance = null;

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
        if (!instance) {
            instance = this;
            this.element = document.createElement('canvas');
            this.ctx = this.element.getContext("2d");
            this._center = new Point(this.element.width / 2, this.element.height / 2);
            this._width = this.element.width;
            this._height = this.element.height;
            this._fps = 24;
            this.interval = 1000 / this._fps;
            this.blur = false;
            this.parentNode = document.getElementById("main") || document.body;

            let dpr = window.devicePixelRatio || 1;
            let bsr = this.ctx.webkitBackingStorePixelRatio ||
                this.ctx.mozBackingStorePixelRatio ||
                this.ctx.msBackingStorePixelRatio ||
                this.ctx.oBackingStorePixelRatio ||
                this.ctx.backingStorePixelRatio || 1;

            this.pixelRatio = dpr / bsr;

            //Create canvas with the device resolution.
            this.createCanvas(500, 250);

            //Create canvas with a custom resolution.
            //var myCustomCanvas = createHiDPICanvas(500, 200, 4);
        }

        return instance;
    }

    measureText(text, font) {
        this.ctx.font = font;
        return this.ctx.measureText(text).width;
    }

    createCanvas(w, h, ratio) {
        try {
            this.parentNode.removeChild(this.element);
        } catch (e) {

        }

        if (!ratio) { ratio = this.pixelRatio; }
        let can = document.createElement('canvas');
        can.width = w * ratio;
        can.height = h * ratio;
        can.style.width = w + "px";
        can.style.height = h + "px";

        this.ctx = can.getContext("2d");
        this.element = can;
        this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        this.parentNode.appendChild(this.element);
    }

    set width(width) {
        this._width = width;
        this._center = new Point(width / 2, this._center.y);
        this.createCanvas(width, this.height);
    }

    set height(height) {
        this._height = height;
        this._center = new Point(this._center.x, height / 2);
        this.createCanvas(this.width, height);
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

    addEventListener(event, func) {
        this.element.addEventListener(event, func, false);
    }

    dispatchEvent(event) {
        this.element.dispatchEvent(event);
    }

    getBoundingClientRect() {
        return this.element.getBoundingClientRect();
    }

    animate() {
        requestAnimationFrame(() => {
            this.animate();
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
                    if (shape.x > this.width * 3 || shape.x + shape.width < -this.height) {
                        shapesRegistry.remove(shape);
                        return;
                    }

                    if (shape.y > this.height * 3 || shape.y + shape.height < -this.height) {
                        shapesRegistry.remove(shape);
                        return;
                    }

                    let collisions = [];

                    if (shape.animate) {
                        shape.animate();
                    }
                    if (shape.callback) {
                        shape.callback();
                    }

                    if (shape.collidable) {
                        collisions = updateCollisions(shape);
                        if (collisions.length) {
                            collisions.forEach(collisionHandler);
                        }
                    }

                    if (shape.visible) shape.draw(this.ctx);
                });

            }


        }


    }


};

export { Canvas }
