import { Liquid } from './liquid.js';

function Container(shape) {

    shape.type = "Container";


    /**
     * .overflowing
     * returns true if the container has a liquid
     * which is currently intersecting with the container's
     * opening, if it has one.
     */
    shape._overflowing = false;

    /**
     * .openingIndex
     * specifies whether this container has an opening 
     * and if so, where to find that opening line in the 
     * container.lines() array. If there is no opening, 
     * this property returns -1;
     *
     */
    shape._openingIndex = shape.openingIndex >= 0 ? shape.openingIndex : -1;
    shape._bottomIndex = shape.bottomIndex >= 0 ? shape.bottomIndex : -1;

    shape._thickness = 0;

    Object.defineProperty(shape, 'overflowing', {
        get: function() {
            return this._overflowing;
        },
        set: function(overflowing) {
            this._overflowing = overflowing;
        }
    });

    Object.defineProperty(shape, 'openingIndex', {
        get: function() {
            return this._openingIndex;
        },
        set: function(openingIndex) {
            this._openingIndex = openingIndex;
        }
    });

    Object.defineProperty(shape, 'bottomIndex', {
        get: function() {
            return this._bottomIndex;
        },
        set: function(bottomIndex) {
            this._bottomIndex = bottomIndex;
        }
    });

    Object.defineProperty(shape, 'innerLines', {
        get: function() {
            return this._innerLines;
        },
        set: function(innerLines) {
            this._innerLines = innerLines;
        }
    });

    shape._innerLines = shape.lines().map((line, index) => {
        return trees.copyLine(line);
    });

    Object.defineProperty(shape, 'thickness', {
        get: function() {
            return this._thickness;
        },
        set: function(thickness) {
            let oldThickness = this._thickness;
            this._thickness = thickness;
            let thicknessDiff = this.thickness - oldThickness;

            trees.resizeLine(shape.innerLines[0], thicknessDiff);
            trees.resizeLine(shape.innerLines[2], thicknessDiff);

            if (shape.bottomIndex >= 0) trees.moveLineVertical(shape.innerLines[shape.bottomIndex], -thicknessDiff);

            shape.innerLines[1].start.x = shape.innerLines[0].end.x;
            shape.innerLines[1].start.y = shape.innerLines[0].end.y;
            shape.innerLines[1].end.x = shape.innerLines[2].start.x;
            shape.innerLines[1].end.y = shape.innerLines[2].start.y;

            shape.innerLines[3].start.x = shape.innerLines[2].end.x;
            shape.innerLines[3].start.y = shape.innerLines[2].end.y;
            shape.innerLines[3].end.x = shape.innerLines[0].start.x;
            shape.innerLines[3].end.y = shape.innerLines[0].start.y;

        }
    });

    let oldRotate = shape.rotate;

    shape.rotate = function(deg, transformOrigin) {
        oldRotate.call(shape, deg, transformOrigin);
        shape.innerLines.forEach(line => {
            line.start = trees.rotatePoint(line.start, transformOrigin, deg);
            line.end = trees.rotatePoint(line.end, transformOrigin, deg);
        });
    }

    // let oldDraw = shape.draw;

    // shape.draw = function(ctx) {
    //     oldDraw.call(shape, ctx);
    //     let colors = ["red", "green", "blue", "yellow"]
    //     ctx.yMove(shape.innerLines[0].start);
    //     shape.innerLines.forEach((line, index) => {
    //         ctx.beginPath();
    //         ctx.fillStyle = colors[index] //trees.setOpacity("red", 0.5);
    //         ctx.rect(line.start.x - 1.5, line.start.y - 1.5, 3, 3)
    //         ctx.rect(line.end.x - 1.5, line.end.y - 1.5, 3, 3)
    //         ctx.fill();
    //         ctx.closePath();
    //     });
    //     ctx.fillStyle = shape.color;
    // }

    shape.createSATObject = function() {
        let response = [];
        let lines = shape.lines()
        if (lines.length) {
            lines.forEach((line, index) => {
                if (index !== shape.openingIndex) {
                    response = response.concat(line.createSATObject());
                }
            });
        }
        return response;
    }

    return shape;
}


export { Container }