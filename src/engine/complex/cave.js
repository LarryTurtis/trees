import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { patterns } from '../patterns/patterns.js';
import { ComplexShape } from './complexShape.js';

class Cave extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Cave";

        let rectangle1 = new complex.Box(x - width.percent(3), y - width.percent(3), width.percent(30), height.percent(15));
        rectangle1.rotate(-20, rectangle1.center)
        new complex.RockyBorder(rectangle1, width.percent(5), rectangle1.lines()[2]);
        this.addShape(rectangle1);

        let rectangle2 = new complex.Box(width.percent(45), y - width.percent(5), width.percent(30), height.percent(15));
        rectangle2.rotate(20, rectangle2.center)
        new complex.RockyBorder(rectangle2, width.percent(5), rectangle2.lines()[2]);

        this.addShape(rectangle2);

        let rectangle3 = new complex.Box(width.percent(70), y - width.percent(5), width.percent(30), height.percent(15));
        rectangle3.rotate(-20, rectangle3.center)
        new complex.RockyBorder(rectangle3, width.percent(5), rectangle3.lines()[2]);

        this.addShape(rectangle3);

        let rectangle4 = new complex.Box(x, y + height.percent(10), width.percent(3), height.percent(60));
        new complex.RockyBorder(rectangle4, width.percent(5), rectangle4.lines()[1]);

        this.addShape(rectangle4);

        let rectangle5 = new complex.Box(x - width.percent(3), y + height.percent(75), width.percent(30), height.percent(15));
        rectangle5.rotate(20, rectangle5.center);
        new complex.RockyBorder(rectangle5, width.percent(5), rectangle5.lines()[0]);

        this.addShape(rectangle5);

        let rectangle6 = new complex.Box(x + width.percent(25), y + height.percent(75), width.percent(75), height.percent(15));
        rectangle6.rotate(-10, rectangle6.center);
        new complex.RockyBorder(rectangle6, width.percent(5), rectangle6.lines()[0]);

        this.addShape(rectangle6);

        let rectangle7 = new complex.Box(x + width.percent(97), y, width.percent(3), height.percent(80));
        new complex.RockyBorder(rectangle7, width.percent(5), rectangle7.lines()[3]);

        this.addShape(rectangle7);

        let rectangle8 = new complex.Box(x, y + height.percent(80), width, height.percent(20));
        this.addShape(rectangle8);
    }


}

export { Cave }