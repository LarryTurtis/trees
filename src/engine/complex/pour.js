import { ComplexShape } from './complexShape.js';
import { Point } from '../point.js';
import { Drop } from '../simples/drop.js';

const POURSPEED = 5;

class Pour extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Pour";
        this.pourTimer;
        this._pourSpeed = POURSPEED;
        this._pouring = false;
    }

    pour() {
        if (this.shape.length) {
            this.shape.forEach(drop => {
                drop.y += 3;
                if (drop.y + drop.height > window.innerHeight) {
                    this.removeDrop(drop)
                }
            });
        }
        if (this.pouring) this.addDrop();
    }

    get pouring() {
        return this._pouring;
    }

    set pouring(pouring) {
        this._pouring = pouring;
    }

    get pourSpeed() {
        return this._pourSpeed;
    }

    set pourSpeed(pourSpeed) {
        this._pourSpeed = pourSpeed;
        if (this.pourTimer) {
            clearInterval(this.pourTimer);
            this.pourTimer = setInterval(() => { this.pour() }, pourSpeed);
        }
    }

    addDrop() {
        if (this.pouring) {
            let drop = new Drop(this.origin.x, this.origin.y, this.width, 1);
            drop.type = "Drop";
            this.addShape(drop);
        }
    }

    removeDrop(drop) {
        this.removeShape(drop);
    }

    start() {
        this.pouring = true;
        if (!this.pourTimer) {
            this.pourTimer = setInterval(() => { this.pour(); }, POURSPEED);
        }
    }

    stop() {
        this.pouring = false;
    }

    draw(ctx) {
        super.draw(ctx);
        if (this.shape.length) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.yMove(this.shape[0].a);
            this.shape.forEach(drop => {
                ctx.yLine(drop.d);
            });
            this.shape.reverse();
            ctx.yLine(this.shape[0].c);
            this.shape.forEach(drop => {
                ctx.yLine(drop.b);
            });
            this.shape.reverse();
            ctx.yLine(this.shape[0].a);
            ctx.fill();
            ctx.closePath();
        }
    }

}

export { Pour }
