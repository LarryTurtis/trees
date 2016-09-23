import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class HotAirBalloon extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "HotAirBalloon";

        this.balloon = new complex.Balloon(x, y, width, height);
        this.basket = new simples.Rectangle(trees.getCenterX(width.percent(15), this.balloon), y + height.percent(140), width.percent(15), height.percent(15));
        this.leftString = new simples.Rectangle(trees.getCenterX(width.percent(15), this.balloon) + width.percent(1), y + height.percent(125), width.percent(1), height.percent(15));
        this.rightString = new simples.Rectangle(trees.getCenterX(width.percent(15), this.balloon) + width.percent(13), y + height.percent(125), width.percent(1), height.percent(15));

        this.addShape(this.balloon);
        this.addShape(this.leftString);
        this.addShape(this.basket);
        this.addShape(this.rightString);

    }

    get color() {
        return super.color;
    }

    set color(color) {
        super.color = color;
        this.leftString.color = "black";
        this.rightString.color = "black";
        this.basket.color = "white";
    }

}

export { HotAirBalloon }