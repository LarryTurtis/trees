import { Sprite } from './sprite.js'

class Stream extends Sprite {
    constructor(centerX, centerY, width, height) {
        // Here, it calls the parent class' constructor with lengths
        // provided for the Polygon's width and height
        super(centerX, centerY, width, height);
        this.gravity = 0;
    }

    applyGravity(curve) {
        curve.top.end.y += this.gravity;
        curve.left.end.y += this.gravity;
        //curve.bottom.cp1.y += this.gravity;
        //curve.bottom.end.y += this.gravity / 2;
        //curve.top.cp2.x = this.x + this.w;
        //curve.left.cp2.x = curve.top.cp2.x + this.h;
        //curve.left.cp2.y -= this.gravity;
        //curve.bottom[2].y += this.gravity;
    }

    get a() {
        return {
            x: this.x,
            y: this.y
        }
    }

    get b() {
        return {
            x: this.x + this.w + this.h,
            y: this.y
        }
    }

    get c() {
        return {
            x: this.x + this.w,
            y: this.y + this.h
        }
    }

    get d() {
        return {
            x: this.x,
            y: this.y + this.h
        }
    }

    get top() {
        return { cp1: this.a, cp2: this.b, end: this.b }
    }

    get left() {
        return { cp1: this.b, cp2: this.c, end: this.c }
    }

    get bottom() {
        return { cp1: this.c, cp2: this.d, end: this.d }
    }

    get right() {
        return { cp1: this.d, cp2: this.a, end: this.a }
    }

    getCurve() {
        return {
            top: this.top,
            left: this.left,
            bottom: this.bottom,
            right: this.right
        }
    }

    draw(ctx) {

        super.draw(ctx);
        let curve = this.getCurve();
        this.applyGravity(curve);
        ctx.moveTo(this.x, this.y)
        ctx.beginPath();
        ctx.curve(curve.top);
        ctx.lineTo(curve.left.end.x, curve.left.end.y)
            //ctx.curve(curve.left);
        ctx.curve(curve.bottom);
        ctx.curve(curve.right);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();


        // [curve.top, curve.left, curve.bottom].forEach(point => {
        //     ctx.beginPath();
        //     ctx.fillStyle = "red";
        //     ctx.rect(point.cp1.x, point.cp1.y, 10, 10);
        //     ctx.fill();
        //     ctx.closePath();
        //     ctx.beginPath();
        //     ctx.fillStyle = "blue";
        //     ctx.rect(point.cp2.x, point.cp2.y, 10, 10);
        //     ctx.fill();
        //     ctx.closePath();
        //     ctx.beginPath();
        //     ctx.fillStyle = "yellow";
        //     ctx.rect(point.end.x, point.end.y, 10, 10);
        //     ctx.fill();
        //     ctx.closePath();
        // })

    }

}

export { Stream }
