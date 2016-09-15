/**
 * A SMALL utilities library using Underscore-like statics.
 * @return {Object}
 */

let d;

class trees {

    /**
     * Returns a random number between min and max, inclusive
     * @param  {Number} min
     * @param  {Number} max
     */
    static random(min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    /**
     * Returns a random hex color
     * @return {String} 
     */
    static randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    static moveToEnd(arr, numElements) {
        for (let i = 0; i < numElements; i++) {
            arr.push(arr.shift());
        }
    }

    static posNeg() {
        if (this.random(0, 1) === 0) return -1;
        else return 1;
    }

    static getRGB(color) {
        d = document.createElement("div");
        d.style.color = color;
        document.body.appendChild(d)
        return window.getComputedStyle(d).color
    }

    static setOpacity(color, opacity) {
        let rgb = this.getRGB(color).replace("rgb", "rgba");
        return [rgb.slice(0, rgb.length - 1), ", " + opacity.toString(), rgb.slice(rgb.length - 1)].join("");
    }

    static getCenterX(inner, outer) {
        let outerCenter = outer.x + outer.width / 2;
        let innerOffset = inner / 2;
        let innerX = outerCenter - innerOffset;
        return innerX;
    }

    static getBezierDistance(n) {
        return (n / 2) * 0.552284749831;
    }

    static degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    static getAngle(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }

    static getDistance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }

    static getPointOnLine(firstPoint, width, angle) {
        let secondPointX = firstPoint.x + width * Math.cos(this.degToRad(angle));
        let secondPointY = firstPoint.y + width * Math.sin(this.degToRad(angle));
        return new firstPoint.constructor(secondPointX, secondPointY);
    }

    static copyPoint(point) {
        return new point.constructor(point.x, point.y);
    }

    static polygonArea(lines) {

        let X = [];
        let Y = [];

        lines.forEach(line => {
            X.push(line.start.x);
            X.push(line.end.x);
            Y.push(line.start.y);
            Y.push(line.end.y);
        });

        let numPoints = X.length;

        let area = 0; // Accumulates area in the loop
        let j = numPoints - 1; // The last vertex is the 'previous' one to the first

        for (let i = 0; i < numPoints; i++) {
            area = area + (X[j] + X[i]) * (Y[j] - Y[i]);
            j = i; //j is previous vertex to i
        }
        return -area / 2;
    }

    static intersection(line1, line2) {
        // if the lines intersect, the result contains the x and y of the intersection (treating the lines as infinite) and booleans for whether line segment 1 or line segment 2 contain the point
        var denominator, a, b, numerator1, numerator2, result = {
            x: null,
            y: null,
            onLine1: false,
            onLine2: false
        };
        denominator = ((line2.end.y - line2.start.y) * (line1.end.x - line1.start.x)) - ((line2.end.x - line2.start.x) * (line1.end.y - line1.start.y));
        if (denominator == 0) {
            return result;
        }
        a = line1.start.y - line2.start.y;
        b = line1.start.x - line2.start.x;
        numerator1 = ((line2.end.x - line2.start.x) * a) - ((line2.end.y - line2.start.y) * b);
        numerator2 = ((line1.end.x - line1.start.x) * a) - ((line1.end.y - line1.start.y) * b);
        a = numerator1 / denominator;
        b = numerator2 / denominator;

        // if we cast these lines infinitely in both directions, they intersect here:
        result.x = line1.start.x + (a * (line1.end.x - line1.start.x));
        result.y = line1.start.y + (a * (line1.end.y - line1.start.y));
        /*
                // it is worth noting that this should be the same as:
                x = line2.start.x + (b * (line2.end.x - line2.start.x));
                y = line2.start.x + (b * (line2.end.y - line2.start.y));
                */
        // if line1 is a segment and line2 is infinite, they intersect if:
        if (a > 0 && a < 1) {
            result.onLine1 = true;
        }
        // if line2 is a segment and line1 is infinite, they intersect if:
        if (b > 0 && b < 1) {
            result.onLine2 = true;
        }
        // if line1 and line2 are segments, they intersect if both of the above are true
        return result;
    };

}

export { trees };
