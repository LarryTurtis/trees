import { simples } from '../simples/simples.js';
import { complex } from '../complex/complex.js';
import { client } from './client.js';
import { patterns } from '../patterns/patterns.js';
import { ComplexShape } from '../complex/complexShape.js';

class Cave extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Cave";

        let rectangle1 = new complex.Box(x - width.percent(3), y - width.percent(3), width.percent(30), height.percent(15));
        rectangle1.rotate(-20, rectangle1.center)
        let edge1 = rectangle1.lines()[2];

        let rectangle2 = new complex.Box(width.percent(45), y - width.percent(5), width.percent(30), height.percent(15));
        rectangle2.rotate(20, rectangle2.center);
        let edge2 = rectangle2.lines()[2];

        let rectangle3 = new complex.Box(width.percent(70), y - width.percent(5), width.percent(30), height.percent(15));
        rectangle3.rotate(-20, rectangle3.center);
        let edge3 = rectangle3.lines()[2]

        let rectangle4 = new complex.Box(x, y + height.percent(10), width.percent(3), height.percent(60));
        let edge4 = rectangle4.lines()[1];

        let rectangle5 = new complex.Box(x - width.percent(3), y + height.percent(75), width.percent(30), height.percent(15));
        rectangle5.rotate(20, rectangle5.center);
        let edge5 = rectangle5.lines()[0];

        let rectangle6 = new complex.Box(x + width.percent(25), y + height.percent(75), width.percent(75), height.percent(15));
        rectangle6.rotate(-10, rectangle6.center);
        let edge6 = rectangle6.lines()[0];

        let rectangle7 = new complex.Box(x + width.percent(97), y, width.percent(3), height.percent(80));
        let edge7 = rectangle7.lines()[3];

        let rectangle8 = new complex.Box(x, y + height.percent(80), width, height.percent(20));

        
        new complex.RockyBorder(rectangle1, width.percent(5), edge1);
        new complex.RockyBorder(rectangle2, width.percent(5), edge2);
        new complex.RockyBorder(rectangle3, width.percent(5), edge3);
        new complex.RockyBorder(rectangle4, width.percent(5), edge4);
        new complex.RockyBorder(rectangle5, width.percent(5), edge5);
        new complex.RockyBorder(rectangle6, width.percent(5), edge6);
        new complex.RockyBorder(rectangle7, width.percent(5), edge7);

        this.addShape(rectangle1);
        this.addShape(rectangle2);
        this.addShape(rectangle3);
        this.addShape(rectangle4);
        this.addShape(rectangle5);
        this.addShape(rectangle6);
        this.addShape(rectangle7);
        this.addShape(rectangle8);

        this.addMushroom(edge5);
        this.addMushroom(edge5);
        this.addMushroom(edge6);
        this.addMushroom(edge6);
        this.addMushroom(edge6);
        this.addMushroom(edge6);
        this.addMushroom(edge6);
        this.addMushroom(edge6);
    }

    addMushroom(edge) {
        let distance = trees.getDistance(edge.start, edge.end);
        let location = trees.getPointOnLine(edge.start, trees.random(0, distance), trees.getAngle(edge.start, edge.end));
        let mushroom = new client.Mushroom(location.x, location.y - this.height.percent(5), this.width.percent(trees.random(1, 3)), this.height.percent(trees.random(4, 5)));
        this.addShape(mushroom);
    }

}

export { Cave }
