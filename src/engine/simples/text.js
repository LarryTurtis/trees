import { Sprite } from '../sprite.js'
import { Canvas } from '../canvas.js'

let canvas = new Canvas();

class Text extends Sprite {
    constructor(text, x, y, size, font) {
        super(x, y, size, size);
        this.type = "Text";
        this._value = text;
        this._size = size;
        this._fontName = font;
        this._font = size + "px " + font;
    }

    get getWidth() {
        return canvas.measureText(this.value, this.font);
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get fontName() {
        return this._fontName;
    }

    set fontName(fontName) {
        this._fontName = fontName;
    }

    get font() {
        return this._font;
    }

    set font(font) {
        this.fontName = font;
        this._font = this.size + "px " + this.fontName;
    }

    get size() {
        return this._size;
    }

    set size(size) {
        this._size = size;
        this._font = size + "px " + this.fontName;
    }

    draw(ctx) {
        super.draw(ctx);
        ctx.font = this.font;
        ctx.textBaseline = "hanging";
        if (Array.isArray(this.color)) {
            let letters = this.value.split("");
            let x = this.x;
            letters.forEach((letter, index) => {
                let color;
                if (index <= this.color.length - 1) {
                    color = this.color[index];
                } else {
                    color = this.color[index % this.color.length]
                }
                ctx.fillStyle = color;
                ctx.fillText(letter, x, this.y);
                x += ctx.measureText(letter).width
            });
        } else {
            ctx.fillText(this.value, this.x, this.y);
        }
    }

}

export { Text }
