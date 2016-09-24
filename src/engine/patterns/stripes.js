import { simples } from '../simples/simples.js';
import { complex } from '../complex/complex.js';

function stripes(container, stripeSize, stripeSpacing, color, orientation) {

    let stripes = [];
    if (!orientation || orientation === "vertical") {

        let numStripes = container.width / (stripeSize + stripeSpacing);
        let currentStripe = container.x + stripeSpacing;

        for (let i = 0; i < numStripes; i++) {
            let stripe = new simples.Rectangle(currentStripe, container.y, stripeSize, container.height);
            stripe.color = color;
            stripe.draw = draw
            stripes.push(stripe);
            currentStripe += stripeSize + stripeSpacing;
        }

    } else {

        let numStripes = container.height / (stripeSize + stripeSpacing);
        let currentStripe = container.y;

        for (let i = 0; i < numStripes; i++) {
            let stripe = new simples.Rectangle(container.x, currentStripe, container.width, stripeSize);
            stripe.color = color;
            stripe.draw = draw
            stripes.push(stripe);
            currentStripe += stripeSize + stripeSpacing;
        }

    }

    function draw(ctx) {
        ctx.save();
        ctx.beginPath();
        container.pathOnly = true;
        container.draw(ctx);
        container.pathOnly = false;
        ctx.clip();
        ctx.closePath();
        ctx.beginPath();
        let rect = {
            a: this.a,
            b: this.b,
            c: this.c,
            d: this.d
        };
        ctx.yMove(this.a);
        ctx.yRect(rect);
        ctx.fillStyle = color;
        ctx.fill();
        ctx.closePath();
        ctx.restore();
    }

    return stripes;
}


export { stripes }
