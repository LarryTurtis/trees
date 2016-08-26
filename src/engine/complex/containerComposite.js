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
        if (!this.liquidLevelShape) {
            this.liquidLevelShape = containerShape;
        }
    }

    fill(amount) {
        if (this.liquidLevelShape.empty) {
            let newIndex = this.shape.indexOf(this.liquidLevelShape) + 1;
            if (newIndex <= this.shape.length - 1) this.liquidLevelShape = this.shape[newIndex];
        }
        this.liquidLevelShape.fill(amount);

    }

}

export { ContainerComposite }
