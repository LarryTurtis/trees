import { ComplexShape } from './complexShape.js';
import { Liquid } from './liquid.js';
import { PourComposite } from './pourComposite.js';
import { Meniscus } from './meniscus.js';
import { Container } from './container.js';
import { Line } from '../line.js';
import { Point } from '../point.js';
import { LevelLine } from './levelLine.js';

class ContainerComposite extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "ContainerComposite";
        this._liquidColor = "transparent";
        this._containers = [];
        this._liquids = [];
        this._levelLine = new LevelLine(y);
        this._speed = 10;
        this._collidable = false;
        this._thickness = 0;
        this.drainVolume = 0.4;
    }

    get x() {
        return super.x;
    }

    set x(x) {
        let oldX = this.x;
        let diffX = x - oldX;
        super.x = x;
        this.containers.forEach(container => {
            container.innerLines.forEach(line => {
                line.start.x += diffX;
                line.end.x += diffX;
            });
        });
        this.liquids.forEach(liquid => {
            liquid.lines.forEach(line => {
                line.start.x += diffX;
                line.end.x += diffX;
            });
        });
    }

    get y() {
        return super.y;
    }

    set y(y) {
        let oldY = this.y;
        let diffY = y - oldY;
        super.y = y;
        this.containers.forEach(container => {
            container.innerLines.forEach(line => {
                line.start.y += diffY;
                line.end.y += diffY;
            });
        });
        this.liquids.forEach(liquid => {
            liquid.lines.forEach(line => {
                line.start.y += diffY;
                line.end.y += diffY;
            });
        });
        this.levelLine += diffY;
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
        return ((this.height - (this.levelLine - this.y)) / (this.height)) * 100;
    }

    set level(level) {
        if (typeof level !== "number" ||
            level < 0 || level > 100) {
            throw new Error("Level value must be a number between zero and 100.")
        }
        this.levelLine = this.y + this.height * (100 - level) / 100;
    }

    /**
     * .levelLine
     * Represents actual y-value of liquid level line.
     */
    get levelLine() {
        return this._levelLine.y;
    }

    set levelLine(y) {
        this._levelLine.y = y;

        this.liquids.forEach(liquid => {
            liquid.level();
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
        let leftMost = null;
        let rightMost = null;
        this.liquids.forEach(liquid => {
            liquid.lines.forEach(line => {
                if (Math.abs(line.start.y - this.levelLine) < 0.0001) {
                    if (!leftMost || line.start.x < leftMost.x) leftMost = line.start;
                    if (!rightMost || line.start.x > rightMost.x) rightMost = line.start;
                }
                if (Math.abs(line.end.y - this.levelLine) < 0.0001) {
                    if (!leftMost || line.end.x < leftMost.x) leftMost = line.end;
                    if (!rightMost || line.end.x > rightMost.x) rightMost = line.end;
                }
            });
        });

        if (leftMost && rightMost) liquidTop = new Line(leftMost, rightMost);
        return liquidTop;
    }

    /**
     *.liquidCenterPoint
     * Represents the mid point of liquid top.
     */
    get liquidCenterPoint() {
        let liquidTop = this.liquidTop;
        if (liquidTop) {
            return new Point(liquidTop.start.x + (liquidTop.end.x - liquidTop.start.x) / 2, liquidTop.start.y);
        } else {
            return null;
        }
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
        return this.levelLine <= this.boundary.a.y;
    }

    get empty() {
        let empty = true;
        this.liquids.forEach(liquid => {
            empty = empty && !liquid.lines.length;
        })
        return empty;
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
            liquid.level();
        });
    }

    rotate(deg, transformOrigin) {
        let oldArea = this.liquidArea;
        super.rotate(deg, transformOrigin);

        if (!this.empty && this.liquidCenterPoint) {
            let center = this.liquidCenterPoint;
            this._levelLine.rotate(deg, transformOrigin);
            this._levelLine.rotate(-deg, center);
        }

        this.handleOverflow();
    }

    addShape(shape) {

        let container = Container(shape);

        let liquid = new Liquid(container);
        liquid.color = this.liquidColor;
        liquid.levelLine = this._levelLine;

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
            this.levelLine += amount;
        }

    }

    fill(amount) {
        if (typeof amount !== 'number' || amount < 0) {
            throw new Error('Tried to use drain function with invalid amount.')
        }
        if (!this.full) {
            this.levelLine -= amount;
        }
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

        // ctx.beginPath();
        // ctx.fillStyle = "red";
        // ctx.rect(this.liquidCenterPoint.x - 2.5, this.liquidCenterPoint.y - 2.5, 5, 5)
        // ctx.rect(this.liquidTop.start.x - 2.5, this.liquidTop.start.y - 2.5, 5, 5)
        // ctx.rect(this.liquidTop.end.x - 2.5, this.liquidTop.end.y - 2.5, 5, 5)
        // ctx.fill()
        // ctx.fillStyle = this.color;
        // ctx.closePath();
    }

}

export { ContainerComposite }