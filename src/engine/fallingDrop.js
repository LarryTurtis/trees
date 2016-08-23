import { Droplet } from './droplet.js';
import { ShapesRegistry } from './shapesregistry.js'
import { gravity } from './animations/gravity.js'

let shapesRegistry = new ShapesRegistry();

class FallingDrop extends Droplet {
    constructor(x, y, width, height, angle) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(x, y, width, height, angle);
        this.type = "FallingDrop";
        if (gravity()) {
            this.ySpeed = 3;
        } else {
            this.ySpeed = 0;
        }
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

    createSATObject() {
        return [new SAT.Polygon(new SAT.Vector(this.x, this.y), [
            new SAT.Vector(this.a.x - this.x, this.a.y - this.y),
            new SAT.Vector(this.b.x - this.x, this.b.y - this.y),
            new SAT.Vector(this.c.x - this.x, this.c.y - this.y),
            new SAT.Vector(this.d.x - this.x, this.d.y - this.y)
        ])];
    }

    updateX() {
        this.startingPoint.x = trees.getPointOnLine(this.d, this.width / 2, this.angle).x;
        this.rightTop.cp1.x = trees.getPointOnLine(this.a, this.width / 2 + this.xBezierDistance, this.angle).x;
        this.rightTop.cp2.x = trees.getPointOnLine(this.b, this.height / 2 - this.yBezierDistance, this.angle + 90).x;
        this.rightTop.end.x = trees.getPointOnLine(this.b, this.height / 2, this.angle + 90).x;
        this.leftTop.cp1.x = trees.getPointOnLine(this.d, this.height / 2 + this.yBezierDistance, this.angle - 90).x;
        this.leftTop.cp2.x = trees.getPointOnLine(this.a, this.width / 2 - this.xBezierDistance, this.angle).x;
        this.leftTop.end.x = trees.getPointOnLine(this.a, this.width / 2, this.angle).x;
        this.rightBottom.cp1.x = trees.getPointOnLine(this.b, this.height / 2 + this.yBezierDistance, this.angle + 90).x;
        this.rightBottom.cp2.x = trees.getPointOnLine(this.d, this.width / 2 + this.xBezierDistance, this.angle).x;
        this.rightBottom.end.x = trees.getPointOnLine(this.d, this.width / 2, this.angle).x;
        this.leftBottom.cp1.x = trees.getPointOnLine(this.d, this.width / 2 - this.xBezierDistance, this.angle).x;
        this.leftBottom.cp2.x = trees.getPointOnLine(this.d, this.height / 2 - this.yBezierDistance, this.angle - 90).x;
        this.leftBottom.end.x = trees.getPointOnLine(this.d, this.height / 2, this.angle - 90).x;
    }

    updateY() {
        this.startingPoint.y = trees.getPointOnLine(this.d, this.width / 2, this.angle).y;
        this.rightTop.cp1.y = trees.getPointOnLine(this.a, this.width / 2 + this.xBezierDistance, this.angle).y;
        this.rightTop.cp2.y = trees.getPointOnLine(this.b, this.height / 2 - this.yBezierDistance, this.angle + 90).y;
        this.rightTop.end.y = trees.getPointOnLine(this.b, this.height / 2, this.angle + 90).y;
        this.leftTop.cp1.y = trees.getPointOnLine(this.d, this.height / 2 + this.yBezierDistance, this.angle - 90).y;
        this.leftTop.cp2.y = trees.getPointOnLine(this.a, this.width / 2 - this.xBezierDistance, this.angle).y;
        this.leftTop.end.y = trees.getPointOnLine(this.a, this.width / 2, this.angle).y;
        this.rightBottom.cp1.y = trees.getPointOnLine(this.b, this.height / 2 + this.yBezierDistance, this.angle + 90).y;
        this.rightBottom.cp2.y = trees.getPointOnLine(this.d, this.width / 2 + this.xBezierDistance, this.angle).y;
        this.rightBottom.end.y = trees.getPointOnLine(this.d, this.width / 2, this.angle).y;
        this.leftBottom.cp1.y = trees.getPointOnLine(this.d, this.width / 2 - this.xBezierDistance, this.angle).y;
        this.leftBottom.cp2.y = trees.getPointOnLine(this.d, this.height / 2 - this.yBezierDistance, this.angle - 90).y;
        this.leftBottom.end.y = trees.getPointOnLine(this.d, this.height / 2, this.angle - 90).y;
    }

    fall() {
        this.transformOrigin = this.center;
        this.xSpeed *= 0.95;
        this.ySpeed *= 1.1;
        this.y += this.ySpeed;
        this.x += this.xSpeed;
    }

    slide(platform) {
        if (this.angle < platform.angle) {
            this.angle += this.ySpeed;
            if (this.angle > platform.angle) this.angle = platform.angle;
        }
        if (this.angle > platform.angle) {
            this.angle -= this.ySpeed;
            if (this.angle < platform.angle) this.angle = platform.angle;
        }
        this.transformOrigin = platform.angle < 0 ? this.c : this.d;
        this.angle = platform.angle;
        this.transformOrigin = this.center;

        if (platform.angle !== 0) {
            if (platform.angle < 0) this.xSpeed = -Math.abs(this.xSpeed);
            this.xSpeed *= 1.01
            var next = trees.getPointOnLine(this.origin, this.xSpeed, platform.angle);
            this.x = next.x;
            this.y = next.y;
        }
    }

    animate() {
        if (!this.collidingWithPlatform) this.fall();
    }

    draw(ctx) {
        super.draw(ctx);
    }

}

export { FallingDrop }
