import { Point } from '../point.js';
import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Hose extends ComplexShape {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Hose";
        this.sectionAngle = 0;
        this.sectionLength = 10;
        this.length = Math.floor(width / height);
        for (var i = 0; i < this.length; i++) {
            let link = new simples.Rectangle(x + (i * height), y, height, height);

            if (i < 9) {
                link.selectedSection = true;
            }

            this.addShape(link);
        }
    }

    selectSection(shape) {
        this.shape.forEach(shape => {
            shape.color = this.color;
            shape.selectedSection = false;
        });

        let index = this.shape.indexOf(shape);

        if (index > this.shape.length - this.sectionLength) {
            index = this.shape.length - this.sectionLength;
        }

        let section = this.shape.slice(index, index + this.sectionLength);
        if (section.length) {
            section.forEach(shape => {
                shape.selectedSection = true;
            });
        }
    }

    get selectedSection() {
        let section = [];
        this.shape.forEach(shape => {
            if (shape.selectedSection) {
                section.push(shape);
            }
        });
        return section;
    }

    bend(degree) {
        let section = [];
        let end = 0;

        this.sectionAngle += degree;
        this.shape.forEach(shape => {
            if (shape.selectedSection) {
                section.push(shape);
                end = this.shape.indexOf(shape) + 1;
            }
        });

        let increment = degree / section.length;
        let i = 0;
        if (section.length) {
            section.forEach((shape, index) => {

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

        ctx.fillStyle = this.color;
        this.drawHose(ctx, this.shape);

        ctx.fillStyle = "red";
        this.drawHose(ctx, this.selectedSection);


    }

    drawHose(ctx, hose) {
        ctx.beginPath();
        ctx.yMove(hose[0].a);

        hose.forEach(shape => {
            ctx.yLine(shape.a);
            ctx.yLine(shape.b);
        });

        hose.reverse();
        ctx.yLine(hose[0].c);

        hose.forEach(shape => {
            ctx.yLine(shape.c);
            ctx.yLine(shape.d);
        });

        hose.reverse();
        ctx.yLine(hose[0].a);

        ctx.fill();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { Hose }