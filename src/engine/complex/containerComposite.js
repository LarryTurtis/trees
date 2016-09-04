import { decorateContainer } from './container.js';
import { ComplexShape } from './complexShape.js';

class ContainerComposite extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "ContainerComposite";
        this._liquidColor = "transparent";
        this._containers = [];
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

    get containers() {
        return this._containers;
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

    addShape(shape) {
        let containerShape = decorateContainer(shape);

        super.addShape(containerShape);
        super.addShape(containerShape.liquid);

        this.containers.push(containerShape);

        if (!this.liquidLevelShape) {
            this.liquidLevelShape = containerShape;
        }
    }

    drain(amount) {

        let remainder = 1;

        while (remainder > 0 && !this.empty) {
            if (this.liquidLevelShape.empty) {
                let currentIndex = this.containers.indexOf(this.liquidLevelShape);
                let newIndex = Math.min(currentIndex + 1, this.containers.length - 1);
                this.liquidLevelShape = this.containers[newIndex];
            }

            remainder = this.liquidLevelShape.drain(amount);
        }

    }

    fill(amount) {
        let remainder = 1;
        while (remainder > 0 && !this.full) {
            console.log(this.liquidLevelShape);
            if (this.liquidLevelShape.full) {
                let currentIndex = this.containers.indexOf(this.liquidLevelShape);
                let newIndex = Math.max(currentIndex - 1, 0);
                this.liquidLevelShape = this.containers[newIndex];
            }

            remainder = this.liquidLevelShape.fill(amount);
        }
    }

}

export { ContainerComposite }
