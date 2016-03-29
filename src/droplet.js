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
        this.type = "Droplet";
        this.ySpeed = 1;
        this.xSpeed = 0;
        this.isFlat = false;
        this.minHeight = this.height / 2;

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

    }

    applyGravity() {
        console.log('gravity');
        this.ySpeed *= 1.02;
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    get x() {
        return super.x;
    }

    set x(x) {
        super.x = x;
        this.updateX();
    }

    get width() {
        return super.width;
    }

    set width(width) {
        super.width = width;
        this.updateX();
    }

    get y() {
        return super.y;
    }

    set y(y) {
        super.y = y;
        if (this.height <= this.minHeight) {
            this.isFlat = true;
        }
        this.updateY();
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        this.updateY();
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

    flatten() {
        console.log('flattening');
        this.height -= this.ySpeed / 2;
        this.leftBottom.cp1.x -= this.ySpeed;
        this.rightBottom.cp2.x += this.ySpeed;
    }

    updateX() {
        this.leftTop.cp1.x = this.x;
        this.leftTop.cp2.x = this.centerX - this.xBezierDistance;
        this.leftTop.end.x = this.centerX;
        this.rightTop.cp1.x = this.centerX + this.xBezierDistance;
        this.rightTop.cp2.x = this.x + this.width;
        this.rightTop.end.x = this.x + this.width;
        this.rightBottom.cp1.x = this.x + this.width;
        this.rightBottom.cp2.x = this.centerX + this.xBezierDistance;
        this.rightBottom.end.x = this.centerX;
        this.leftBottom.cp1.x = this.centerX - this.xBezierDistance;
        this.leftBottom.cp2.x = this.x;
        this.leftBottom.end.x = this.x;
    }

    updateY() {
        this.leftTop.cp1.y = this.centerY - this.yBezierDistance;
        this.leftTop.cp2.y = this.y;
        this.leftTop.end.y = this.y;
        this.rightTop.cp1.y = this.y;
        this.rightTop.cp2.y = this.centerY - this.yBezierDistance;
        this.rightTop.end.y = this.centerY;
        this.rightBottom.cp1.y = this.centerY + this.yBezierDistance;
        this.rightBottom.cp2.y = this.y + this.height;
        this.rightBottom.end.y = this.y + this.height;
        this.leftBottom.cp1.y = this.y + this.height;
        this.leftBottom.cp2.y = this.centerY + this.yBezierDistance;
        this.leftBottom.end.y = this.centerY;
    }

    animate() {

        if (!this.hasCollisions) {
            this.applyGravity();
        }

        if (this.hasCollisions) {
            this.collisionRegistry.collisions.forEach(collision => {
                if (collision.type === "Platform" && !this.isFlat) {
                    this.flatten();
                    this.y = collision.y - this.height;
                }
            });
        }
    }

    draw(ctx) {
        this.animate();
        super.draw(ctx);
        ctx.lineJoin = "miter";
        ctx.beginPath();
        ctx.moveTo(this.centerX, this.y + this.height)
        ctx.curve(this.leftBottom);
        ctx.curve(this.leftTop);
        ctx.curve(this.rightTop);
        ctx.curve(this.rightBottom);
        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}

export {
    Droplet
}
