import { Point } from '../point.js';
import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Hose extends ComplexShape {
    constructor(x, y, width, height, angle, shape) {
        super(x, y, width, height, angle);
        this.type = "Hose";

        this.length = Math.floor(width / height);
        for (var i = 0; i < this.length; i++) {
            let link = new shape(x + (i * height), y, height, height);
            this.addShape(link);
        }
    }

    selectSection(start, end) {
        this.shape.forEach(shape => {
            shape.color = this.color;
        });

        let section = this.shape.slice(start, end);
        if (section.length) {
            section.forEach(shape => {
                shape.color = "red";
            });
        }
    }

    bend(start, end, degree) {
        let section = this.shape.slice(start, end);
        let increment = degree / section.length;
        let i = 0;
        let anchor;
        if (section.length) {
            section.forEach((shape, index) => {
                if (degree > 0) {
                    anchor = shape.d;
                } else {
                    anchor = shape.b;
                }
                shape.rotate(i, shape.d)
                if (index > 0) {
                    shape.x = section[index - 1].b.x;
                    shape.y = section[index - 1].b.y;
                }
                i += increment
            });
            let remainder = this.shape.slice(end);
            remainder.forEach((shape, index) => {
                shape.rotate(degree, section[0].origin);
                if (index > 0) {
                    shape.x = remainder[index - 1].b.x;
                    shape.y = remainder[index - 1].b.y;
                } else {
                    shape.x = section[section.length - 1].b.x;
                    shape.y = section[section.length - 1].b.y;
                }
            });
            this.updateBoundaries();
        }
    }

    updateBoundaries() {
        super.updateBoundaries();

        let leftMostShape;
        let rightMostShape;
        let topMostShape;
        let bottomMostShape;
        if (this.shape) {
            this.shape.forEach(shape => {
                if (!leftMostShape || shape.a.x < leftMostShape.a.x) {
                    leftMostShape = shape;
                }
                if (!topMostShape || shape.a.y < topMostShape.a.y) {
                    topMostShape = shape;
                }
                if (!rightMostShape || shape.c.x > rightMostShape.c.x) {
                    rightMostShape = shape;
                }
                if (!bottomMostShape || shape.c.y > bottomMostShape.c.y) {
                    bottomMostShape = shape;
                }
            });

            this.boundary.a = new Point(leftMostShape.a.x, topMostShape.a.y);
            this.boundary.b = new Point(rightMostShape.c.x, topMostShape.a.y);
            this.boundary.c = new Point(rightMostShape.c.x, bottomMostShape.c.y);
            this.boundary.d = new Point(leftMostShape.a.x, bottomMostShape.c.y);
        }

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

export { Hose }