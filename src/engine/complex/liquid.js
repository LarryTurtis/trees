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
        this._lineHeight = -280;
        console.log(container);
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
        let p1 = trees.getPointOnLine(this.boundary.d, this.lineHeight, 90);
        let p2 = trees.getPointOnLine(this.boundary.c, this.lineHeight, 90);
        let levelLine = new Line(p1, p2);
        let start = null;
        let end = null;

        this.lines = this.container.lines();
        this.lines.forEach(line => {
            let intersection = trees.intersection(line, levelLine);
            if (intersection.onLine1 && intersection.onLine2) {
                if (!start) {
                    line.start = start = intersection;
                    
                } else {
                    line.end = end = intersection;
                }
                
            } 
        });
        if (start && end) {
            this.lines[0].start = start;
            this.lines[0].end = end;
        }
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        //ctx.yMove(this.lines[0].start);
        this.lines.forEach(line => {
            ctx.yLine(line.start)
            ctx.yLine(line.end);
        });
        ctx.fill();
        ctx.closePath();

        let p1 = trees.getPointOnLine(this.boundary.d, this.lineHeight, 90);
        let p2 = trees.getPointOnLine(this.boundary.c, this.lineHeight, 90);
        let levelLine = new Line(p1, p2);
        ctx.lineColor = "black";
        // ctx.yMove(levelLine.start);
        // ctx.yLine(levelLine.end);
        //ctx.stroke();
    }

}

export { Liquid }
