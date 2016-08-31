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
}

export { trees };
