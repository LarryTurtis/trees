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
        super(container.x, container.y, container.width, container.height);
        this.type = "Liquid";
        this._container = container;
        this._lineHeight = -180;
        this.lines = container.lines();
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

        let p1 = trees.getPointOnLine(this.boundary.d, this.lineHeight, 90);
        let p2 = trees.getPointOnLine(this.boundary.c, this.lineHeight, 90);
        let levelLine = new Line(p1, p2);
        let start = null;
        let end = null;
        this.lines = this.container.lines();

        if (orientation > 0 && orientation <= 90) {
            //bcda
            this.lines.push(this.lines.shift());
        }

        if (orientation > 90 && orientation <= 180) {
            //abcd
        }

        if (orientation > -180 && orientation <= -90) {
            //dabc
            this.lines.push(this.lines.shift());
            this.lines.push(this.lines.shift());
            this.lines.push(this.lines.shift());
        }

        if (orientation > -90 && orientation <= 0) {
            //cdab
            this.lines.push(this.lines.shift());
            this.lines.push(this.lines.shift());
        }

        this.lines.forEach((line, index) => {

            if (end) {
                this.lines.splice(this.lines.indexOf(line), 1);
            }

            let intersection = trees.intersection(line, levelLine);
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
        this.lines[0].start = end;
        this.lines[0].end = start;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        // ctx.yMove(this.lines[0].start);
        this.lines.forEach((line, index) => {
            ctx.yLine(line.start)
            ctx.yLine(line.end);
        });
        ctx.fill();
        ctx.closePath();

        let p1 = trees.getPointOnLine(this.boundary.d, this.lineHeight, 90);
        let p2 = trees.getPointOnLine(this.boundary.c, this.lineHeight, 90);
        let levelLine = new Line(p1, p2);
        // ctx.yMove(levelLine.start);
        // ctx.yLine(levelLine.end);
        // ctx.stroke();
    }

}

export { Liquid }
