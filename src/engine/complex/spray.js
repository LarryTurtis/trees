import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Spray extends ComplexShape {
    constructor(x, y, width, height, angle, thickness) {
        super(x, y, width, height, angle, thickness);
        this.type = "Spray";

        for (var i = 0; i < thickness; i++) {
            this.createParticle();
        }

    }

    spray() {
        this.shape.forEach(shape => {
            shape.x += shape.xspeed;
            shape.y += shape.yspeed;
            if (shape.width > 0) {
                shape.width -= 0.1;
                shape.height -= 0.1;
            }
            if (shape.width <= 0) {
                this.removeShape(shape);
                this.createParticle();
            }
        });
    }

    createParticle() {
        let size = trees.random(1, 5);

        let particle = new simples.Circle(this.a.x, this.a.y, size, size);
        particle.xspeed = trees.random(2, 4);
        particle.yspeed = trees.random(3, 5);
        particle.color = this.color;
        this.addShape(particle);
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        this.shape.forEach(shape => {
            shape.draw(ctx);
        });

        ctx.closePath();
    }

}

export { Spray }
