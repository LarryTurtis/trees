/**
 * A SMALL utilities library using Underscore-like functions.
 * @return {Object}
 */

let d;

function trees() {

    return {
        random: random,
        randomColor: randomColor,
        posNeg: posNeg,
        getRGB: getRGB,
        setOpacity: setOpacity,
        getCenterX: getCenterX,
        getBezierDistance: getBezierDistance,
        degToRad: degToRad,
        getAngle: getAngle,
        getDistance: getDistance,
        getPointOnLine: getPointOnLine,
        copyPoint: copyPoint,
        getMinX: getMinX,
        getMaxX: getMaxX,
        getMinY: getMinY,
        getMaxY: getMaxY
    }

    /**
     * Returns a random number between min and max, inclusive
     * @param  {Number} min
     * @param  {Number} max
     */
    function random(min, max) {
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
    function randomColor() {
        return '#' + Math.floor(Math.random() * 16777215).toString(16);
    }

    function posNeg() {
        if (random(0, 1) === 0) return -1;
        else return 1;
    }

    function getRGB(color) {
        d = document.createElement("div");
        d.style.color = color;
        document.body.appendChild(d)
        return window.getComputedStyle(d).color
    }

    function setOpacity(color, opacity) {
        let rgb = getRGB(color).replace("rgb", "rgba");
        return [rgb.slice(0, rgb.length - 1), ", " + opacity.toString(), rgb.slice(rgb.length - 1)].join("");
    }

    function getCenterX(inner, outer) {
        let outerCenter = outer.x + outer.width / 2;
        let innerOffset = inner / 2;
        let innerX = outerCenter - innerOffset;
        return innerX;
    }

    function getBezierDistance(n) {
        return (n / 2) * 0.552284749831;
    }

    function degToRad(deg) {
        return deg * (Math.PI / 180);
    }

    function getAngle(p1, p2) {
        return Math.atan2(p2.y - p1.y, p2.x - p1.x) * 180 / Math.PI;
    }

    function getDistance(p1, p2) {
        return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
    }

    function getPointOnLine(firstPoint, width, angle) {
        let secondPointX = firstPoint.x + width * Math.cos(degToRad(angle));
        let secondPointY = firstPoint.y + width * Math.sin(degToRad(angle));
        return new firstPoint.constructor(secondPointX, secondPointY);
    }

    function copyPoint(point) {
        return new point.constructor(point.x, point.y);
    }

    function getMinX(arr) {
        let result = arr[0];
        arr.forEach(point => {
            if (point.x < result.x) {
                result = point;
            }
        });
        return result;
    }

    function getMinY(arr) {
        let result = arr[0];
        arr.forEach(point => {
            if (point.y < result.y) {
                result = point;
            }
        });
        return result;
    }

    function getMaxX(arr) {
        let result = arr[0];
        arr.forEach(point => {
            if (point.x > result.x) {
                result = point;
            }
        });
        return result;
    }

    function getMaxY(arr) {
        let result = arr[0];
        arr.forEach(point => {
            if (point.y > result.y) {
                result = point;
            }
        });
        return result;
    }



}

export { trees };
