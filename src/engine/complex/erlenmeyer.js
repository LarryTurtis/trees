import { simples } from '../simples/simples.js';
import { Point } from '../point.js';
import { Container } from './container.js';
import { complex } from './complex.js';

class Erlenmeyer extends Container {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Erlenmeyer";
        this.lip = new simples.Rectangle(this.x + this.width / 4, this.y, this.width / 2, this.height / 20);

        let neckWidth = this.width / 2.5;

        this.neck = new simples.Rectangle(trees.getCenterX(neckWidth, this), this.y + this.lip.height, neckWidth, this.height / 4);
        this.bottom = new simples.Rectangle(this.x, this.y + this.height * 0.75, this.width, this.height / 4);

        this.body = new simples.Trapezoid(
            this.x,
            this.y + this.lip.height + this.neck.height,
            this.width,
            this.height - this.lip.height - this.neck.height - this.bottom.height,
            0,
            trees.getAngle(this.neck.d, this.bottom.a),
            trees.getAngle(this.neck.d, this.bottom.a));

        this.addShape(this.lip);
        this.addShape(this.neck);
        this.addShape(this.body);
        this.addShape(this.bottom);

    }

    fill(amount) {

        super.fill(amount);

        let previousShape;

        this.shape.forEach(shape => {

            if (!shape.liquid) {
                let liquid = new shape.constructor(shape.x, shape.y, shape.width, shape.height, shape.angle, shape.leftAngle, shape.rightAngle);
                shape.liquid = liquid;
                shape.liquid.color = this.liquidColor;
                this.addShape(shape.liquid);
            }

            if (shape.liquid.height <= 0) {
                shape.empty = true;
            }

            if (shape.liquid.height >= shape.height) {
                shape.full = true;
            }

            if (!previousShape || !previousShape.empty) {
                shape.liquid.trimTop(amount);
            }

            previousShape = shape;

        });

    }

    draw(ctx) {
        super.draw(ctx);
        this.shape.forEach(shape => {
            shape.draw(ctx);
        });
    }

}

export { Erlenmeyer }