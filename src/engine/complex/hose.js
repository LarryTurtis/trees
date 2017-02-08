import { Point } from '../point.js';
import { simples } from '../simples/simples.js';
import { ComplexShape } from './complexShape.js';

class Hose extends ComplexShape {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Hose";
        this.sectionAngle = 0;
        this.sectionLength = 5;
        this.sectionColor = "black";
        this.fullSectionColor = "orange";
        this.length = Math.floor(width / height);
        this.fullCounter = 0;

        for (var i = 0; i < this.length; i++) {
            let link = new simples.Rectangle(x + (i * height), y, height, height);
            this.addShape(link);
        }
    }

    addLink() {
        let lastLink = this.shape[this.shape.length - 1];
        let link = new simples.Rectangle(lastLink.b.x, lastLink.b.y, this.height, this.height);
        let angle = trees.getAngle(lastLink.a, lastLink.b);
        link.rotate(angle, lastLink.b);
        this.addShape(link);
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

    fill(counter) {

        this.empty = false;

        let next = this.shape[this.fullCounter];
        next.isFull = true;
        next.color = this.fullSectionColor;
        if (this.fullCounter === this.shape.length - 1) {
            this.full = true;
        } else {
            this.full = false;
            this.fullCounter += counter;
        }
    }

    drain(counter) {

        this.full = false;

        for (let i = 0; i < this.shape.length; i++) {
            let next = this.shape[i];
            if (next.isFull) {
                next.isFull = false;
                next.color = this.color;
                break;
            }
        }

        if (this.fullCounter === 0) {
            this.empty = true;
        } else {
            this.empty = false;
            this.fullCounter -= counter;
        }
    }

    get full() {
        return this._full;
    }

    set full(full) {
        this._full = full;
    }

    get empty() {
        return this._empty;
    }

    set empty(empty) {
        this._empty = empty;
    }

    get fullSection() {
        let section = [];
        this.shape.forEach(shape => {
            if (shape.isFull) {
                section.push(shape);
            }
        });
        return section;
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

    get tip() {
        return this.shape[this.shape.length - 1].center;
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
            this._updateBoundaries();
        }
    }

    _updateBoundaries() {
        super._updateBoundaries();

        let leftMostShape;
        let rightMostShape;
        let topMostShape;
        let bottomMostShape;
        if (this.shape && this.shape.length > 0) {
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
        //super.draw(ctx);
        ctx = ctx || this.canvas && this.canvas.ctx;

        ctx.fillStyle = this.fullSectionColor;
        this.drawHose(ctx, this.fullSection);

        ctx.fillStyle = this.color;
        this.drawHose(ctx, this.shape);

        ctx.fillStyle = this.sectionColor;
        this.drawHose(ctx, this.selectedSection);


    }

    drawHose(ctx, hose) {
        ctx = ctx || this.canvas && this.canvas.ctx;

        if (hose.length) {
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

}

export { Hose }