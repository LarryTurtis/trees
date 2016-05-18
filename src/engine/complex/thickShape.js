import { simples } from '../simples/simples.js';
import { CircularShape } from './circularShape.js';

class ThickShape extends CircularShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle);
        this.type = "ThickShape";
        this._thickness = thickness || 1;
    }

    get thickness() {
        return this._thickness;
    }

    set thickness(thickness) {
        this._thickness = thickness;
    }

}

export { ThickShape }
