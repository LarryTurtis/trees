class Sprite {
    constructor(centerX, centerY, size) {
        this.centerX = centerX;
        this.centerY = centerY;
        this.size = size;
        this.w = size;
        this.h = size;
        this.x = this.centerX - (size / 2);
        this.y = this.centerY - (size / 2);
        this.lineWidth = 2;
        this.showBoundingBox = false;
    }

    resize(size) {
        this.size = size;
        this.w = size;
        this.h = size;
        this.x = this.centerX - (size / 2);
        this.y = this.centerY - (size / 2);
    }

    moveInCircle(deg, size) {
        this.x = this.centerX + Math.sin(deg) * size;
        this.y = this.centerY + Math.cos(deg) * size;
    }

    setColor(color) {
        this.color = color;
    }

    setBoundingBox(value) {
        this.showBoundingBox = value;
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
