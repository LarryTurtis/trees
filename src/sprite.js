class Sprite {
    constructor(x, y, size) {
        this.x = x || 0;
        this.y = y || -size;
        this.w = size;
        this.h = size;
        this.color = "#000000";
        this.lineWidth = 1;
        this.strokeStyle = "#000000";
        this.showBoundingBox = true;
    }

    setColor(color) {
        this.color = color;
    }

    setStrokeSize(size) {
        this.lineWidth = size;
    }

    setStrokeColor(color) {
        this.strokeStyle = color;
    }

    draw(ctx) {
        if (this.showBoundingBox) {
            ctx.beginPath();
            ctx.strokeStyle = this.strokeStyle;
            ctx.lineWidth = this.lineWidth;
            ctx.rect(this.x, this.y, this.w, this.h)
            ctx.stroke();
            ctx.closePath();
        }
    }
}
export { Sprite }
