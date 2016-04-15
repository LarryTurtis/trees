import { Droplet } from './droplet.js';
import { ShapesRegistry } from './shapesregistry.js';

let shapesRegistry = new ShapesRegistry();

class Splat extends Droplet {
    constructor(x, y, width, height, ySpeed, angle) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height, angle);
        this.type = "Splat";
        this.ySpeed = ySpeed;
        this.xSpeed = 0;
        this.isFlat = false;
        this.minHeight = this.height / 2;
        this._growTo = null;
        this.heightFactor = 5;
    }

    applyGravity() {
        this.ySpeed *= 1.02;
        this.y += this.ySpeed;
        this.x += this.xSpeed;
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
        this.leftBottom.cp2.x -= this.ySpeed / 3;
        this.rightBottom.cp1.x += this.ySpeed / 3;
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
            this.allPoints(point => {
                this.ratio(point)
            });
        }
    }

    grow() {
        if (this.width < this.growTo.width) {
            var growRateX = this.growTo.speed / 2;
            var growRateY = this.growTo.speed / 50;

            this.width += growRateX * 2;
            this.x -= growRateX;
            this.height += growRateY;
            this.y -= growRateY;

            this.startingPoint.x -= growRateX;

            this.leftBottom.cp1.x -= growRateX;
            this.leftBottom.cp2.x = this.newRatio(this.leftBottom.cp2);
            this.leftBottom.end.x = this.newRatio(this.leftBottom.end);

            this.rightBottom.cp1.x = this.newRatio(this.rightBottom.cp1);
            this.rightBottom.cp2.x += growRateX;
            this.rightBottom.end.x += growRateX;

            this.rightBottom.cp1.y -= growRateY;
            this.rightBottom.cp2.y -= growRateY;

            this.leftTop.points.forEach(point => {
                point.x = this.newRatio(point);
                point.y -= growRateY;
            });
            this.rightTop.points.forEach(point => {
                point.x = this.newRatio(point);
                point.y -= growRateY;
            });
            this.leftBottom.points.forEach(point => {
                point.y -= growRateY;
            });
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
        } else if (this.growTo) {
            this.grow();
        }
        if (!this.collisions.length) {
            this.applyGravity();
        }
        this.collisions.forEach(collision => {
            this.angle = collision.obj.angle;
        });

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

export { Splat }
