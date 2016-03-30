import {
    Droplet
}
from './droplet.js';
class Splat extends Droplet {
    constructor(x, y, width, height, ySpeed) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height);
        this.type = "Splat";
        this.ySpeed = ySpeed;
        this.xSpeed = 0;
        this.isFlat = false;
        this.minHeight = this.height / 2;
    }

    flatten() {

        this.height -= this.ySpeed / 2;
        this.width += this.ySpeed + (this.ySpeed / 4);
        this.x -= (this.ySpeed + (this.ySpeed / 4)) / 2;
        this.y += this.ySpeed / 2;

        this.leftBottom.cp2.x -= this.ySpeed / 2;
        this.rightBottom.cp1.x += this.ySpeed / 2;
        this.rightTop.end.x += this.ySpeed / 4;
        this.leftBottom.end.x -= this.ySpeed / 4;
        this.startingPoint.x -= this.ySpeed;
        this.leftBottom.cp1.x -= this.ySpeed;
        this.rightBottom.cp2.x += this.ySpeed;
        this.rightBottom.end.x += this.ySpeed;

        this.leftBottom.end.y = this.centerY;
        this.rightTop.end.y = this.centerY;
        this.leftTop.cp2.y = this.y;
        this.leftTop.end.y = this.y;
        this.rightTop.cp1.y = this.y;
        this.leftTop.cp1.y = this.centerY - this.yBezierDistance;
        this.rightTop.cp2.y = this.centerY - this.yBezierDistance;
        this.rightBottom.cp1.y = this.centerY + this.yBezierDistance;
        this.leftBottom.cp2.y = this.centerY + this.yBezierDistance;

        if (this.height < this.minHeight) {
            this.isFlat = true;
        }
    }

    animate() {
        if (!this.isFlat) {
            this.flatten();
        }
    }

    draw(ctx) {
        this.animate();
        super.draw(ctx);
    }

}

export {
    Splat
}
