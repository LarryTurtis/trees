import { Droplet } from './droplet.js';
import { ShapesRegistry } from './shapesregistry.js'
import { gravity } from './gravity.js'

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
        return [new SAT.Polygon(new SAT.Vector(0, 0), [
            new SAT.Vector(this.d.x, this.d.y),
            new SAT.Vector(this.c.x, this.c.y),
            new SAT.Vector(this.b.x, this.b.y),
            new SAT.Vector(this.a.x, this.a.y)
        ])];
    }

    updateX() {
        this.startingPoint.x = this.getPointOnLine(this.d, this.width / 2, this.angle).x;
        this.rightTop.cp1.x = this.getPointOnLine(this.a, this.width / 2 + this.xBezierDistance, this.angle).x;
        this.rightTop.cp2.x = this.getPointOnLine(this.b, this.height / 2 - this.yBezierDistance, this.angle + 90).x;
        this.rightTop.end.x = this.getPointOnLine(this.b, this.height / 2, this.angle + 90).x;
        this.leftTop.cp1.x = this.getPointOnLine(this.d, this.height / 2 + this.yBezierDistance, this.angle - 90).x;
        this.leftTop.cp2.x = this.getPointOnLine(this.a, this.width / 2 - this.xBezierDistance, this.angle).x;
        this.leftTop.end.x = this.getPointOnLine(this.a, this.width / 2, this.angle).x;
        this.rightBottom.cp1.x = this.getPointOnLine(this.b, this.height / 2 + this.yBezierDistance, this.angle + 90).x;
        this.rightBottom.cp2.x = this.getPointOnLine(this.d, this.width / 2 + this.xBezierDistance, this.angle).x;
        this.rightBottom.end.x = this.getPointOnLine(this.d, this.width / 2, this.angle).x;
        this.leftBottom.cp1.x = this.getPointOnLine(this.d, this.width / 2 - this.xBezierDistance, this.angle).x;
        this.leftBottom.cp2.x = this.getPointOnLine(this.d, this.height / 2 - this.yBezierDistance, this.angle - 90).x;
        this.leftBottom.end.x = this.getPointOnLine(this.d, this.height / 2, this.angle - 90).x;
    }

    updateY() {
        this.startingPoint.y = this.getPointOnLine(this.d, this.width / 2, this.angle).y;
        this.rightTop.cp1.y = this.getPointOnLine(this.a, this.width / 2 + this.xBezierDistance, this.angle).y;
        this.rightTop.cp2.y = this.getPointOnLine(this.b, this.height / 2 - this.yBezierDistance, this.angle + 90).y;
        this.rightTop.end.y = this.getPointOnLine(this.b, this.height / 2, this.angle + 90).y;
        this.leftTop.cp1.y = this.getPointOnLine(this.d, this.height / 2 + this.yBezierDistance, this.angle - 90).y;
        this.leftTop.cp2.y = this.getPointOnLine(this.a, this.width / 2 - this.xBezierDistance, this.angle).y;
        this.leftTop.end.y = this.getPointOnLine(this.a, this.width / 2, this.angle).y;
        this.rightBottom.cp1.y = this.getPointOnLine(this.b, this.height / 2 + this.yBezierDistance, this.angle + 90).y;
        this.rightBottom.cp2.y = this.getPointOnLine(this.d, this.width / 2 + this.xBezierDistance, this.angle).y;
        this.rightBottom.end.y = this.getPointOnLine(this.d, this.width / 2, this.angle).y;
        this.leftBottom.cp1.y = this.getPointOnLine(this.d, this.width / 2 - this.xBezierDistance, this.angle).y;
        this.leftBottom.cp2.y = this.getPointOnLine(this.d, this.height / 2 - this.yBezierDistance, this.angle - 90).y;
        this.leftBottom.end.y = this.getPointOnLine(this.d, this.height / 2, this.angle - 90).y;
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
            var next = this.getPointOnLine(this.origin, this.xSpeed, platform.angle);
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
