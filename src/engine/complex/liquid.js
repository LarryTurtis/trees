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
        this._lineHeight = -180;
        let p1 = { x: 0, y: 500 }
        let p2 = { x: 1000, y: 500 };
        this.levelLine = new Line(p1, p2);
    }

    get container() {
        return this._container;
    }

    set container(container) {
        this._container = container;
    }

    get lineHeight() {
        return this._lineHeight;
    }

    set lineHeight(lineHeight) {
        this._lineHeight = lineHeight;
    }


    level() {

        let orientation = trees.getAngle(this.a, this.d);
        console.log(orientation);
        let start = null;
        let end = null;
        this.lines = this.container.lines();

        if (orientation > 0 && orientation <= 90) {
            //bcda
            trees.moveToEnd(this.lines, 1);
        }

        if (orientation > 90 && orientation <= 180) {
            //abcd
        }

        if (orientation > -180 && orientation <= -90) {
            //dabc
            trees.moveToEnd(this.lines, 3);
        }

        if (orientation > -90 && orientation <= 0) {
            //cdab
            trees.moveToEnd(this.lines, 2);
        }

        this.lines.forEach((line, index) => {
            if (end) {
                this.lines.splice(this.lines.indexOf(line), 1);
            }

            let intersection = trees.intersection(line, this.levelLine);
            if ((intersection.onLine1 && intersection.onLine2) &&
                intersection.x >= this.boundary.a.x &&
                intersection.x <= this.boundary.b.x &&
                intersection.y >= this.boundary.a.y &&
                intersection.y <= this.boundary.d.y) {
                if (!start) {
                    start = intersection;
                } else {
                    end = intersection;
                }
                if (!start) {
                    this.lines.splice(this.lines.indexOf(line), 1);
                }

            }
        });

        //if intersections were found, assign to first line.
        if (start && end) {
            this.lines[0].start = end;
            this.lines[0].end = start;
        } else {
            this.lines = this.container.lines();
        }
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.yMove(this.lines[0].start);
        this.lines.forEach((line, index) => {
            ctx.yLine(line.start)
            ctx.yLine(line.end);
        });
        ctx.fill();
        ctx.closePath();
        ctx.yMove(this.levelLine.start);
        ctx.yLine(this.levelLine.end);
        ctx.stroke();
    }

}

export { Liquid }
