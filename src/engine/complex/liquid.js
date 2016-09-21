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
import { LevelLine } from './levelLine.js'

class Liquid extends Sprite {
    constructor(container) {

        if (!container || container.type !== "Container") {
            throw new Error("Cannot create a liquid without a properly formed container sprite.");
        }

        super(container.x, container.y, container.width, container.height);
        this.type = "Liquid";
        this.container = container;
        this.lines = this.container.innerLines;
        this.overflowStart = null;
        this._levelLine = new LevelLine(container.y);
    }

    get container() {
        return this._container;
    }

    set container(container) {
        this._container = container;
    }


    get overflowStart() {
        return this._overflowStart;
    }

    set overflowStart(overflowStart) {
        this._overflowStart = overflowStart;
    }

    get levelLine() {
        return this._levelLine;
    }

    set levelLine(levelLine) {
        this._levelLine = levelLine;
    }

    get area() {
        return trees.polygonArea(this.lines);
    }

    level() {
        //since we are dealing with quadrilaterals
        //there are 2 intersections to track
        //the left and right.

        //we need to know which is which.

        //we will capture the first intersection and compare with the second.
        let firstIntersect = null;
        let firstIntersectIndex = null;

        this.lines = [];
        this.container.overflowing = false;

        this.container.innerLines.forEach((line, index) => {
            let copiedLine = trees.copyLine(line);
            let intersection = trees.intersection(copiedLine, this.levelLine);

            if (intersection.onLine1 && intersection.onLine2) {
                if (index === this.container.openingIndex) {
                    this.container.overflowing = true;
                    this.overflowStart = intersection;
                }

                this.lines.push(copiedLine);

                if (!firstIntersect) {
                    firstIntersect = intersection;
                    firstIntersectIndex = this.lines.indexOf(copiedLine);
                } else {
                    if (firstIntersect.x < intersection.x) {
                        copiedLine.start = intersection;
                        this.lines[firstIntersectIndex].end = firstIntersect;
                    } else {
                        copiedLine.end = intersection;
                        this.lines[firstIntersectIndex].start = firstIntersect;
                    }
                }

            } else if (copiedLine.start.y > this.levelLine.y) {
                //keep any lines that do not intersect the leveline
                //as long as they are below it
                if (index === this.container.openingIndex) {
                    this.container.overflowing = true;
                    this.overflowStart = copiedLine.start.y < copiedLine.end.y ? copiedLine.start : copiedLine.end;
                }
                this.lines.push(copiedLine);
            }
        });


    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.level();
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
        }
        ctx.yMove(this.levelLine.start);
        ctx.yLine(this.levelLine.end);
        ctx.stroke();
    }

}

export { Liquid }