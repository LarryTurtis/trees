import { CircularShape } from '../circularShapes/circularShape.js';

class ThickShape extends CircularShape {
    constructor(x, y, width, height, thickness) {
        super(x, y, width, height);
        this.type = "ThickShape";
        this._thickness = thickness || 1;
    }

    addShape(shape) {
        super.addShape(shape);
        this.relativeThickness = this.thickness / this.width;
    }

    get thickness() {
        return this._thickness;
    }

    set thickness(thickness) {
        this._thickness = thickness;
    }

}

export { ThickShape }
