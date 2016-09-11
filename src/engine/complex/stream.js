import { Sprite } from '../sprite.js'

class Stream extends Sprite {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Stream";
        this.drops = [];
        this.pourTimer;
        this._pouring = false;

    }

    pour() {
        if (this.drops.length) {
            this.drops.forEach(drop => {
                drop.y += 3;
                if (drop.y + drop.height > window.innerHeight) {
                    this.removeDrop(drop)
                }
            });
        } else {
            clearInterval(this.pourTimer);
            this.pourTimer = null;
        }
    }

    get pouring() {
        return this._pouring;
    }

    set pouring(pouring) {
        this._pouring = pouring;
    }

    addDrop() {

        let x = trees.random(this.x, this.x + this.width);
        let y = trees.random(this.y, this.y + this.height);
        let size = trees.random(1, 5);
        let color = trees.setOpacity("orange", Math.random())
        let drop = {
            x: x,
            y: y,
            width: size,
            height: size,
            color: color
        };

        this.drops.push(drop);
    }

    removeDrop(drop) {
        this.drops.splice(this.drops.indexOf(drop), 1);
    }

    startPour() {
        this.pouring = true;
        if (!this.pourTimer) {
            this.pourTimer = setInterval(() => {
                if (this.pouring) this.addDrop();
                this.pour();
            }, 10);
        }
    }

    stopPour() {
        this.pouring = false;
    }

    draw(ctx) {
        super.draw(ctx);
        this.drops.forEach(drop => {
            ctx.beginPath();
            ctx.fillStyle = drop.color;
            ctx.rect(drop.x, drop.y, drop.width, drop.height);
            ctx.fill();
            ctx.closePath();
        });
    }

}

export { Stream }