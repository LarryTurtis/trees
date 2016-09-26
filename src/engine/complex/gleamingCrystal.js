import { simples } from '../simples/simples.js';
import { patterns } from '../patterns/patterns.js';
import { Crystal } from './crystal.js';
import { ShapesRegistry } from '../shapesregistry.js';

let shapesRegistry = new ShapesRegistry();

class GleamingCrystal extends Crystal {
    constructor(x, y, width, height) {
        super(x, y, width, height);
        this.type = "GleamingCrystal";
    }

    addStripes() {
        if (this.stripeWidth && this.stripeSpacing && this.stripeColor && this.stripeOrientation) {
            this.stripes = patterns.stripes(this.triangle5, this.stripeWidth, this.stripeSpacing, this.stripeColor, this.stripeOrientation);

            this.stripes.forEach(stripe => {
                let counter = 0;
                stripe.animate = (function() {
                    if (counter < this.width.percent(200)) {
                        let next = trees.getPointOnLine(this.a, counter++, trees.getAngle(this.a, this.b));
                        stripe.x = next.x;
                        stripe.y = next.y;
                    } else {
                        counter = 0;
                    }
                }).bind(this);
                shapesRegistry.addToDynamicBackground(stripe);
            });

        }
    }

    rotate(deg, transformOrigin) {
        super.rotate(deg, transformOrigin);
        this.stripes.forEach(stripe => {
            stripe.rotate(deg, transformOrigin);
        });
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

export { GleamingCrystal }