import { simples } from '../simples/simples.js';
import { ContainerComposite } from './containerComposite.js';

class Erlenmeyer extends ContainerComposite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
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
            0,
            trees.getAngle(neck.d, bottom.a),
            trees.getAngle(neck.d, bottom.a));

        this.addShape(lip);
        this.addShape(neck);
        this.addShape(body);
        this.addShape(bottom);

        this.liquidLevelShape = this.shape[0];

    }

    fill(amount) {
        if (this.liquidLevelShape.empty) {
            let newIndex = this.shape.indexOf(this.liquidLevelShape) + 1;
            if (newIndex <= this.shape.length - 1) this.liquidLevelShape = this.shape[newIndex];
        }
        this.liquidLevelShape.fill(amount);

    }

}

export { Erlenmeyer }