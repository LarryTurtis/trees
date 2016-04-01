import {
    Droplet
}
from './droplet.js';

import {
    CollisionRegistry
}
from './collisionRegistry.js';

import {
    ShapesRegistry
}
from './shapesregistry.js';

let shapesRegistry = new ShapesRegistry();
let collisionRegistry = new CollisionRegistry();

class Splat extends Droplet {
    constructor(x, y, width, height, ySpeed, isFlat) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height);
        this.type = "Splat";
        this.ySpeed = ySpeed;
        this.xSpeed = 0;
        this.isFlat = isFlat || false;
        this.minHeight = this.height / 2;
        this._growTo = null;
        this.heightFactor = 5;
    }

    flatten() {

        this.height -= this.ySpeed / 2;
        this.width += this.ySpeed + (this.ySpeed / 4);
        this.x -= (this.ySpeed + (this.ySpeed / 4)) / 2;
        this.y += this.ySpeed / 2;

        this.startingPoint.x -= this.ySpeed;
        this.rightBottom.end.x += this.ySpeed;
        this.leftBottom.cp1.x -= this.ySpeed / 2;
        this.rightBottom.cp2.x += this.ySpeed / 2;
        this.leftBottom.cp2.x -= this.ySpeed / 4;
        this.rightBottom.cp1.x += this.ySpeed / 4;
        this.rightTop.end.x += this.ySpeed / 6;
        this.leftBottom.end.x -= this.ySpeed / 6;
        
        this.leftBottom.end.y = this.centerY;
        this.rightTop.end.y = this.centerY;
        this.leftTop.cp2.y = this.y;
        this.leftTop.end.y = this.y;
        this.rightTop.cp1.y = this.y;
        this.leftTop.cp1.y = this.centerY - this.yBezierDistance;
        this.rightTop.cp2.y = this.centerY - this.yBezierDistance;
        this.rightBottom.cp1.y = this.centerY + this.yBezierDistance;
        this.leftBottom.cp2.y = this.centerY + this.yBezierDistance;

        if (this.startingPoint.x <= this.x) {
            this.isFlat = true;
            this.ratio(this.leftBottom.cp2);
            this.ratio(this.leftBottom.end);
            this.ratio(this.leftTop.cp1);
            this.ratio(this.leftTop.cp2);
            this.ratio(this.rightTop.cp1);
            this.ratio(this.rightTop.cp2);
            this.ratio(this.rightTop.end);
            this.ratio(this.rightTop.cp1);
            this.ratio(this.rightTop.cp2);
            this.ratio(this.rightTop.end);
            this.ratio(this.rightBottom.cp1);
        }
    }

    grow() {
        if (this.width < this.growTo.width) {
            var growRateX = this.growTo.speed / 2;
            var growRateY = this.growTo.speed / 50;
            this.width += growRateX * 2;
            this.x -= growRateX;

            this.startingPoint.x -= growRateX;
            this.leftBottom.cp1.x -= growRateX;
            this.leftBottom.cp2.x = ;
            this.leftBottom.end.x = newRatio(leftBottom.cp2);
            this.leftTop.cp1.x = newRatio(leftTop.cp1);
            this.leftTop.cp2.x = newRatio(leftTop.cp2);
            this.rightTop.cp1.x = newRatio(rightTop.cp1);
            this.rightTop.cp2.x = newRatio(rightTop.cp2);
            this.rightTop.end.x = newRatio(rightTop.end);
            this.rightTop.cp1.x = newRatio(rightTop.cp1);
            this.rightTop.cp2.x = newRatio(rightTop.cp2);
            this.rightTop.end.x = newRatio(rightTop.end);
            this.rightBottom.cp1.x = newRatio(rightBottom.cp1);
            this.rightBottom.cp2.x += growRateX;
            this.rightBottom.end.x += growRateX;


            this.height += growRateY;
            this.y -= growRateY;

            this.leftTop.cp1.y -= growRateY;
            this.leftTop.cp2.y -= growRateY;
            this.leftTop.end.y -= growRateY;
            this.rightTop.end.y -= growRateY;
            this.rightTop.cp1.y -= growRateY;
            this.rightTop.cp2.y -= growRateY;
            this.rightBottom.cp1.y -= growRateY;
            this.rightBottom.cp2.y -= growRateY;
            this.leftBottom.cp1.y -= growRateY;
            this.leftBottom.cp2.y -= growRateY;
            this.leftBottom.end.y -= growRateY;
        }
    }

    ratio(point) {
        point.ratio = (point.x - this.x) / this.width;
    }

    newRatio(point) {
        return this.width * point.ratio + this.x
    }

    animate() {
        if (!this.isFlat) {
            this.flatten();
        }
        if (this.growTo) {
            this.grow();
        }
    }

    get growTo() {
        return this._growTo;
    }

    set growTo(target) {
        this._growTo = {
            width: this.width + target.width / 2,
            speed: target.ySpeed
        };
    }

    draw(ctx) {
        this.animate();
        super.draw(ctx);
    }

}

export {
    Splat
}
