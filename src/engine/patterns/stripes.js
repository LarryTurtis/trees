import { simples } from "../simples/simples.js";
import { complex } from "../complex/complex.js";

const HORIZONTAL = "horizontal";
const VERTICAL = "vertical";
const DIAGONAL = "diagonal";
const REVERSE_DIAGONAL = "reverse-diagonal";

const getRandomColorList = () => Array(25).fill().map(trees.randomColor);

function argyle(container) {
  return getRandomStripes(container);
}
function getRandomOrientation() {
  return [HORIZONTAL, VERTICAL, DIAGONAL, REVERSE_DIAGONAL][trees.random(0, 3)];
}
function getRandomStripes(container) {
  let stripeSize = container.width.percent(trees.random(1, 20));
  let stripeSpacing = container.width.percent(trees.random(1, 20));
  return stripes(
    container,
    stripeSize,
    stripeSpacing,
    getRandomColorList(),
    getRandomOrientation()
  );
}
function stripes(container, stripeSize, stripeSpacing, color, orientation) {
  let stripes = [];
  let numStripes = (container.width / (stripeSize + stripeSpacing)) * 1.5;
  let totalWidth = numStripes * (stripeSize + stripeSpacing);
  let currentStripe = container.x - (totalWidth - container.width) / 2;

  for (let i = 0; i < numStripes; i++) {
    let stripeHeight = container.height * 1.5;
    let stripeY = container.y - (stripeHeight - container.height) / 2;

    let stripe = new simples.Rectangle(
      currentStripe,
      stripeY,
      stripeSize,
      stripeHeight
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
      ctx.translate(container.center.x, container.center.y);

      switch (orientation) {
        case "diagonal":
          ctx.rotate((45 * Math.PI) / 180);
          break;
        case "reverse-diagonal":
          ctx.rotate((135 * Math.PI) / 180);
          break;
        case "horizontal":
          ctx.rotate(Math.PI / 2);
          break;
      }

      ctx.translate(-container.center.x, -container.center.y);
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

  return stripes;
}

export { stripes, argyle };
