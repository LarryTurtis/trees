import { Point } from "./point.js";

CanvasRenderingContext2D.prototype.curve = function (points) {
  if (points) {
    this.bezierCurveTo(
      points.cp1.x,
      points.cp1.y,
      points.cp2.x,
      points.cp2.y,
      points.end.x,
      points.end.y
    );
  }
};

CanvasRenderingContext2D.prototype.yLine = function (a) {
  this.lineTo(a.x, a.y);
};

CanvasRenderingContext2D.prototype.yRect = function (rect) {
  this.yMove(rect.a);
  this.yLine(rect.b);
  this.yLine(rect.c);
  this.yLine(rect.d);
  this.yLine(rect.a);
};
CanvasRenderingContext2D.prototype.yMove = function (point) {
  this.moveTo(point.x, point.y);
};
CanvasRenderingContext2D.prototype.yArc = function (arc) {
  this.arc(arc.x, arc.y, arc.r, arc.sAngle, arc.eAngle);
};

class Canvas {
  constructor(parentNodeName) {
    this.element = document.createElement("canvas");
    this.ctx = this.element.getContext("2d");
    this._center = new Point(this.element.width / 2, this.element.height / 2);
    this._width = this.element.width;
    this._height = this.element.height;

    this._currentY = 0;

    this.parentNode = document.getElementById(parentNodeName) || document.body;

    let dpr = window.devicePixelRatio || 1;
    let bsr =
      this.ctx.webkitBackingStorePixelRatio ||
      this.ctx.mozBackingStorePixelRatio ||
      this.ctx.msBackingStorePixelRatio ||
      this.ctx.oBackingStorePixelRatio ||
      this.ctx.backingStorePixelRatio ||
      1;

    this.pixelRatio = dpr / bsr;

    //Create canvas with the device resolution.
    // this.createCanvas(500, 250);

    //Create canvas with a custom resolution.
    //var myCustomCanvas = createHiDPICanvas(500, 200, 4);
  }

  measureText(text, font) {
    this.ctx.font = font;
    return this.ctx.measureText(text).width;
  }

  createCanvas(w, h, ratio) {
    try {
      this.parentNode.removeChild(this.element);
    } catch (e) {}

    if (!ratio) {
      ratio = this.pixelRatio;
    }
    let can = document.createElement("canvas");
    can.width = w * ratio;
    can.height = h * ratio;
    can.style.width = w + "px";
    can.style.height = h + "px";

    this.ctx = can.getContext("2d");
    this.element = can;
    this.ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    this.parentNode.appendChild(this.element);
    console.log("created canvas", this);
  }

  setSize(width, height) {
    this.width = width;
    this.height = height;
    this._center = new Point(this._center.x, height / 2);
    this.createCanvas(width, this.height);
  }

  set width(width) {
    this._width = width;
  }

  set height(height) {
    this._height = height;
  }

  get width() {
    return this._width;
  }

  get height() {
    return this._height;
  }

  get center() {
    return this._center;
  }

  get currentY() {
    return this._currentY;
  }

  set currentY(currentY) {
    this._currentY = currentY;
  }

  addEventListener(event, func) {
    this.element.addEventListener(event, func, false);
  }

  dispatchEvent(event) {
    this.element.dispatchEvent(event);
  }

  getBoundingClientRect() {
    return this.element.getBoundingClientRect();
  }

  scroll(amount) {
    if (this.currentY + amount > 0 && this.currentY + amount < this.height) {
      this.currentY += amount;
      this.element.style.marginTop = -this.currentY + "px";
    }
  }
}

export { Canvas };
