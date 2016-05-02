import { Sprite } from '../sprite.js'

class Circle extends Sprite {
    constructor(x, y, width, height, angle, isComponent) {
        super(x, y, width, height, angle);
        this.type = "Circle";
        this.isComponent = isComponent;
    }

    createSATObject() {
        return [new SAT.Circle(new SAT.Vector(this.center.x, this.center.y), this.width / 2)];
    }

    draw(ctx) {
        super.draw(ctx);

        if (!this.isComponent) ctx.beginPath();

        ctx.arc(this.center.x, this.center.y, this.width / 2, 0, 2 * Math.PI)

        ctx.fill();
        if (!this.isComponent) {
            ctx.stroke();
            ctx.closePath();
        }
    }

}

export { Circle }
