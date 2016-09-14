import { Sprite } from '../sprite.js'
import { Curve } from '../curve.js'
import { Point } from '../point.js'

class Meniscus extends Sprite {
    constructor(x, y, width, height, openingEdge, orientation) {
        super(x, y, width, height);

        if (!openingEdge) {
            throw new Error("Attempted to create meniscus without openingEdgepoint");
        }

        this.type = "Meniscus";
        this._cp1;
        this._cp2;
        this._overhang;
        this._openingEdge = openingEdge;
        this._factor = 0.5;
        this._overhangWidth = width * this._factor;
        if (orientation === "I") {
            this._cp2 = new Point(x + this.width / 2, this.y);
            this._cp1 = new Point(this.x, this.y);
            this._overhang = new Point(this._openingEdge.x + this._overhangWidth, this._openingEdge.y);
        } else if (orientation === "II") {
            this._cp2 = new Point(x - this.width / 2, this.y);
            this._cp1 = new Point(this.x, this.y);
            this._overhang = new Point(this._openingEdge.x - this._overhangWidth, this._openingEdge.y);
        } else if (orientation === "III") {
            this._cp2 = new Point(x - this.width / 2, this.y);
            this._cp1 = new Point(this.x, this.y);
            this._overhang = new Point(this._openingEdge.x - this._overhangWidth, this._openingEdge.y);
        } else if (orientation === "IV") {
            this._cp2 = new Point(x + this.width / 2, this.y);
            this._cp1 = new Point(this.x, this.y);
            this._overhang = new Point(this._openingEdge.x + this._overhangWidth, this._openingEdge.y);
        } 

        this._curve = new Curve(this._cp1, this._cp2, this._overhang);
    }

    get factor() {
        return this._factor;
    }

    set factor(factor) {
        this._factor = factor;
    }

    get overhangWidth() {
        return this._overhangWidth;
    }

    set overhangWidth(overhangWidth) {
        this._overhangWidth = overhangWidth;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.yMove(this.origin);
        ctx.curve(this._curve);
        ctx.yLine(this._openingEdge);
        ctx.yLine(this.origin);
        ctx.closePath();
        ctx.fill();

        ctx.fillStyle = "red";
        ctx.rect(this._cp1.x, this._cp1.y, 5, 5)
        ctx.rect(this._cp2.x, this._cp2.y, 5, 5)
        ctx.stroke();

        ctx.fillStyle = this.color;
    }

}

export { Meniscus }
