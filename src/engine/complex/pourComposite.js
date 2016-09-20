import { ComplexShape } from './complexShape.js';
import { Pour } from './pour.js';

const POURSPEED = 6;

class PourComposite extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "PourComposite";
        this.pours = [];
        this._pourSpeed = POURSPEED;
        this._pouring = false;
        this.pourTimer = null;
    }

    pour() {
        if (this.pours.length) {
            this.pours.forEach(pour => {
                pour.pour(this.pourSpeed);
            });
        }
        if (this.pouring) this.activePour.addDrop();
    }

    get x() {
        return super.x;
    }

    set x(x) {
        super.x = x;
        this.activePour.origin.x = x;
    }

    get y() {
        return super.y;
    }

    set y(y) {
        super.y = y;
        this.activePour.origin.y = y;
    }

    get width() {
        return super.width;
    }

    set width(width) {
        super.width = width;
        this.activePour.width = width;
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
    }

    get activePour() {
        if (this.pours.length) {
            return this.pours[this.pours.length - 1];
        } else {
            return null;
        }
    }

    addPour() {
        this.pours.push(new Pour(this.origin, this.width));
    }

    animate() {
        if (this.pouring || this.finishing) this.pour();
    }

    start() {
        if (!this.pouring) {
            this.addPour();
            this.pouring = true;
        }
    }

    stop() {
        this.pouring = false;
        this.finishing = true;
        this.pourTimer = setInterval(() => {
            if (!this.activePour.drops.length) {
                this.finishing = false;
                clearInterval(this.pourTimer);
                this.pourTimer = null;
            }
        }, 10);
    }

    createSATObject() {
        let response = [];
        this.pours.forEach(pour => {
            response = response.concat(pour.createSATObject());
        });
        return response;
    }

    draw(ctx) {
        super.draw(ctx);
        if (this.pours.length) {
            this.pours.forEach(pour => {
                pour.draw(ctx);
            })
        }
    }

}

export { PourComposite }