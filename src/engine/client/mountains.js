import { simples } from "../simples/simples.js";
import { complex } from "../complex/complex.js";
import { ComplexShape } from "../complex/complexShape.js";

//basically same rules as clouds.
class Mountains extends ComplexShape {
  constructor(x, y, width, height, angle) {
    super(x, y, width, height, angle);
    this.type = "Mountains";
    const black = "#333333";
    let maxSize = height;
    let previoustriangle;
    let triangleX;
    let moretriangles = true;
    let snowcaps = [];

    while (moretriangles) {
      //the x of the triangle should overlap the right edge of the previous triangle by 25%
      let overlap = Math.floor(Math.random() * 3) + 1;
      triangleX = previoustriangle
        ? previoustriangle.b.x - previoustriangle.width / overlap
        : this.x;

      //the max size of any triangle should be 1/5 of the width. Min size is 1/10 of that.
      let size =
        Math.floor(Math.random() * (maxSize - maxSize / 10)) + maxSize / 10;

      //create the triangle.
      let triangle = new simples.Triangle(
        triangleX,
        this.d.y - size,
        size,
        size
      );
      triangle.color = black;
      if (size > maxSize * 0.8) {
        let snowcap = new simples.Triangle(
          triangleX + size / 2 - size / 5 / 2,
          this.d.y - size,
          size / 5,
          size / 5
        );
        snowcap.color = "beige";
        snowcaps.push(snowcap);
      }
      this.addShape(triangle);
      previoustriangle = triangle;

      //if the triangle's right edge exceeds the width of the Mountains, move it over.
      //otherwise add another triangle.
      if (triangle.b.x > this.b.x) {
        triangle.x = this.b.x - triangle.width;
        moretriangles = false;
      }
    }
    snowcaps.forEach((snowcap) => this.addShape(snowcap));
  }
}

export { Mountains };
