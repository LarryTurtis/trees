import { Drop } from './drop.js';

class Pour {
    constructor(origin, width) {
        this.drops = [];
        this._width = width;
        this.origin = origin;
        this.addDrop();
        this.type = "Pour";

        this.oscillateSpeed = 100;
        this.oscillate = false;
        this.oscillateInterval = 1;

        this.oscillateTimer = setInterval(() => {
            this.oscillateInterval *= -1;
        }, this.oscillateSpeed);
    }

    pour(amount) {
        this.drops.forEach((drop, index) => {
            drop.y += amount;
            drop.y += amount;
            if (drop.y > window.innerHeight.percent(110)) {
                this.removeDrop(drop)
            }
        });
    }

    get width() {
        return this._width;
    }

    set width(width) {
        this._width = width;
    }

    addDrop() {
        let drop = new Drop(this.origin, this.width)
        if (this.oscillate) {
            drop.x = this.origin.x + this.oscillateInterval;
        }
        this.drops.push(drop);
    }

    removeDrop(drop) {
        let index = this.drops.indexOf(drop);
        if (index >= 0) {
            this.drops.splice(index, 1);
        }
    }

    createSATObject() {
        if (this.drops.length) {
            let lastDrop = this.drops[0];
            return [new SAT.Polygon(new SAT.Vector(0, 0), [
                new SAT.Vector(lastDrop.end.x, lastDrop.end.y),
                new SAT.Vector(lastDrop.end.x, lastDrop.end.y - 100),
                new SAT.Vector(lastDrop.start.x, lastDrop.end.y - 100),
                new SAT.Vector(lastDrop.start.x, lastDrop.start.y),
            ])];
        } else {
            return [];
        }

    }

    draw(ctx) {
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