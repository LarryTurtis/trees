/*
approach:
for each complex object, it should specify an array of "lines" to be drawn in order.

(note that it may be important to distinguish a contiguous object as 'complex' and an object 
which contains non-contiguous portions as 'composite' in the future.)

a liquid class is created which has access to this array.

once we have this array, we can draw a line across the entire sprite and check for intersections across 
each line. Wherever an intersection is found, the intersection becomes the new endpoint for the intersecting
line. The liquid class is drawn using this new, improved set of instructions.

whenever the liquid level is raised or lowered or the container is moved or rotated, 
this intersection algorithm is re-calculated.

this should achieve the desired result.
*/

import { Sprite } from '../sprite.js'
import { Line } from '../line.js'

class Liquid extends Sprite {
    constructor(container) {

        if (!container) {
            throw new Error("Cannot create a liquid without a container sprite.");
        }

        super(container.x, container.y, container.width, container.height);
        this.type = "Liquid";
        this._container = container;
        this.lines = this.container.lines();
    }

    get container() {
        return this._container;
    }

    set container(container) {
        this._container = container;
    }

    get liquidLevel() {
        return this._liquidLevel;
    }

    set liquidLevel(liquidLevel) {
        this._liquidLevel = liquidLevel;
        let p1 = { x: 0, y: this._liquidLevel }
        let p2 = { x: 1000, y: this._liquidLevel };
        this._levelLine = new Line(p1, p2);
        this.level();
    }

    level() {
        let intersect1 = null;
        let intersect2 = null;
        let leftIntersection;
        let rightIntersection;
        this.lines = [];

        this.container.pouring = false;
        
        this.container.lines().forEach((line, index) => {
            let intersection = trees.intersection(line, this._levelLine);
            if (intersection.onLine1 && intersection.onLine2) {
                if (index === this.container.openingIndex) {
                    this.container.pouring = true;
                }

                line.intersection = intersection;
                if (!intersect1) {
                    intersect1 = intersection;
                } else {
                    intersect2 = intersection;
                }
                this.lines.push(line);
            } else {
                if (line.start.y > this._levelLine.start.y) {

                    if (index === this.container.openingIndex) {
                        this.container.pouring = true;
                    }

                    this.lines.push(line);
                }
            }
        });

        if (intersect1 && intersect2) {
            leftIntersection = intersect1.x < intersect2.x ? intersect1 : intersect2;
            rightIntersection = intersect1.x > intersect2.x ? intersect1 : intersect2;
        }

        this.lines.forEach(line => {
            if (line.intersection && leftIntersection) {
                if (line.intersection.x === leftIntersection.x && line.intersection.y === leftIntersection.y) {
                    line.end = line.intersection;
                } else {
                    line.start = line.intersection;
                }
            }
        });

    }

    draw(ctx) {
        super.draw(ctx);
        if (this.lines.length) {
            ctx.beginPath();
            ctx.yMove(this.lines[0].start);
            this.lines.forEach((line, index) => {
                ctx.yLine(line.start)
                ctx.yLine(line.end);
            });
            ctx.fill();
            ctx.closePath();
            // ctx.yMove(this._levelLine.start);
            // ctx.yLine(this._levelLine.end);
            // ctx.stroke();
        }
    }

}

export { Liquid }