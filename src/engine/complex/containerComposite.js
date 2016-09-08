import { decorateContainer } from './container.js';
import { ComplexShape } from './complexShape.js';

class ContainerComposite extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "ContainerComposite";
        this._liquidColor = "transparent";
        this._containers = [];
        this._liquids = [];
    }

    get liquidLevelShape() {
        return this._liquidLevelShape;
    }

    set liquidLevelShape(liquidLevelShape) {
        this._liquidLevelShape = liquidLevelShape;
    }

    get liquidColor() {
        return this._liquidColor;
    }

    set liquidColor(liquidColor) {
        this._liquidColor = liquidColor;
        this.shape.forEach(shape => {
            shape.liquidColor = liquidColor;
        });
    }

    get liquidLevel() {
        return this._liquidLevel;
    }

    set liquidLevel(liquidLevel) {
        this._liquidLevel = liquidLevel;
        this.shape.forEach(shape => {
            shape.liquidLevel = liquidLevel;
        });
    }

    get containers() {
        return this._containers;
    }

    get liquids() {
        return this._liquids;
    }

    get full() {
        let result = true;
        this.containers.forEach(shape => {
            result = result && shape.full
        });
        return result;
    }

    get empty() {
        let result = true;
        this.containers.forEach(shape => {
            result = result && shape.empty
        });
        return result;
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.liquids.forEach(liquid => {
            liquid.level();
        });
    }

    addShape(shape) {
        let containerShape = decorateContainer(shape);

        super.addShape(containerShape);
        super.addShape(containerShape.liquid);

        this.containers.push(containerShape);
        this.liquids.push(containerShape.liquid);

        if (!this.liquidLevelShape) {
            this.liquidLevelShape = containerShape;
        }
    }

    drain(amount) {
        while (amount > 0 && !this.empty) {
            if (this.liquidLevelShape.empty) {
                this.liquidLevelShape.liquid.color = "transparent";
                let currentIndex = this.containers.indexOf(this.liquidLevelShape);
                let newIndex = Math.min(currentIndex + 1, this.containers.length - 1);
                this.liquidLevelShape = this.containers[newIndex];
            }

            amount = this.liquidLevelShape.drain(amount);
        }

    }

    fill(amount) {
        while (amount > 0 && !this.full) {
            if (this.liquidLevelShape.full) {
                let currentIndex = this.containers.indexOf(this.liquidLevelShape);
                let newIndex = Math.max(currentIndex - 1, 0);
                this.liquidLevelShape = this.containers[newIndex];
            }
            this.liquidLevelShape.liquid.color = this.liquidColor;
            amount = this.liquidLevelShape.fill(amount);
        }
    }

}

export { ContainerComposite }
