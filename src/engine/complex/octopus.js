import { simples } from '../simples/simples.js';
import { complex } from './complex.js';
import { ComplexShape } from './complexShape.js';

let a = 0;
let i = 1;

class Octopus extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Octopus";

        let main = new simples.Circle(this.center.x - width / 8, y, width / 4, height / 4);
        let rect = new simples.Rectangle(main.x, main.center.y, width / 4, height / 8);
        this.addShape(main);
        this.addShape(rect);
        let direction = 1;
        for (let i = 0; i < 8; i++) {
            let tentacle = new complex.Hose(rect.d.x + i * rect.width / 8, rect.d.y - rect.width / 8, this.width * 0.75, rect.width / 8);
            tentacle.direction = direction;
            tentacle.type = "Tentacle";
            this.addShape(tentacle);
            tentacle.rotate(90, tentacle.d);
            direction = -direction;
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
                shape.selectSection(shape.shape[i])
                shape.sectionLength = 5;
                shape.bend(shape.direction);
                shape.selectSection(shape.shape[0]);
                shape.sectionLength = i;
                shape.bend(-shape.direction);
                a++
            }
        });
    }

}

export { Octopus }
