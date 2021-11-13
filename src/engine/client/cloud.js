import { simples } from "../simples/simples.js";
import { complex } from "../complex/complex.js";
import { ComplexShape } from "../complex/complexShape.js";

class Cloud extends ComplexShape {
  constructor(x, y, width, height, angle) {
    super(x, y, width, height, angle);
    this.type = "Cloud";

    let maxSize = this.width / 2;
    let previousCircle;
    let circleX;
    let moreCircles = true;

    while (moreCircles) {
      //the x of the circle should overlap the right edge of the previous circle by 25%
      circleX = previousCircle
        ? previousCircle.b.x - previousCircle.width / 4
        : this.x;

      //the max size of any circle should be 50% of the width. Min size is 25%
      let size = trees.random(maxSize / 4, maxSize);

      //create the circle.
      let circle = new complex.SemiCircle(
        circleX,
        this.d.y - size / 2,
        size,
        size / 2
      );
      this.addShape(circle);
      previousCircle = circle;

      //if the circle's right edge exceeds the width of the cloud, move it over.
      //otherwise add another circle.
      if (circle.b.x > this.b.x) {
        circle.x = this.b.x - circle.width;
        moreCircles = false;
      }
    }
  }
}

export { Cloud };
