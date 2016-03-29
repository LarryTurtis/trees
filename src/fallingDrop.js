import {
    Droplet
}
from './droplet.js';

class FallingDrop extends Droplet {
    constructor(x, y, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height);
        this.type = "Droplet";
        this.ySpeed = 1;
        this.xSpeed = 0;
        this.isFlat = false;
        this.minHeight = this.height / 2;
    }

    applyGravity() {
        console.log('gravity');
        this.ySpeed *= 1.02;
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    flatten() {
        console.log('flattening');
        this.height -= this.ySpeed / 2;
        this.leftBottom.cp1.x -= this.ySpeed;
        this.rightBottom.cp2.x += this.ySpeed;
        if (this.height <= this.minHeight) {
            this.isFlat = true;
        }
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
    }

}

export {
    FallingDrop
}
