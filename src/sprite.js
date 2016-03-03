class Sprite {
    constructor(centerX, centerY, width, height) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.w = width;
        this.h = height || width;
        this.x = this.centerX - (width / 2);
        this.y = this.centerY - (height / 2);
        this._lineWidth = 2;
        this._showBoundingBox = false;
        this._color = "black";
        this._lineColor = "black"
    }

    resize(width, height) {
        this.w = width;
        this.h = height;
        this.x = this.centerX - (width / 2);
        this.y = this.centerY - (height / 2);
    }

    moveInCircle(deg, size) {
        this.x = this.centerX + Math.sin(deg) * size;
        this.y = this.centerY + Math.cos(deg) * size;
    }

    set showBoundingBox(bool) {
        this._showBoundingBox = bool;
    }

    get showBoundingBox() {
        return this._showBoundingBox;
    }

    set color(color) {
        this._color = color;
    }

    get color() {
        return this._color;
    }

    set lineColor(color) {
        this._lineColor = color
    }

    get lineColor() {
        return this._lineColor;
    }

    set lineWidth(width) {
        this._lineWidth = width
    }

    get lineWidth() {
        return this._lineWidth;
    }


    draw(ctx) {
        if (this._showBoundingBox) {
            ctx.beginPath();
            ctx.strokeStyle = "black";
            ctx.fillStyle = "none";
            ctx.lineWidth = "2px";
            ctx.rect(this.x, this.y, 5, 5);
            ctx.rect(this.x, this.y, this.w, this.h)
            ctx.stroke();
            ctx.closePath();
        }
        ctx.fillStyle = this._color;
        ctx.strokeStyle = this._lineColor;
        ctx.lineWidth = this._lineWidth;
    }
}
export { Sprite }
