import { Sprite } from './sprite.js'

class Text extends Sprite {
    constructor(text, x, y, width, height, angle) {
        super(x, y, width, height, angle);
        this.type = "Text";
        this._font = this.width + "px Arial Black";
        this.text = text;
        this.colors = [];
        for (var i = 0; i < 15; i++) {
            this.colors.push('#' + Math.floor(Math.random() * 16777215).toString(16));
        }
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.beginPath();
        ctx.font = this._font;
        ctx.rotate(this.angle * Math.PI / 180);
        this.text.split("").map((character, index) => {
            ctx.fillStyle = this.colors[index];
            ctx.fillText(character, this.x + index * this.width, this.y);
        });
        ctx.closePath();
        ctx.rotate(-(this.angle * Math.PI / 180));
    }

}

export { Text }