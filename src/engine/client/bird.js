import { simples } from "../simples/simples.js";
import { ComplexShape } from "../complex/complexShape.js";

class Bird extends ComplexShape {
  constructor(x, y, width, height, angle) {
    super(x, y, width, height, angle);
    this.type = "Tree";

    this.tzoid = new simples.Trapezoid(
      this.center.x - this.width / 2,
      y,
      this.width,
      this.height / 2,
      135,
      45
    );
    let rectangle = new simples.Rectangle(
      x,
      this.center.y - height / 4,
      width * 0.8,
      height / 8
    );
    this.tzoid.color = "#333333";
    rectangle.color = "#333333";
    let triangle2 = new simples.Triangle(
      x,
      y + height / 4,
      width / 4,
      height / 4,
      0
    );
    let triangle3 = new simples.Triangle(x, y, width, height / 4, 0);

    this.addShape(this.tzoid);
    this.addShape(rectangle);
    // this.addShape(triangle2);
    // this.addShape(triangle3);
    // this.addShape(rectangle);
    this.counter = 0;
  }

  animate() {
    super.animate();
    // this.tzoid.rotate(30, this.tzoid.center);
    if (this.counter >= 2) {
      this.tzoid.flipVertical();
      this.counter = 0;
    }
    this.counter++;
  }

  draw(ctx) {
    ctx = ctx || (this.canvas && this.canvas.ctx);
    super.draw(ctx);

    ctx.beginPath();

    this.shape.forEach((shape) => {
      shape.draw(ctx);
    });

    ctx.fill();
    if (this.lineColor) ctx.stroke();
    ctx.closePath();
  }
}

export { Bird };
