import { ComplexShape } from './complexShape.js';
import { Liquid } from './liquid.js';
import { PourComposite } from './pourComposite.js';
import { Meniscus } from './meniscus.js';
import { Container } from './container.js';
import { Line } from '../line.js';

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
        this._collidable = true;
        this._thickness = 0;
        this.drainVolume = 0.5;
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

    /**
     * .level
     * Represents liquid level line as percentage of container's overall height
     */
    get level() {
        return ((this.height - (this.liquidLevel - this.y)) / (this.height)) * 100;
    }

    set level(level) {
        if (typeof level !== "number" ||
            level < 0 || level > 100) {
            throw new Error("Level value must be a number between zero and 100.")
        }
        this.liquidLevel = this.y + this.height * (100 - level) / 100;
    }

    /**
     * .liquidLevel
     * Represents actual y-value of liquid level line.
     */
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
     * .liquidTop
     * represents the 'top' line of the liquid in container
     * start = left, end = right
     */
    get liquidTop() {
        let liquidTop = null;
        let start = null;
        let end = null;
        this.liquids.forEach(liquid => {
            liquid.lines.forEach(line => {
                if (line.start.y === this.liquidLevel) {
                    start = line.start;
                }
                if (line.end.y === this.liquidLevel) {
                    end = line.end;
                }
            });
        });
        if (start && end) {
            if (start.x < end.x) {
                liquidTop = new Line(start, end);
            } else {
                liquidTop = new Line(end, start);
            }
        }
        return liquidTop;
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

    get thickness() {
        return this._thickness;
    }

    set thickness(thickness) {
        this._thickness = thickness;
        this.containers.forEach(container => {
            container.thickness = thickness;
        });
        this.liquids.forEach(liquid => {
            liquid.applyThickness();
        })
    }

    rotate(deg, transformOrigin) {
        let oldArea = this.liquidArea;
        super.rotate(deg, transformOrigin);

        // this function needs rework, it's causing a lot of internal looping
        // if (oldArea < this.liquidArea) {
        //     while (oldArea < this.liquidArea) {
        //         this.drain(0.1);
        //     }
        // } else if (oldArea > this.liquidArea) {
        //     while (oldArea > this.liquidArea) {
        //         this.fill(0.1);
        //     }
        // }
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

    get liquidArea() {
        let area = 0;
        this.liquids.forEach(liquid => {
            area += liquid.area;
        });
        return area;
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

    startDraining() {
        this.draining = true;
    }

    stopDraining() {
        this.draining = false;
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

    //this function is called continuously?
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

    startPour() {
        let start = this.activeOpeningEdge;
        if (!this.pourComposite) {
            this.pourComposite = new PourComposite(start.x, start.y, this.meniscus.overhangWidth, 5);
            this.pourComposite.color = this.liquidColor;
            super.addShape(this.pourComposite);
            // this.moveDrawOrderBack(this.pourComposite);
        } else {
            this.pourComposite.width = this.orientation === "I" ||
                this.orientation === "IV" ? this.meniscus.overhangWidth : -this.meniscus.overhangWidth;
            this.pourComposite.x = start.x;
            this.pourComposite.y = start.y;
        }

        this.pourComposite.start();
    }

    stopPour() {
        if (this.pourComposite) {
            this.pourComposite.stop();
        }
    }

    animate() {
        super.animate();
        if (this.draining) {
            this.drain(this.drainVolume);
        }
        if (this.filling) {
            this.fill(this.drainVolume);
        }
    }

    createSATObject() {
        let response = [];

        this.containers.forEach(container => {
            response = response.concat(container.createSATObject());
        });

        if (this.pourComposite) {
            response = response.concat(this.pourComposite.createSATObject());
        }

        if (this.liquidTop) {
            response = response.concat(this.liquidTop.createSATObject());
        }
        return response;
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
