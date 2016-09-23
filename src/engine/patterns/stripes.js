import { simples } from '../simples/simples.js';

function stripes(container, stripeWidth, stripeSpacing, color, offSet) {

    offSet = offSet || 0;
    let stripes = [];
    let numStripes = container.width / (stripeWidth + stripeSpacing);

    let currentStripeX = container.x + offSet;

    for (let i = 0; i < numStripes; i++) {
        let stripe = new simples.Rectangle(currentStripeX, container.y, stripeWidth, container.height);
        stripe.color = color;

        stripe.draw = function(ctx) {
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

        stripes.push(stripe);

        currentStripeX += stripeWidth + stripeSpacing;
    }

    return stripes;
}

export { stripes }