import { simples } from "../simples/simples.js";
import { complex } from "../complex/complex.js";

function argyle(container) {
  return getRandomStripes(container);
}
function getRandomStripes(container) {
  let stripeSize = container.width.percent(trees.random(1, 20));
  let stripeSpacing = container.width.percent(trees.random(1, 20));
  let stripeColor = (function () {
    let arr = [];
    for (let i = 0; i < trees.random(1, 25); i++) {
      arr.push(trees.randomColor());
    }
    return arr;
  })();
  let stripeOrientation = ["vertical", "diagonal", "horizontal"][
    trees.random(0, 2)
  ];
  return stripes(
    container,
    stripeSize,
    stripeSpacing,
    stripeColor,
    stripeOrientation
  );
}
function stripes(container, stripeSize, stripeSpacing, color, orientation) {
  let stripes = [];
  if (!orientation || orientation === "vertical") {
    let numStripes = container.width / (stripeSize + stripeSpacing);
    let currentStripe = container.x;

    for (let i = 0; i < numStripes; i++) {
      let stripe = new simples.Rectangle(
        currentStripe,
        container.y,
        stripeSize,
        container.height
      );
      stripe.color = color[i % color.length];
      stripe.draw = function (ctx) {
        ctx = ctx || (this.canvas && this.canvas.ctx);

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
          d: this.d,
        };
        ctx.yMove(this.a);
        ctx.yRect(rect);
        ctx.fillStyle = color[i % color.length];
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      };

      stripes.push(stripe);
      currentStripe += stripeSize + stripeSpacing;
    }
  } else if (orientation === "horizontal") {
    let numStripes = container.height / (stripeSize + stripeSpacing);
    let currentStripe = container.y;

    for (let i = 0; i < numStripes; i++) {
      let stripe = new simples.Rectangle(
        container.x,
        currentStripe,
        container.width,
        stripeSize
      );
      stripe.color = color[i % color.length];
      stripe.draw = function (ctx) {
        ctx = ctx || (this.canvas && this.canvas.ctx);

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
          d: this.d,
        };
        ctx.yMove(this.a);
        ctx.yRect(rect);
        ctx.fillStyle = color[i % color.length];
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      };

      stripes.push(stripe);
      currentStripe += stripeSize + stripeSpacing;
    }
  } else if (orientation === "diagonal") {
    let numStripes = (container.height / (stripeSize + stripeSpacing)) * 2;
    let currentStripe = container.y;

    for (let i = 0; i < numStripes; i++) {
      let stripe = new simples.Rectangle(
        container.x - container.width / 2,
        currentStripe - container.width / 2,
        container.width * 2,
        stripeSize
      );
      stripe.rotate(-45, stripe.center);
      stripe.color = color[i % color.length];
      stripe.draw = function (ctx) {
        ctx = ctx || (this.canvas && this.canvas.ctx);

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
          d: this.d,
        };
        ctx.yMove(this.a);
        ctx.yRect(rect);
        ctx.fillStyle = color[i % color.length];
        ctx.fill();
        ctx.closePath();
        ctx.restore();
      };

      stripes.push(stripe);
      currentStripe += stripeSize + stripeSpacing;
    }
  }

  return stripes;
}

export { stripes, argyle };
