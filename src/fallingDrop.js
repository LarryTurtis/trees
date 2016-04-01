import {
    Droplet
}
from './droplet.js';

import {
    ShapesRegistry
}
from './shapesregistry.js'

import {
    Splat
}
from './splat.js'

let shapesRegistry = new ShapesRegistry();

class FallingDrop extends Droplet {
    constructor(x, y, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height);
        this.type = "FallingDrop";
        this.ySpeed = 3;
        this.xSpeed = 0;
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
        this.updateY();
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        this.updateY();
    }

    updateX() {
        this.startingPoint.x = this.centerX;
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
        this.startingPoint.y = this.y + this.height;
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

    applyGravity() {
        this.ySpeed *= 1.02;
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    animate() {

        if (!this.collisions.length) {
            this.applyGravity();
        }

        if (this.collisions.length) {
            for (var i = 0; i < this.collisions.length; i++) {
                if (this.collisions[i].obj !== this) {
                    if (this.collisions[i].obj.type === "Splat") {
                        this.collisions[i].obj.growTo = this;
                        shapesRegistry.remove(this);
                        break;
                    }
                    if (this.collisions[i].obj.type === "Platform") {
                        this.y = this.collisions[i].obj.y - this.height;
                        var splat = new Splat(this.x, this.y, this.width, this.height, this.ySpeed);
                        shapesRegistry.add(splat);
                        shapesRegistry.remove(this);
                        break;
                    }
                    if (this.collisions[i].obj.type === "FallingDrop") {
                        this.y = this.collisions[i].obj.y - this.height;
                        break;
                    }
                }
            };
        }
    }

    draw(ctx) {
        this.animate();
        super.draw(ctx);
    }

}

export {
    FallingDrop
}
