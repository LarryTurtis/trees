import { Sprite } from '../sprite.js';

class CircleStripe extends Sprite {
    constructor(start, tan, end, radius) {

        let x = start.x;
        let y = start.y;
        let width = end.x - start.x;
        let height = end.y - start.y;

        super(x, y, width, height);

        this.type = "CircleStripe";

        this._start = start;
        this._tan = tan;
        this._end = end;
        this._radius = radius;

    }

    get start() {
        return this._start;
    }

    set start(start) {
        this._start = start;
    }

    get tan() {
        return this._tan;
    }

    set tan(tan) {
        this._tan = tan;
    }

    get end() {
        return this._end;
    }

    set end(end) {
        this._end = end;
    }

    get radius() {
        return this._radius;
    }

    set radius(radius) {
        this._radius = radius;
    }


    draw(ctx) {
        //super.draw(ctx);

        ctx.beginPath();
        ctx.yMove(this.start);
        ctx.arcTo(this.tan.x, this.tan.y, this.end.x, this.end.y, this.radius);
        ctx.fillStyle = "red";
        ctx.fillRect(this.start.x, this.start.y, 5, 5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();

        ctx.fillStyle = "blue";
        ctx.fillRect(this.end.x, this.end.y, 5, 5);
        ctx.fill();
        ctx.closePath();
        ctx.beginPath();

        ctx.fillStyle = "yellow";
        ctx.fillRect(this.tan.x, this.tan.y, 5, 5)
        console.log(this.tan);
        ctx.closePath();

        // ctx.lineTo(this.end.x, this.end.y + 20);
        // ctx.lineTo(this.start.x, this.end.y + 20);
        // ctx.lineTo(this.start.x, this.start.y);
        ctx.lineColor = "black";
        ctx.stroke();
        if (this.lineColor) ctx.stroke();
        ctx.closePath();
    }

}

export { CircleStripe }