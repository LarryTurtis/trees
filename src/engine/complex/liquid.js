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

class Liquid extends Sprite {
    constructor(container) {
        super(container.x, container.y, container.width, container.height);
        this.type = "Liquid";
        this._container = container;
    }

    get container() {
        return this._container;
    }

    set container(container) {
        this._container = container;
    }

    draw(ctx) {
        super.draw(ctx);
        let lines = this.container.lines();
        ctx.beginPath();
        ctx.yMove(lines[0].start);
        lines.forEach(line => {
            ctx.yLine(line.end);
        });
        ctx.fill();
        ctx.closePath();
    }

}

export { Liquid }
