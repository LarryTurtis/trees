import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

class Lake extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Lake";

        this.wedge = new simples.Wedge(x + width.percent(50), y, width.percent(20), width.percent(20));
        this.wedge.rotate(-90, this.wedge.b)
        this.addShape(this.wedge);

        this.shoreLine1 = new complex.ShoreLine(x, y + height - width.percent(30), width.percent(70), width.percent(15));
        this.addShape(this.shoreLine1);

        this.shoreLine2 = new complex.ShoreLine(x + width.percent(15), y + height - width.percent(15), width.percent(40), width.percent(15));
        this.addShape(this.shoreLine2);

        this.rectangle1 = new simples.Rectangle(x + width.percent(70), y + height - width.percent(30), width.percent(30), width.percent(15));
        this.rectangle2 = new simples.Rectangle(x + width.percent(90), y, width.percent(10), width.percent(20));
        this.addShape(this.rectangle1);
        this.addShape(this.rectangle2);

        this.rectangle3 = new simples.Rectangle(x, y + height - width.percent(15), width.percent(15), width.percent(15));
        this.rectangle4 = new simples.Rectangle(x + width.percent(55), y + height - width.percent(15), width.percent(45), width.percent(15));
        this.addShape(this.rectangle3);
        this.addShape(this.rectangle4);
    }


}

export { Lake }