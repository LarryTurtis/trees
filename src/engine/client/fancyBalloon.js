import { simples } from "../simples/simples.js";
import { patterns } from "../patterns/patterns.js";
import { HotAirBalloon } from "./hotAirBalloon.js";
import { StripedBalloon } from "./stripedBalloon.js";

/**
 * Randomly generates fancy patterns.
 */
class FancyBalloon extends StripedBalloon {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.type = "Balloon";
    patterns.argyle(this.balloon).forEach((stripe) => this.addShape(stripe));
  }
}

export { FancyBalloon };
