import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

let a = 0;
let i = 1;

class Octopus extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Octopus";

        let main = new simples.Circle(this.center.x - width / 8, y, width / 4, height / 4);
        let rect = new simples.Rectangle(main.x, main.center.y, width / 4, height / 8);
        this.addShape(main);
        this.addShape(rect);

        for (let i = 0; i < 8; i++) {
            let tentacle = new complex.Hose(rect.d.x + i * rect.width / 8, rect.d.y - rect.width / 8, this.width * 0.75, rect.width / 8, 0, simples.Rectangle);
            let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
            tentacle.direction = plusOrMinus;
            tentacle.type = "Tentacle";
            this.addShape(tentacle);
            tentacle.rotate(90, tentacle.d);
        }

    }

    animate() {

        this.shape.forEach(shape => {
            if (shape.type === "Tentacle") {
                if (a > 30) {
                    i++;
                    a = 0;
                }
                let length = Math.floor(Math.random() * shape.length);
                shape.bend(i, i+5, shape.direction);
                shape.bend(0, i, -shape.direction);
                a++
            }
        });
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();

    }

}

export { Octopus }
