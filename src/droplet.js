import {
    Point
}
from './point.js'
import {
    Sprite
}
from './sprite.js'
import {
    Curve
}
from './curve.js'

class Droplet extends Sprite {
    constructor(x, y, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height);
        var lb1 = new Point(this.centerX - this.xBezierDistance, this.y + this.height);
        var lb2 = new Point(this.x, this.centerY + this.yBezierDistance);
        var lb3 = new Point(this.x, this.centerY);
        this._leftBottom = new Curve(lb1, lb2, lb3);

        var lt1 = new Point(this.x, this.centerY - this.yBezierDistance);
        var lt2 = new Point(this.centerX - this.xBezierDistance, this.y);
        var lt3 = new Point(this.centerX, this.y);
        this._leftTop = new Curve(lt1, lt2, lt3);

        var rt1 = new Point(this.centerX + this.xBezierDistance, this.y);
        var rt2 = new Point(this.x + this.width, this.centerY - this.yBezierDistance);
        var rt3 = new Point(this.x + this.width, this.centerY);
        this._rightTop = new Curve(rt1, rt2, rt3);

        var rb1 = new Point(this.x + this.width, this.centerY + this.yBezierDistance);
        var rb2 = new Point(this.centerX + this.xBezierDistance, this.y + this.height);
        var rb3 = new Point(this.centerX, this.y + this.height);
        this._rightBottom = new Curve(rb1, rb2, rb3);
        this.lineColor = "transparent";
        this.startingPoint = new Point(this.centerX, this.y + this.height);
    }

    allCurves(callback) {
        [this.leftBottom, this.leftTop, this.rightBottom, this.rightTop].forEach(curve => {
            callback(curve);
        })
    }

    allPoints(callback) {
        this.allCurves(curve => {
            [curve.cp1, curve.cp2, curve.end].forEach(point => {
                callback(point);
            });
        });
    }

    get yBezierDistance() {
        return (this.height / 2) * 0.552284749831;
    }

    get xBezierDistance() {
        return (this.width / 2) * 0.552284749831;
    }

    get leftTop() {
        return this._leftTop;
    }

    set leftTop(leftTop) {
        this._leftTop = leftTop;
    }

    get rightTop() {
        return this._rightTop;
    }

    set rightTop(rightTop) {
        this._rightTop = rightTop;
    }

    get rightBottom() {
        return this._rightBottom;
    }

    set rightBottom(rightBottom) {
        this._rightBottom = rightBottom;
    }

    get leftBottom() {
        return this._leftBottom;
    }

    set leftBottom(leftBottom) {
        this._leftBottom = leftBottom;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.lineJoin = "miter";
        ctx.beginPath();
        ctx.yMove(this.startingPoint);
        ctx.curve(this.leftBottom);
        ctx.curve(this.leftTop);
        ctx.curve(this.rightTop);
        ctx.curve(this.rightBottom);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();

        if (this.showBoundingBox) {
            var rectWidth = 5;
            var rectHeight = 5;
            this.allCurves(curve => {
                ctx.beginPath()
                ctx.fillStyle = "red";
                ctx.rect(this.startingPoint.x - rectWidth / 2, this.startingPoint.y - rectHeight / 2, rectWidth, rectHeight)
                ctx.rect(curve.cp1.x - rectWidth / 2, curve.cp1.y - rectHeight / 2, rectWidth, rectHeight)
                ctx.rect(curve.cp2.x - rectWidth / 2, curve.cp2.y - rectHeight / 2, rectWidth, rectHeight)
                ctx.rect(curve.end.x - rectWidth / 2, curve.end.y - rectHeight / 2, rectWidth, rectHeight)
                ctx.fill();
                ctx.closePath();
            });
        }
    }

}

export {
    Droplet
}
