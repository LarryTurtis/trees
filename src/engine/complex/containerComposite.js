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
    }

    get containers() {
        return this._containers;
    }

    get liquids() {
        return this._liquids;
    }

    get pouringFromPoint() {
        let pouringFromPoint = null;
        this.liquids.forEach(liquid => {
            pouringFromPoint = pouringFromPoint || liquid.pouringFromPoint;
        });
        return pouringFromPoint;
    }

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

    get pourWidth() {
        let result = null;
        if (this.pouringFromPoint && this.activeOpeningEdge) {
            result = Math.abs(trees.getDistance(this.pouringFromPoint, this.activeOpeningEdge));
        }
        return result;
    }

    get pouring() {
        let result = false;
        this.containers.forEach(container => {
            result = result || container.pouring;
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
        this.liquids.forEach(liquid => {
            liquid.level();
        });
        this.pour();
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

    addMeniscus(factor) {
        this.removeMeniscus();
        this.meniscus = new Meniscus(this.pouringFromPoint.x, this.pouringFromPoint.y, this.pourWidth, 5, this.activeOpeningEdge);
        this.meniscus.color = this.liquidColor;
        this.meniscus.factor = factor;
        super.addShape(this.meniscus);
    }

    removeMeniscus() {
        this.removeShape(this.meniscus)
    }

    hideMeniscus() {
        if (this.meniscus) this.meniscus.visible = false;
    }

    pour() {
        if (this.pouring) {
            let start = this.pouringFromPoint;
            if (!pour) {
                pour = new Pour(start.x, start.y, 5, 5);
                pour.color = this.liquidColor;
                super.addShape(pour);
            }

            this.addMeniscus(1);

            pour.startPour();
            if (!this.timer) {
                let overhangFactor = 1;
                this.timer = setInterval(() => {
                    if (this.pouring && !this.empty) {
                        overhangFactor -= 0.1
                        this.drain(1);
                        pour.dripSpeed += .5;
                        this.addMeniscus(overhangFactor)
                    } else {
                        pour.stopPour();
                        this.hideMeniscus();
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 10);
            }

        } else {
            if (pour) {
                pour.stopPour();
                this.hideMeniscus();
            }
            if (this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        }
    }

}

export { ContainerComposite }
