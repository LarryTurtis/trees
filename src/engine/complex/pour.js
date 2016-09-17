import { ComplexShape } from './complexShape.js';
import { Point } from '../point.js';
import { Line } from '../line.js';

const POURSPEED = 5;

class Pour extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Pour";
        this.drops = [];
        this.pourTimer;
        this._pourSpeed = POURSPEED;
        this._pouring = false;
    }

    pour() {
        if (this.drops.length) {
            this.drops.forEach((drop, index) => {
                if (this.pouring) drop.end.x = this.x + this.width;
                drop.start.y += 1;
                drop.end.y += 1;
                if (drop.start.y > window.innerHeight) {
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

            let start = new Point(this.origin.x, this.origin.y)
            let end = new Point(this.origin.x + this.width, this.origin.y)
            let drop = new Line(start, end);

            this.drops.push(drop);
        }
    }

    removeDrop(drop) {
        let index = this.drops.indexOf(drop);
        if (index >= 0) {
            this.drops.splice(index, 1);
        }
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

    createSATObject() {
        if (this.drops.length) {
            let lastDrop = this.drops[0];
            return [new SAT.Polygon(new SAT.Vector(0, 0), [
                new SAT.Vector(lastDrop.end.x, lastDrop.end.y),
                new SAT.Vector(lastDrop.end.x, lastDrop.end.y + 5),
                new SAT.Vector(lastDrop.start.x, lastDrop.end.y + 5),
                new SAT.Vector(lastDrop.start.x, lastDrop.start.y),
            ])];
        } else {
            return [];
        }

    }

    draw(ctx) {
        super.draw(ctx);
        if (this.drops.length) {
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.yMove(this.drops[0].start);
            this.drops.forEach(drop => {
                ctx.yLine(drop.start);
            });
            this.drops.reverse();
            ctx.yLine(this.drops[0].end);
            this.drops.forEach(drop => {
                ctx.yLine(drop.end);
            });
            this.drops.reverse();
            ctx.yLine(this.drops[0].start);
            ctx.fill();
            ctx.closePath();
        }
    }

}

export { Pour }