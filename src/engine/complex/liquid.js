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
        this.container = container;
        this.lines = this.container.lines();
        this.overflowStart = null;
        this.liquidLevel = 0;
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

    get overflowStart() {
        return this._overflowStart;
    }

    set overflowStart(overflowStart) {
        this._overflowStart = overflowStart;
    }

    set liquidLevel(liquidLevel) {
        if (typeof liquidLevel !== "number" ||
            liquidLevel < 0) {
            throw new Error("Liquid Level value must be a number between zero and canvas height.")
        }
        this._liquidLevel = liquidLevel;
        let p1 = { x: 0, y: this._liquidLevel }
        let p2 = { x: 1000, y: this._liquidLevel };
        this._levelLine = new Line(p1, p2);
        this.level();
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

        this.container.lines().forEach((line, index) => {

            let intersection = trees.intersection(line, this._levelLine);
            if (intersection.onLine1 && intersection.onLine2) {
                if (index === this.container.openingIndex) {
                    this.container.overflowing = true;
                    this.overflowStart = intersection;
                }

                line.intersection = intersection;
                this.lines.push(line);

                if (!firstIntersect) {
                    firstIntersect = intersection;
                    firstIntersectIndex = this.lines.indexOf(line);
                } else {

                    if (firstIntersect.x < intersection.x) {
                        line.start = intersection;
                        this.lines[firstIntersectIndex].end = firstIntersect;
                    } else {
                        line.end = intersection;
                        this.lines[firstIntersectIndex].start = firstIntersect;
                    }
                        console.log(this.overflowStart === firstIntersect);
                        console.log(this.overflowStart === intersection);

                }

            } else if (line.start.y > this._levelLine.start.y) {
                //keep any lines that do not intersect the leveline
                //as long as they are below it
                if (index === this.container.openingIndex) {
                    this.container.overflowing = true;
                    this.overflowStart = line.start.y < line.end.y ? line.start : line.end;
                }
                this.lines.push(line);
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
            // ctx.yMove(this._levelLine.start);
            // ctx.yLine(this._levelLine.end);
            // ctx.stroke();
        }
    }

}

export { Liquid }