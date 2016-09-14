import { ComplexShape } from './complexShape.js';
import { Liquid } from './liquid.js';
import { Pour } from './pour.js';
import { Meniscus } from './meniscus.js';
import { Container } from './container.js';


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
        this._speed = 10;
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
    * .opening
    * Returns the first line defined as an opening for the container.
    * (Composite can only have one opening line).
    */

    get opening() {
        let result = null;
        this.containers.forEach(container => {
            if (container.openingIndex >= 0) {
                result = container.lines()[container.openingIndex] || result;
            }
        });
        return result;
    }

    /**
     * .activeOpeningEdge
     * represents the 'spout' of the container. point at which liquid exits.
     */

    get activeOpeningEdge() {
        let opening = this.opening;
        if (opening) {
            return opening.start.y > opening.end.y ? opening.start : opening.end;
        }
        return opening;
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

    get speed() {
        return this._speed;
    }

    set speed(speed) {
        this._speed = speed;
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

    get orientation() {
        let opening = this.opening;
        let result = null;
        if (opening) {
            if (opening.start.x <= opening.end.x && opening.start.y <= opening.end.y) {
                result = "I";
            }
            if (opening.start.x <= opening.end.x && opening.start.y > opening.end.y) {
                result = "II";
            }
            if (opening.start.x > opening.end.x && opening.start.y > opening.end.y) {
                result = "III";
            }
            if (opening.start.x > opening.end.x && opening.start.y <= opening.end.y) {
                result = "IV";
            }
        }
        return result;
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

        this.handleOverflow();

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
        this.meniscus = new Meniscus(this.overflowStart.x, this.overflowStart.y, this.pourWidth, 5, this.activeOpeningEdge, this.orientation);
        this.meniscus.color = this.liquidColor;
        super.addShape(this.meniscus);
    }

    removeMeniscus() {
        this.removeShape(this.meniscus);
    }

    handleOverflow() {
        if (this.overflowing) {
            this.addMeniscus();
            this.startPour();
            this.startDraining();
        } else {
            this.removeMeniscus();
            this.stopPour();
            this.stopDraining();
        }
    }

    startDraining() {
        let drainVolume = 0;

        if (!this.drainTimer) {
            this.drainTimer = setInterval(() => {
                if (!this.empty) {
                    this.drain(drainVolume);
                } else {
                    this.stopDraining();
                }
            }, this.speed);
        }
    }

    stopDraining() {
        clearInterval(this.drainTimer);
        this.drainTimer = null;
    }

    startPour() {
        let start = this.activeOpeningEdge;

        if (!this.pour) {
            this.pour = new Pour(start.x, start.y, this.meniscus.overhangWidth, 5);
            this.pour.color = this.liquidColor;
            this.pourSpeed = this.speed;
            super.addShape(this.pour);
        } else {
            this.pour.width = this.meniscus.overhangWidth;
        }

        this.pour.start();


    }

    stopPour() {
        if (this.pour) {
            this.pour.stop();
        }
    }

    draw(ctx) {
        if (this.liquids.length) {
            this.liquids.forEach(liquid => {
                liquid.draw(ctx);
            });
        }
        if (this.containers.length) {
            this.containers.forEach(container => {
                container.draw(ctx);
            });
        }
        if (this.shape.length) {
            this.shape.forEach(shape => {
                if (shape.type !== "Container" && shape.type !== "Liquid") {
                    shape.draw(ctx);
                }
            });
        }
    }

}

export { ContainerComposite }