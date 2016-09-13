import { ComplexShape } from './complexShape.js';
import { Liquid } from './liquid.js';
import { Pour } from './pour.js';
import { Meniscus } from './meniscus.js';
import { Container } from './container.js';

let pour = null;

class ContainerComposite extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "ContainerComposite";
        this._liquidColor = "transparent";
        this._containers = [];
        this._liquids = [];
        this._liquidLevel = y;
        this._empty = false;
        this._full = true;
    }

    get liquidColor() {
        return this._liquidColor;
    }

    set liquidColor(liquidColor) {
        this._liquidColor = liquidColor;
        this.liquids.forEach(shape => {
            shape.color = liquidColor;
        });
    }

    get liquidLevel() {
        return this._liquidLevel;
    }

    set liquidLevel(liquidLevel) {
        this._liquidLevel = liquidLevel;

        this.empty = this.liquidLevel >= this.boundary.d.y;
        this.full = this.liquidLevel <= this.boundary.a.y;
        this.liquids.forEach(shape => {
            shape.liquidLevel = liquidLevel;
        });
        this.handleOverflow();
    }

    get containers() {
        return this._containers;
    }

    get liquids() {
        return this._liquids;
    }

    /**
    * Represents the highest point of overflow against the container's opening
    * i.e., the size of the overflow
    */

    get overflowStart() {
        let overflowStart = null;
        this.liquids.forEach(liquid => {
            overflowStart = overflowStart || liquid.overflowStart;
        });
        return overflowStart;
    }

    /**
    * .activeOpeningEdge
    * represents the 'spout' of the container. point at which liquid exits.
    */

    get activeOpeningEdge() {
        let edge = null;
        this.containers.forEach(container => {
            if (container.openingIndex >= 0) {
                let opening = container.lines()[container.openingIndex];
                if (opening) {
                    edge = opening.start.y > opening.end.y ? opening.start : opening.end;
                }
            }
        });
        return edge;
    }

    /**
    * .pourWidth
    * Distance between the container opening and point of overflow
    */

    get pourWidth() {
        let result = null;
        if (this.overflowStart && this.activeOpeningEdge) {
            result = Math.abs(trees.getDistance(this.overflowStart, this.activeOpeningEdge));
        }
        return result;
    }

    /**
    * .overflowing
    * Boolean 
    * Returns true if any opening of the composite is overflowing
    */

    get overflowing() {
        let result = false;
        this.containers.forEach(container => {
            result = result || container.overflowing;
        });
        return result;
    }

    get full() {
        return this._full;
    }

    set full(full) {
        this._full = full;
    }

    get empty() {
        return this._empty;
    }

    set empty(empty) {
        this._empty = empty;
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.handleOverflow();
    }

    addShape(shape) {

        let container = Container(shape);
        let liquid = new Liquid(container);

        liquid.color = this.liquidColor;
        liquid.liquidLevel = this.liquidLevel;

        super.addShape(container);
        super.addShape(liquid);

        this.containers.push(container);
        this.liquids.push(liquid);

    }

    drain(amount) {
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Tried to use drain function with invalid amount.')
        }
        if (!this.empty) {
            this.liquidLevel += amount;
        }

        this.empty = this.liquidLevel >= this.boundary.d.y;
        this.full = this.liquidLevel <= this.boundary.a.y;

    }

    fill(amount) {
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Tried to use drain function with invalid amount.')
        }
        if (!this.full) {
            this.liquidLevel -= amount;
        }

        this.empty = this.liquidLevel >= this.boundary.d.y;
        this.full = this.liquidLevel <= this.boundary.a.y;
    }

    addMeniscus() {
        this.removeMeniscus();
        this.meniscus = new Meniscus(this.overflowStart.x, this.overflowStart.y, this.pourWidth, 5, this.activeOpeningEdge);
        this.meniscus.color = this.liquidColor;
        super.addShape(this.meniscus);
    }

    removeMeniscus() {
        this.removeShape(this.meniscus);
    }

    handleOverflow() {
        if (this.overflowing) {
            this.startPour();
            this.addMeniscus();
            this.startDraining();
        } else {
            this.stopPour();
            this.removeMeniscus();
            this.stopDraining();
        }
    }

    startDraining() {
        let drainVolume = 1;
        let drainSpeed = 10;

        if (!this.drainTimer) {
            this.drainTimer = setInterval(() => {
                if (!this.empty) {
                    this.drain(drainVolume);
                } else {
                    this.stopDraining();
                }
            }, drainSpeed);
        }
    }

    stopDraining() {
        clearInterval(this.drainTimer);
        this.drainTimer = null;
    }

    startPour() {

        let start = this.overflowStart;

        if (!pour) {
            pour = new Pour(start.x, start.y, this.pourWidth, 5);
            pour.color = this.liquidColor;
            super.addShape(pour);
        }

        pour.start();

        if (!this.dripTimer) {
            this.dripTimer = setInterval(() => {
                pour.dripSpeed += .5;
            }, 10);
        }

    }

    stopPour() {
        if (pour) {
            pour.stop();
        }
        if (this.dripTimer) {
            clearInterval(this.dripTimer);
            this.dripTimer = null;
        }
    }

}

export { ContainerComposite }
