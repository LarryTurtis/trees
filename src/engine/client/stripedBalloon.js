import { simples } from '../simples/simples.js';
import { patterns } from '../patterns/patterns.js';
import { HotAirBalloon } from './hotAirBalloon.js';

class StripedBalloon extends HotAirBalloon {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "Balloon";
    }

    addStripes() {
        if (this.stripeWidth && this.stripeSpacing && this.stripeColor && this.stripeOrientation) {
            this.stripes = patterns.stripes(this.balloon, this.stripeWidth, this.stripeSpacing, this.stripeColor, this.stripeOrientation);

            this.stripes.forEach(stripe => {
                this.addShape(stripe);
            });

        }
    }

    get stripeColor() {
        return this._stripeColor;
    }

    set stripeColor(stripeColor) {
        this._stripeColor = stripeColor;
        this.addStripes();
    }

    get stripeWidth() {
        return this._stripeWidth;
    }

    set stripeWidth(stripeWidth) {
        this._stripeWidth = stripeWidth;
        this.addStripes();
    }

    get stripeSpacing() {
        return this._stripeSpacing;
    }

    set stripeSpacing(stripeSpacing) {
        this._stripeSpacing = stripeSpacing;
        this.addStripes();
    }

    get stripeOrientation() {
        return this._stripeOrientation;
    }

    set stripeOrientation(stripeOrientation) {
        this._stripeOrientation = stripeOrientation;
        this.addStripes();
    }



}

export { StripedBalloon }
