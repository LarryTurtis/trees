import {
    Droplet
}
from './droplet.js';

import {
    CollisionRegistry
}
from './collisionRegistry.js';

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
        this.heightFactor = 4;
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

    grow() {
        if (this.width + 1 < this.growTo.width) {
            this.width += 1;
            this.x -= 1 / 2;
            this.startingPoint.x -= 1 / 2;
            this.leftBottom.cp1.x -= 1 / 2;

            // this.rightBottom.cp1.x += 1 / 2;
            this.rightBottom.cp2.x += 1 / 2;
            this.rightBottom.end.x += 1 / 2;
            // this.rightTop.cp1.x += 1 / 2;
            // //this.rightTop.cp2.x += 1 / 2;
            // this.rightTop.end.x += 1 / 2;
            // this.leftTop.cp1.x -= 1 / 2;
            // this.leftTop.cp2.x -= 1 / 2;
            // this.leftTop.end.x -= 1 / 2;
            // this.leftBottom.cp2.x -= 1 / 2;
            // this.leftBottom.end.x -= 1 / 2;
        }
        if (this.height + 1 < this.growTo.height) {
            this.height += 1;
            this.y -= 1;
            this.leftTop.cp1.y -= 1;
            this.leftTop.cp2.y -= 1;
            this.leftTop.end.y -= 1;
            this.rightTop.end.y -= 1;
            this.rightTop.cp1.y -= 1;
            this.rightTop.cp2.y -= 1;
            //this.rightBottom.cp1.y -= 1;
            // this.rightBottom.cp2.y -= 1;
            // this.rightBottom.end.y -= 1;
            // this.leftBottom.cp1.y -= 1;
            // this.leftBottom.cp2.y -= 1;
            this.leftBottom.end.y -= 1;
        }
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
            height: this.height + target.height / this.heightFactor,
            speed: target.ySpeed
        };
        this.heightFactor *= 1;
        console.log(this.heightFactor);
    }

    draw(ctx) {
        this.animate();
        super.draw(ctx);
    }

}

export {
    Splat
}
