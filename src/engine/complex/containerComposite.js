import { decorateContainer } from './container.js';
import { ComplexShape } from './complexShape.js';

class ContainerComposite extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "ContainerComposite";
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

    get liquid() {
        return this.shape[0].liquid;
    }

    set liquidColor(liquidColor) {
        this._liquidColor = liquidColor;
        this.shape.forEach(shape => {
            shape.liquidColor = liquidColor;
        });
    }

    addShape(shape) {
        let containerShape = decorateContainer(shape);
        super.addShape(containerShape);
        super.addShape(containerShape.liquid);
        if (!this.liquidLevelShape) {
            this.liquidLevelShape = containerShape;
        }
    }

    fill(amount) {
        if (this.liquidLevelShape.empty) {
            let currentIndex = this.shape.indexOf(this.liquidLevelShape);
            let newIndex = Math.min(currentIndex + 2, this.shape.length - 1);
            if (this.shape[newIndex].type !== "Liquid") {
                this.liquidLevelShape = this.shape[newIndex];
            }
        }

        this.liquidLevelShape.fill(amount);

    }

}

export { ContainerComposite }
