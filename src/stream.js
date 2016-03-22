import { Point } from './point.js'
import { Sprite } from './sprite.js'
import { Curve } from './curve.js'
import { Collision } from './collision.js'

class Stream extends Sprite {
    constructor(centerX, centerY, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(centerX, centerY, width, height);
        this.gravity = 0;

        let x = centerX - (width / 2);
        let y = centerY - (height / 2);

        let cp1 = new Point(x, y);
        let cp2 = new Point(x + width, y);
        let end = new Point(x + width, y);

        this.curves = [new Curve(cp1, cp2, end)];

        // var left = new Collision(0,0,0,782);
        // var right = new Collision(1800,1800,0,782);
        // var top = new Collision(0,1800,0,0);
        var bottom = new Collision(0, 1800, 782, 782);

        // this.collisionRegistry.addCollision(left);
        // this.collisionRegistry.addCollision(right);
        // this.collisionRegistry.addCollision(top);
        this.collisionRegistry.addCollision(bottom);
    }

    applyGravity(curve) {
        this.height += this.gravity;
        curve.end.y = this.height;
        this.width += this.size;
        curve.end.x = this.width;
        curve.cp2.x = this.width;
    }

    draw(ctx) {
        var stream = this;
        super.draw(ctx);
        ctx.yMove(this.a)
        ctx.beginPath();
        this.curves.forEach(curve => {

            if (!stream.hasCollisions) {

                stream.applyGravity(curve);
                ctx.curve(curve);
                ctx.stroke();
                //ctx.closePath();

                ctx.beginPath();
                ctx.fillStyle = "red";
                ctx.rect(curve.cp1.x, curve.cp1.y, 10, 10);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "blue";
                ctx.rect(curve.cp2.x, curve.cp2.y, 10, 10);
                ctx.fill();
                ctx.closePath();
                ctx.beginPath();
                ctx.fillStyle = "yellow";
                ctx.rect(curve.end.x, curve.end.y, 10, 10);
                ctx.fill();
                ctx.closePath();

            }

        });

    }

}

export { Stream }