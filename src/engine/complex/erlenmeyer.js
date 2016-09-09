import { simples } from '../simples/simples.js';
import { ContainerComposite } from './containerComposite.js';
import { Hose } from './hose.js';

class Erlenmeyer extends ContainerComposite {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Erlenmeyer";

        let lip = new simples.Rectangle(this.x + this.width / 4, this.y, this.width / 2, this.height / 20);

        let neckWidth = this.width / 2.5;

        let neck = new simples.Rectangle(trees.getCenterX(neckWidth, this), this.y + lip.height, neckWidth, this.height / 4);
        let bottom = new simples.Rectangle(this.x, this.y + this.height * 0.75, this.width, this.height / 4);
        let body = new simples.Trapezoid(
            this.x,
            this.y + lip.height + neck.height,
            this.width,
            this.height - lip.height - neck.height - bottom.height,
            trees.getAngle(neck.d, bottom.a),
            trees.getAngle(neck.d, bottom.a));


        //this.pour = new Hose(lip.x, lip.y - lip.width, lip.width, lip.width);

        this.addShape(lip);
        lip.openingIndex = 0;

        this.addShape(neck);
        this.addShape(body);
        this.addShape(bottom);
        // this.addShape(this.pour);

    }

}

export { Erlenmeyer }