import { Sprite } from '../sprite.js';

class SemiCircle extends Sprite {
    constructor(x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "SemiCircle";
        this._radius = width / 2;
        
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        this._radius = radius;
    }

    get width() {
        return super.width;
    }

    set width(width) {
        super.width = width;
        this.radius = width / 2;
    }

    get height() {
        return super.height;
    }

    set height(height) {
        super.height = height;
        //this.radius = height/2;
    }


    createSATObject() {
        return [new SAT.Circle(new SAT.Vector(this.center.x, this.center.y), this.radius)];
    }

    draw(ctx) {
        super.draw(ctx);

        ctx.beginPath();

        ctx.arc(this.center.x, this.center.y, this.radius, 1 * Math.PI, 0)

        ctx.fill();
        ctx.stroke();
        ctx.closePath();
    }

}

export { SemiCircle }