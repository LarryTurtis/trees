import { ComplexShape } from './complexShape.js'

const POURSPEED = 25;
const DRIPSPEED = 50;

class Pour extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Pour";
        this.drops = [];
        this.pourTimer;
        this.dripTimer;
        this._pourSpeed = POURSPEED;
        this._dripSpeed = DRIPSPEED;
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
        }
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

    get dripSpeed() {
        return this._dripSpeed;
    }

    set dripSpeed(dripSpeed) {
        this._dripSpeed = dripSpeed;
        if (this.dripTimer) {
            clearInterval(this.dripTimer)
            this.dripTimer = setInterval(() => { this.addDrop() }, dripSpeed)
        }
    }

    addDrop() {
        if (this.pouring) {
            let x = this.x;
            let y = this.y;
            let size = this.width;
            let color = this.color //trees.setOpacity("orange", Math.random())
            let drop = {
                x: x,
                y: y,
                width: size,
                height: 5,
                color: color
            };

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
            this.pourTimer = setInterval(() => { this.pour() }, POURSPEED);
        }
        if (!this.dripTimer) {
            this.dripTimer = setInterval(() => { this.addDrop() }, DRIPSPEED);
        }
    }

    stop() {
        this.pouring = false;

        clearInterval(this.dripTimer);
        this.dripTimer = null;
        this.dripSpeed = DRIPSPEED;
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

export { Pour }
